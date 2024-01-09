// @ts-ignore
import { ForgeInlineEditorProps } from "@/components/ForgeInlineEditor.vue";
import ForgeInlineEditor from "@/components/ForgeInlineEditor.vue";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

const name = "inlineEditor"
const inputCyDataId = '[data-cy="input"]'
const errorCyDataId = '[data-cy="error"]'
const valueCyDataId = '[data-cy="value"]'
const editIconCyDataId = '[data-cy="edit-icon"]'
const clearIconCyDataId = '[data-cy="clear-icon"]'
const toastId = '[data-pc-name="toast"]'
const readonlyValueId = '[data-cy="readonly-value"]'

function mountInlineEditor(props : ForgeInlineEditorProps) {
  cy.mount(ForgeInlineEditor, {
    props
  })
}

describe('<ForgeInlineEditor />', () => {
  it("Mounts", () => {
    // Act
    mountInlineEditor({ name: 'inlineEditor'})
    
    // Assert
    cy.get(`#${name}`)
      .should('exist')
      .and('be.visible')
  })
  
  it("Should reset value when clear button is clicked", () => {
    // Arrange
    const value = "Hello!"
    
    // Act
    mountInlineEditor({ name: name })
    cy.get(`#${name}`).click()
    cy.get(`#${name}`).type(`${value}`)
    
    // Assert
    cy.get(inputCyDataId)
      .should('contain.value', value)
    
    cy.get(clearIconCyDataId).click()

    cy.get(inputCyDataId)
      .should('contain.value', "")
  })
  
  describe('User Interaction', () => {
    it("Allows the user to click off when there are no errors", () => {
      // Arrange
      const errorMessage = "Length must be greater than 10 characters"
      const rules = toTypedSchema(z.string().max(10, errorMessage))
      const value = 'Hello!'
      const invalidText = "text-invalid"

      // Act
      mountInlineEditor({ name: name, rules: rules })
      cy.get(`#${name}`).click()
      cy.get(`#${name}`).type(`${value}`)
      cy.clickOff()

      // Assert
      cy.get(inputCyDataId)
        .should('not.exist')

      cy.get(errorCyDataId)
        .should('not.be.visible')

      cy.get(valueCyDataId)
        .should('be.visible')
        .and('contain.text', value)
        .and('not.have.class', invalidText)
    })
    
    it("Allows the user to exit on press of the enter key", () => {
      // Arrange
      const value = 'Hello!'
      const invalidText = "text-invalid"

      // Act
      mountInlineEditor({ name: name })
      cy.get(`#${name}`).click()
      cy.get(`#${name}`).type(`${value}{enter}`)

      // Assert
      cy.get(inputCyDataId)
        .should('not.exist')

      cy.get(errorCyDataId)
        .should('not.be.visible')

      cy.get(valueCyDataId)
        .should('be.visible')
        .and('contain.text', value)
        .and('not.have.class', invalidText)
    })

    it("Allows the user to exit on press of the escape key", () => {
      // Arrange
      const value = 'Hello!'
      const invalidText = "text-invalid"

      // Act
      mountInlineEditor({ name: name })
      cy.get(`#${name}`).click()
      cy.get(`#${name}`).type(`${value}{esc}`)

      // Assert
      cy.get(inputCyDataId)
        .should('not.exist')

      cy.get(errorCyDataId)
        .should('not.be.visible')

      cy.get(valueCyDataId)
        .should('be.visible')
        .and('contain.text', value)
        .and('not.have.class', invalidText)
    })
  })
  
  describe("Complete Action", () => {
    it("Runs completion action on finish of edit", () => {
      // Arrange
      const value = "Hello!"
      const action = () => new Promise(() => window.alert(value))

      // Act
      mountInlineEditor({ name: name, value: value, completeAction: action })
      cy.get(`#${name}`).click()
      cy.clickOff()

      // Assert
      cy.on("window:alert", (str) => {
        return expect(str).to.equal(value)
      })
    })

    it("Runs completion action with params on finish of edit", () => {
      // Arrange
      const value = "Hello!"
      const params = [value]
      const action = (alertMessage: string) => new Promise(() => window.alert(alertMessage))

      // Act
      mountInlineEditor({ name: name, value: value, completeAction: action, params: params })
      cy.get(`#${name}`).click()
      cy.clickOff()

      // Assert
      cy.on("window:alert", (str) => {
        return expect(str).to.equal(value)
      })
    })

    it("Performs error action with parameters when function fails", () => {
      // Arrange
      const expectedErrorMessage = "Action has failed."
      const action = () => {
        throw new Error('')
      }

      const errorAction = (errorMessage: string) => new Promise(() => window.alert(errorMessage))

      // Act
      mountInlineEditor({ name: name, completeAction: action, errorAction: errorAction, errorParams: [expectedErrorMessage] })
      cy.get(`#${name}`).click()
      cy.clickOff()

      // Assert
      cy.on("window:alert", (str) => {
        return expect(str).to.equal(expectedErrorMessage)
      })
    })

  })
  
  describe("Validation", () => {
    it("Displays error message when validation rule isnt met", () => {
      // Arrange
      const errorMessage = "Length must be greater than 10 characters"
      const rules = toTypedSchema(z.string().max(10, errorMessage))
      const value = 'Iamlongerthan10characters'
      const invalidInput = "is-invalid"
      const invalidText = "text-invalid"

      // Act
      mountInlineEditor({ name: name, rules: rules })
      cy.get(`#${name}`).click()
      cy.get(`#${name}`).type(value)

      // Assert
      cy.get(inputCyDataId)
        .should('contain.value', value)
        .and('have.class', invalidInput)

      cy.get(errorCyDataId)
        .should('be.visible')
        .and('have.text', errorMessage)
        .and('have.class', invalidText)
    })

    it('Doesnt allow the user to exit the inline editor if there are errors', () => {
      // Arrange
      const errorMessage = "Length must be greater than 10 characters"
      const rules = toTypedSchema(z.string().max(10, errorMessage))
      const value = 'Iamlongerthan10characters'
      const invalidInput = "is-invalid"
      const invalidText = "text-invalid"

      // Act
      mountInlineEditor({ name: name, rules: rules })
      cy.get(`#${name}`).click()
      cy.get(`#${name}`).type(value)
      cy.clickOff()

      // Assert
      cy.get(inputCyDataId)
        .should('be.visible')
        .and('have.class', invalidInput)

      cy.get(errorCyDataId)
        .should('be.visible')
        .and('have.text', errorMessage)
        .and('have.class', invalidText)
      
      cy.get(valueCyDataId)
        .should('not.exist')
    });

    it("Allows the user to exit on press of the escape key and displays validation errors", () => {
      // Arrange
      const errorMessage = "Length must be greater than 10 characters"
      const rules = toTypedSchema(z.string().max(10, errorMessage))
      const value = 'Iamlongerthan10characters'
      const invalidText = "text-invalid"

      // Act
      mountInlineEditor({ name: name, rules: rules })
      cy.get(`#${name}`).click()
      cy.get(`#${name}`).type(`${value}{esc}`)

      // Assert
      cy.get(inputCyDataId)
        .should('not.exist')

      cy.get(errorCyDataId)
        .should('be.visible')
        .and('have.class', invalidText)

      cy.get(valueCyDataId)
        .should('be.visible')
        .and('contain.text', value)
        .and('have.class', invalidText)
      
      cy.get(editIconCyDataId)
        .should('be.visible')
        .and('have.class', invalidText)
    })
  })
})