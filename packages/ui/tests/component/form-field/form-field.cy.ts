// @ts-ignore
import ForgeFormField, { ForgeFormFieldProps } from "../../../src/components/ForgeFormField.vue";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from 'zod'

function mountFormField(props : ForgeFormFieldProps) {
  cy.mount(ForgeFormField, {
    props
  })
}

describe('<ForgeFormField />', () => {
  it('Mounts', () => {
    // Arrange
    const name = "input"
    const label = "A custom input"
    const rules = toTypedSchema(z.string().max(1, 'Required'))
    
    // Act
    mountFormField({ name: name, label: label, rules: rules })
    
    // Assert
    cy.get(`#${name}`)
      .should('exist')
      .and('be.visible')
  })
  
  describe('Number', () => {      
    // Arrange
    const name = "input"
    const type = "number"
    const label = "A custom input"
    
    it("Displays error message when validation isnt met", () => {
      // Arrange
      const errorMessage = "Must be less than 1"
      const rules = toTypedSchema(z.number().lte(1, errorMessage))
      const value = '2'
      const invalid = "is-invalid"
      
      // Act
      mountFormField({ name: name, type: type, label: label, rules: rules })
      cy.get(`#${name}`).type(value)
      cy.get(`#${name} input`).blur()

      // Assert
      cy.get(`#${name} input`)
        .should('contain.value', value)
        .and('have.class', invalid)
      
      cy.get("[data-cy='error']")
        .should('have.text', errorMessage)
    })
    
    it("Allows for InputNumber props to be passed and applied", () => {
      // Arrange
      const prefix = "I am a prefix "
      const value = "10"
      
      // Act
      mountFormField({ name: name, type: type, label: label, prefix: prefix })
      cy.get(`#${name}`).type(value)

      // Assert
      cy.get(`#${name} input`)
        .should('contain.value', `${prefix}${value}`)
    })
  })
  
  describe('Text', () => {
    // Arrange
    const name = "input"
    const type = "text"
    const label = "A custom input"
    
    it("Allows for alphanumeric characters to be inputted when type is text", () => {
      // Arrange
      const expectedString = "Hello123"

      // Act
      mountFormField({ name: name, type: type, label: label })
      cy.get(`#${name}`).type(expectedString)

      // Assert
      cy.get(`#${name}`).should('contain.value', expectedString)
    })

    it("Displays error message when validation isnt met", () => {
      // Arrange
      const errorMessage = "Length must be greater than 10 characters"
      const rules = toTypedSchema(z.string().max(10, errorMessage))
      const value = 'I am longer than 10 characters'
      const invalid = "is-invalid"

      // Act
      mountFormField({ name: name, type: type, label: label, rules: rules })
      cy.get(`#${name}`).type(value)

      // Assert
      cy.get(`#${name}`)
        .should('contain.value', value)
        .and('have.class', invalid)
      
      cy.get('[data-cy="error"]')
        .should('have.text', errorMessage)
    })
    
    it("Allows for InputText props to be passed and applied", () => {
      // Arrange
      const size = "Large"
      const expectedClass = "form-control-lg"

      // Act
      mountFormField({ name: name, type: type, label: label, size: size })

      // Assert
      cy.get(`#${name}`)
        .should('have.class', expectedClass)
    })
  })
  
  describe('Text Area', () => {
    // Arrange
    const name = "input"
    const type = "textarea"
    const label = "A custom input"
    
    it("Displays text area when type is text area", () => {
      // Arrange
      const expectedString = "Hello123"

      // Act
      mountFormField({ name: name, type: type, label: label })
      cy.get(`#${name}`).type(expectedString)

      // Assert
      cy.get(type)
        .should('exist')
        .and('be.visible')
        .and('contain.value', expectedString)
    })

    it("Displays error message when validation isnt met", () => {
      // Arrange
      const errorMessage = "Length must be greater than 10 characters"
      const rules = toTypedSchema(z.string().max(10, errorMessage))
      const value = 'I am longer than 10 characters'
      const invalid = "is-invalid"

      // Act
      mountFormField({ name: name, label: label, type: type, rules: rules })
      cy.get(`#${name}`).type(value)

      // Assert
      cy.get(`#${name}`)
        .should('contain.value', value)
        .and('have.class', invalid)

      cy.get('[data-cy="error"]')
        .should('have.text', errorMessage)
    })

    it("Allows for TextArea props to be passed and applied", () => {
      // Act
      mountFormField({ name: name, type: type, label: label, disabled: true })

      // Assert
      cy.get(`#${name}`)
        .should('be.disabled')
    })
  })
  
  describe('Mask', () => {
    const name = "input"
    const type = "mask"
    const label = "A custom input"
    const mask = "99-999999"

    it("Displays error message when validation isnt met", () => {
      // Arrange
      const errorMessage = "Length must be greater than 5 characters"
      const rules = toTypedSchema(z.string().max(5, errorMessage))
      const value = 'I am longer than 10 characters'
      const invalid = "is-invalid"

      // Act
      mountFormField({ name: name, label: label, type: type, rules: rules, mask: mask })
      cy.get(`#${name}`).type(value)

      // Assert
      cy.get(`#${name}`)
        .and('have.class', invalid)

      cy.get('[data-cy="error"]')
        .should('have.text', errorMessage)
    })
    
    it("Allows for InputMask props to be passed and applied", () => {
      // Arrange
      const placeholder = "I am a Placeholder"

      // Act
      mountFormField({ name: name, type: type, label: label, placeholder: placeholder })

      // Assert
      cy.get(`#${name}`)
        .should('have.attr', 'placeholder', placeholder)
    })
  })
  
  describe('Checkbox', () => {
    // Arrange
    const type = "checkbox"
    const label = "A custom input"
    const name = "input"
    
    it("Displays checkbox when type is checkbox", () => {
      // Act
      mountFormField({ name: name, type: type, label: label })

      // Assert
      cy.get(`[data-cy="checkbox-container"]`)
        .should('exist')
        .and('be.visible')
    })

    it("Displays error message when validation isnt met", () => {
      // Arrange
      const errorMessage = "This is required"
      const rules = toTypedSchema(z.boolean({ required_error: errorMessage }))
      const invalid = "is-invalid"

      // Act
      mountFormField({ name: name, type: type, label: label, rules: rules })
      cy.get(`#${name}`).dblclick()

      // Assert
      cy.get(`[data-pc-section="input"]`)
        .and('have.class', invalid)

      cy.get('[data-cy="error"]')
        .should('have.text', errorMessage)
    })

    it("Allows for Checkbox props to be passed and applied", () => {
      // Act
      mountFormField({ name: name, type: type, label: label, disabled: true })

      // Assert
      cy.get(`#${name} input`)
        .should('be.disabled')
    })
  })
})