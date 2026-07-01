describe('Edit Task', () => {

  beforeEach(() => {
    cy.login();
  });

  it('Edit task successfully', () => {

    cy.get('.cursor-pointer').first().click();

    cy.contains('Edit Task').click();

    cy.url().should('include', '/edit');

    const updatedTitle = `Updated-${new Date()}`;

    cy.get('#title').clear().type(updatedTitle);

    // Description
    cy.get('#description')
      .clear()
      .type('Updated Description');

    // Status
    cy.get('#status')
      .select('Completed');

    // Priority
    cy.get('#priority')
      .select('Medium');

    // Update
    cy.contains('Update Task').click();

    cy.contains('Back to Tasks').click();

    // cy.contains('Updated by Cypress').should('be.visible');

  });

});