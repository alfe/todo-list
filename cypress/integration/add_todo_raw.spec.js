/// <reference types="cypress" />
/* eslint-disable no-undef */

context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('add todo', () => {
    cy.get('#new-todo')
      .type('todo1').should('have.value', 'todo1')
      .type('{enter}', { delay: 100 });

    cy.get('#new-todo').should('have.value', '')

    cy.get('.todo-item').contains('todo1');
  })

  it('delete todo', () => {
    cy.get('#new-todo')
      .type('todo1').should('have.value', 'todo1')
      .type('{enter}', { delay: 100 });
    cy.get('#new-todo').should('have.value', '')
    cy.get('.todo-item').contains('todo1');

    cy.get('.todo-item:nth(0)').contains('DEL').click();
    cy.get('.todo-item').should('not.exist');
  })

  it('add 3 todo and delete middle todo', () => {
    // todo1を追加
    cy.get('#new-todo')
      .type('todo1').should('have.value', 'todo1')
      .type('{enter}', { delay: 100 });
    cy.get('#new-todo').should('have.value', '')
    cy.get('.todo-item').contains('todo1');

    // todo2を追加
    cy.get('#new-todo')
      .type('todo2').should('have.value', 'todo2')
      .type('{enter}', { delay: 100 });
    cy.get('#new-todo').should('have.value', '')
    cy.get('.todo-item').contains('todo2');

    // todo3を追加
    cy.get('#new-todo')
      .type('todo3').should('have.value', 'todo3')
      .type('{enter}', { delay: 100 });
    cy.get('#new-todo').should('have.value', '')
    cy.get('.todo-item').contains('todo3');

    // 2つ目を削除
    cy.get('.todo-item:nth(1)').contains('DEL').click();

    // 残アイテムの確認
    cy.get('.todo-item').contains('todo1');
    cy.get('.todo-item').contains('todo2').should('not.exist');
    cy.get('.todo-item').contains('todo3');
  })
})
