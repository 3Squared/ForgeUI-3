/// <reference types="cypress" />

import { App } from "vue/dist/vue";
import PrimeVue from "primevue/config";
import ToastService from 'primevue/toastservice'
import DialogService from 'primevue/dialogservice'
import { Bootstrap_PT } from "../../index";
import { mount } from "cypress/vue";

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount,
      /**
       * Clicks off an element by clicking at the coordinates 0,0 of the body element.
       */
      clickOff(): Chainable
    }
  }
}

/**
 * Clicks off an element by clicking at the coordinates 0,0 of the body element.
 */
Cypress.Commands.add('clickOff', () => {
  cy.get('body').click(document.documentElement.clientWidth -1, document.documentElement.clientHeight -1, { force: true})
})

Cypress.Commands.add('mount', (component: any, options = {}) => {
  options.global = options.global || {}
  options.global.plugins = options.global.plugins || []

  options.global.plugins.push({
    install(app: App) {
      app.use(PrimeVue, { unstyled: true, pt: Bootstrap_PT })
      app.use(ToastService)
      app.use(DialogService)
    },
  })

  return mount(component, options)
})