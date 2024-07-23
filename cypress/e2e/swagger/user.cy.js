describe("Создание, правка, удаление пользователя", () => {
  let user;
  let expected;
  let editUser;

  before(() => {
    // Загрузка фикстур перед выполнением тестов
    cy.fixture("user").then((data) => {
      user = data;
    });
    cy.fixture("expected").then((data) => {
      expected = data;
    });
    cy.fixture("editUser").then((data) => {
      editUser = data;
    });
  });

  it("Создание пользователя", () => {
    cy.request("POST", "/user", user).then((response) => {
      expect(response.status).to.eql(expected.code);
      expect(response.body).to.eql(expected);
    });
  });

  it("Правка пользователя", () => {
    cy.request("PUT", `/user/${user.username}`, editUser).then((response) => {
      expect(response.status).to.eql(expected.code);
      expect(response.body).to.eql(expected);
    });

    cy.request({
      method: "GET",
      url: `/user/${user.username}`,
    }).then((response) => {
      expect(response.status).to.eql(expected.code);
      expect(response.body).to.eql(editUser);
    });
  });

  it("Удаление пользователя", () => {
    // Загружаем данные пользователя из фикстуры перед выполнением теста
    cy.fixture("user").then((data) => {
      const { username } = data; // Извлекаем имя пользователя из данных

      // Отправляем запрос на удаление пользователя
      cy.request({
        method: "DELETE",
        url: `/user/${username}`,
      }).then((response) => {
        expect(response.status).to.equal(200); // Проверяем, что статус ответа - 200
      });

      // Отправляем запрос на получение удаленного пользователя
      cy.request({
        method: "GET",
        url: `/user/${username}`,
        failOnStatusCode: false, // Не вызывать ошибку, если статус не 2xx
      }).then((response) => {
        expect(response.status).to.equal(404); // Проверяем, что пользователь не найден
      });
    });
  });
});