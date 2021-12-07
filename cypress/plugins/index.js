/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */

const mysql = require('mysql2');

// env DB_HOST=localhost DB_USER=root DB_PASSWORD=password DB_DATABASE=db yarn open
module.exports = (on, config) => {
  on('task', {
    'db:delete'() {
      return new Promise((resolve) => {
        let connection = mysql.createConnection({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
        });
        connection.query('DELETE FROM todo;', function(err, result) {
          console.log(result); // queryの結果
          return resolve(null);
        });
      });
    },
  })
}
