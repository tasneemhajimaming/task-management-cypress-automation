describe("Authentication", () => {
  it("should login successfully", () => {
    cy.login();
    cy.url().should("include", "/tasks");
    cy.contains("My Tasks").should("be.visible");
  });

  it("should logout successfully", () => {
    cy.login();

    cy.wait(1000);

    cy.contains("button", "Logout").click();

    cy.url().should("include", "/login");
  });
});
