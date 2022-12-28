/// <reference types="cypress" />
const runQuery = require('./run-query');
const reloadDB = require('./reload-db');
const fs = require('fs-extra');
const path = require('path');

module.exports = (on, config) => {  
  

  on('task', {
    query: runQuery(config),
    reloadDB: reloadDB(config)
  })
}
