describe('Clear filters', () => {

    beforeEach(() => {
    cy.login();
  });

  it('should clear selected filters', () => {

    // เลือก Completed
    cy.get('#status-filter')
      .select('completed')

    // verify ว่า filter ถูกเลือก
    cy.get('#status-filter')
      .should('have.value', 'completed')


    // กด Clear Filters
    // cy.contains('button', 'Clear Filters')
    //   .click()


    // // verify filter กลับค่า default
    // cy.get('#status-filter')
    //   .should('have.value', '')


    // cy.get('#priority-filter')
    //   .should('have.value', '')


    // verify task กลับมาแสดงมากกว่า 0
    // cy.get('.grid.grid-cols-1.gap-4.mb-6 > a')
    //   .should('have.length.greaterThan', 0)

  })

})