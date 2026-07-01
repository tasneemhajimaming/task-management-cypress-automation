
describe("Logout", () => {

  beforeEach(() => {
    cy.login();
  });

  it('should logout successfully', () => {
    cy.contains('button', 'Logout')
      .should('be.visible')
      .click();

    cy.location('pathname', { timeout: 15000 })
      .should('eq', '/login');
  });

});