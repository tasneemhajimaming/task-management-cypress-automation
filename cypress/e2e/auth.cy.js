describe("Authentication", () => {
  let users;

  before(() => {
    cy.fixture("user").then((data) => {
      users = data;
    });
  });

  it("should redirect to task page after successful login", () => {
    cy.login(users.admin.email, users.admin.password);

    cy.url().should("include", "/tasks");
    cy.contains("My Tasks").should("be.visible");
  });

  it("should display an error message when password is incorrect", () => {
    cy.login(users.invalidUser.email, users.invalidUser.password);

    cy.contains(/invalid|incorrect/i).should("be.visible");
  });

  it("should validate email format before submitting", () => {
    cy.login(users.invalidEmail.email, users.invalidEmail.password);

    cy.get('input[type="email"]:invalid').should("exist");
  });

  it("should return to login page after logout", () => {
    cy.login(users.admin.email, users.admin.password);

    cy.contains("button", "Logout")
      .should("be.visible")
      .click();

    cy.url().should("include", "/login");
    cy.get('button[type="submit"]').should("be.visible");
  });
});