// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import { initializeApp } from "firebase/app"
import { getFirestore, doc, deleteDoc } from "firebase/firestore"
import firebaseConfig from "./firebaseConfig"

initializeApp(firebaseConfig);
const db = getFirestore();

// TODOの全削除
Cypress.Commands.add('deleteAllTodo', async (userId) => {
  await deleteDoc(doc(db, "todo", userId));
});

// TODOの追加 cy.addTodo('todo1');
Cypress.Commands.add('addTodo', (value) => {
  cy.get('#new-todo')
    .type(value).should('have.value', value)
    .type('{enter}', { delay: 100 });
  cy.wait(1000)
  cy.get('#new-todo').should('have.value', '')
  cy.contains(value);
});

// TODOの削除 cy.deleteTodo(0);
Cypress.Commands.add('deleteTodo', (nth) => {
  cy.get(`.todo-item:nth(${nth})`).contains('DEL').click();
  cy.wait(1000)
});

Cypress.Commands.add('insertToDb', (user_id, content) => {
  const query = `INSERT INTO todo (user_id, content) VALUES (${user_id}, ${content})`;
  const mysql = require('mysql');
  const connection = mysql.createConnection({
    host: Cypress.env('DB_HOST'),
    user: Cypress.env('DB_USER'),
    password: Cypress.env('DB_PASSWORD'),
    database: 'todo-list'
  });
  connection.query(query, (error, results) => {
    if (error) {
      console.error('error: ', error);
      return;
    }
    console.log(results);
  });
})
