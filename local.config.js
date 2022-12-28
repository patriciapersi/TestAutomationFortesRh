const { defineConfig } = require('cypress')

module.exports = defineConfig({
  video: false,
  viewportHeight: 1000,
  viewportWidth: 1280,
  watchForFileChanges: false,
  screenshotOnRunFailure: false,
  
  env: {
    db: {
      username: 'fortesrh',
      database: 'fortesrh',
      hostname: 'localhost',
      port: 55432,
    },
  },
  user_name: 'homolog',
  user_password: 's3creT-p@ssw0rd',
  company: 'Empresa Padrão',
  company_id: 1,
  chromeWebSecurity: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
      return require('cypress-grep/src/plugin')(config)
    },
    experimentalRunAllSpecs: true,
    baseUrl: 'http://localhost:8080/fortesrh',
    specPattern: 'cypress/e2e//**/*.cy.{js,jsx,ts,tsx}',
    retries: 2,
  },
})