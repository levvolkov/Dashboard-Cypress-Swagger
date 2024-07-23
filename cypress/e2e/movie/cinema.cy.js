import tests from "../../fixtures/cinema.json";
describe("Идем в кино", () => {
  beforeEach(() => {
    cy.visit("http://qamid.tmweb.ru");
  });

  it("Проверка что дней 7", () => {
    cy.get(".page-nav__day").should("have.length", 7);
  });

  tests.forEach((test) => {
    it(test.name, () => {
      cy.get(".page-nav__day:nth-of-type(5)").click();
      cy.get(".movie").contains("13:00").click();
      test.data.forEach((seat) => {
        cy.get(`.buying-scheme__wrapper > :nth-child(${seat.row}) > :nth-child(${seat.seat})`).click();
      });
      cy.get(".acceptin-button").click();
      cy.contains("Вы выбрали билеты:").should("be.visible");
    });
  });
});