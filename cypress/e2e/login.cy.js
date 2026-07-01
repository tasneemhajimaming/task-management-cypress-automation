describe('Login', () => {

  it('Login successfully', () => {

    cy.visit('/login')

    cy.get('input[type="email"]').type('admin@example.com')

    cy.get('input[type="password"]').type('admin123')

    cy.get('button[type="submit"]').click();

    // cy.url().should('include', '/tasks')
    cy.contains('My Tasks').should('be.visible');

  })

})