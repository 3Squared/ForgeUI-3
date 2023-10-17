// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
import '@cypress/code-coverage/support'
import 'bootstrap/scss/bootstrap.scss';
// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from 'cypress/vue'
import PrimeVue from 'primevue/config'
import { Bootstrap_PT } from "../../index";

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}

Cypress.Commands.add('mount', (component, options = {}) => {
  options.global = options.global || {}
  options.global.plugins = options.global.plugins || []

  options.global.plugins.push({
    install(app) {
      app.use(PrimeVue, { unstyled: true, pt: Bootstrap_PT})
    },
  })
  
  return mount(component, options)
})