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
    // todo1を追加
    cy.addTodo('todo1');
    // todo2を追加
    cy.addTodo('todo2');
    // todo3を追加
    cy.addTodo('todo3');

    // 2つ目を削除
    cy.deleteTodo(1);
    
    // 残アイテムの確認
    cy.get('.todo-item').contains('todo1');
    cy.get('.todo-item').contains('todo2').should('not.exist');
    cy.get('.todo-item').contains('todo3');
  })
})
