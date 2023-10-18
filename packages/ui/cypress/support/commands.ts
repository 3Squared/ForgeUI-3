/// <reference types="cypress" />

import { App } from "vue/dist/vue";
import PrimeVue from "primevue/config";
import { Bootstrap_PT } from "../../index";
import { mount } from "cypress/vue";

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}

Cypress.Commands.add('mount', (component: any, options = {}) => {
  options.global = options.global || {}
  options.global.plugins = options.global.plugins || []

  options.global.plugins.push({
    install(app: App) {
      app.use(PrimeVue, { unstyled: true, pt: Bootstrap_PT })
    },
  })

  return mount(component, options)
})