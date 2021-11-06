/// <reference types="cypress" />
/* eslint-disable no-undef */

const USER_ID = 'XXXXX06';
context('Actions', () => {
  before(() => {
    cy.deleteAllTodo(USER_ID);
  })

  beforeEach(() => {
    cy.visit(`${Cypress.env('baseURL')}#${USER_ID}`)
  })

  it('add todo', () => {
    cy.addTodo('todo1');
  })

  it('delete todo', () => {
    cy.addTodo('todo2');

    cy.deleteTodo(0);
    cy.should('not.exist');
  })

  it('add 3 todo and delete middle todo', () => {
    cy.addTodo('todo1'); // todo1を追加
    cy.addTodo('todo2'); // todo2を追加
    cy.addTodo('todo3'); // todo3を追加

    cy.deleteTodo(1); // 2つ目を削除
    
    // 残アイテムの確認
    cy.contains('todo1');
    cy.contains('todo2').should('not.exist');
    cy.contains('todo3');
  })
})
