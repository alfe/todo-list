/// <reference types="cypress" />

context('task test', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env('baseURL')}`)
  })

  xit('db:delete', () => {
    // cy.task('db:delete')
    console.log('db:delete')
  })

  it('api', () => {
    cy.get('#header').screenshot({ clip: { x: 0, y: 0, width: 480, height: 100 } })

    cy.get('.config-button').click();
    cy.get('[role="dialog"] [type="text"]').clear();
    cy.get('[role="dialog"]').screenshot('dialog-img', { padding: 16 })
    cy.get('[role="dialog"]').contains('キャンセル').click();

    cy.get('#info-table').screenshot('blackout', { blackout: ['#user-uuid'], overwrite: true })
  })
})
