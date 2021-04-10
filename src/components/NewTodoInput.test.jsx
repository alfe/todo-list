import React from 'react';
import { mount } from '@cypress/react';
import NewTodoInput from './NewTodoInput';

it('renders learn react link', () => {
  const value = 'todo1';
  mount(<NewTodoInput onSubmit={(v) => console.log(v)} />);
  cy.get('#new-todo')
    .type(value).should('have.value', value)
    .type('{enter}', { delay: 100 });
  cy.get('#new-todo').should('have.value', '')
});
