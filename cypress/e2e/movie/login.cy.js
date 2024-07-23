beforeEach(() => {
  cy.visit("http://qamid.tmweb.ru/admin");
});
describe("Логин в админку", () => {
  it("Успешная авторизация", () => {
    cy.login("qamid@qamid.ru", "qamid");
    cy.contains("Управление залами").should("be.visible").true;
  });

  it("Неправильный логин и пароль", () => {
    cy.login("invalid@mail.ru", "pass");
    cy.contains("Ошибка авторизации!").should("be.visible").true;
  });
});