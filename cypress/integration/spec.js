/// <reference types="cypress" />
describe("Route does not work after hash changed", function() {
  before(function() {
    cy.visit('https://example.cypress.io')
  });
  it("Replacing Location Hash leads to Mutliple Iframes", function() {
    cy.window().then(win => {
      win.location.replace('#test')
    });
  });
});
