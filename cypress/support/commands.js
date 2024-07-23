const selector = require("../fixtures/selectors.json");

// -- This is a parent command --
Cypress.Commands.add("login", (email, password) => {
  cy.get(selector.email).type(email);
  cy.get(selector.password).type(password);
  cy.get(selector.buttonLoginIn).click();
});
