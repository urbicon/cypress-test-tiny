describe("Route does not work after hash changed", function() {
  beforeEach(function() {
    cy.visit("https://examples.sencha.com/coworkee/#login");
    cy.url().should("include", "#login");
    cy.get("button#ext-element-43").click();
  });

  it("Route Stubbing Works *Without* Hash Change (after login)", function() {
    cy.visit("https://examples.sencha.com/coworkee/#people");
    cy.contains("Benjamin Banks");
    cy.url().should("include", "#people");
    cy.window().then(win => {
      cy.server();
      cy.state("server").bindTo(win);
      cy.route("POST", "https://examples.sencha.com/coworkee/api").as("api");
      win.Ext.ComponentQuery.query("searchfield")[0].setValue("Diane");
      cy.wait("@api");
      cy.contains("Moore");
    });
  });

  it("Route Stubbing Fails *With* Hash Change (after login)", function() {
    cy.visit("https://examples.sencha.com/coworkee/#people");
    cy.contains("Benjamin Banks");
    cy.url().should("include", "#people");
    cy.window().then(win => {
      cy.server();
      cy.state("server").bindTo(win);
      cy.route("POST", "https://examples.sencha.com/coworkee/api").as("api");
      win.Ext.ComponentQuery.query("mainmenu")[0]
        .getController()
        .redirectTo("people");
      cy.wait("@api");
      cy.url().should("include", "#people");
    });
  });
});
