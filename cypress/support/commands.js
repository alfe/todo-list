/* eslint-disable no-undef */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// TODOの追加 cy.addTodo('todo1');
Cypress.Commands.add('addTodo', (value) => {
  cy.get('#new-todo')
    .type(value).should('have.value', value)
    .type('{enter}', { delay: 100 });
  cy.get('#new-todo').should('have.value', '')
  cy.get('.todo-item').contains(value);
});

// TODOの削除 cy.deleteTodo(0);
Cypress.Commands.add('deleteTodo', (nth) => {
  cy.get(`.todo-item:nth(${nth})`).contains('DEL').click();
});
