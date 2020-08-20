describe("Tests Form", function () {
  it("Visits the form on the website and test inputs and submit", function () {
    cy.visit("/pizza");
    // Tests name input
    cy.get("#nameInput").type("Donavyn Haley");
    // selects sauce
    cy.get("#red").click();
    //selects size
    cy.get("#sizeInput").select("Medium");
    // Tests checkboxs for toppings
    cy.get(".Pepperoni").click();
    cy.get(".Sassuage").click({ multiple: true });
    cy.get(".Onions").click();
    cy.get(".Pineapple").click();
    // Submits Form
    cy.get("form").submit();
  });
});
