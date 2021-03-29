/// <reference types="cypress" />
/* eslint-disable no-undef */

context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('add todo', () => {
    cy.addTodo('todo1');
  })

  it('delete todo', () => {
    cy.addTodo('todo1');

    cy.deleteTodo(0);
    cy.get('.todo-item').should('not.exist');
  })

  it('add 3 todo and delete middle todo', () => {
    cy.addTodo('todo1');
    cy.addTodo('todo2');
    cy.addTodo('todo3');

    cy.deleteTodo(1);
    cy.get('.todo-item').contains('todo1');
    cy.get('.todo-item').contains('todo2').should('not.exist');
    cy.get('.todo-item').contains('todo3');
  })
})
