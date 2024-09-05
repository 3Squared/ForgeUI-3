// @ts-ignore
import ForgeFormField, { ForgeFormFieldProps } from "../../../src/components/ForgeFormField.vue";
import FormFieldValidationWrapper, { FormFieldValidationWrapperProps } from "./formFieldValidationWrapper.vue";
import * as yup from "yup"
import { MultiSelectOption } from "../../../src/types/forge-types.ts";

function mountFormField(props: ForgeFormFieldProps) {
  cy.mount(ForgeFormField, {
    props
  })
}

function mountFormFieldValidation(props: FormFieldValidationWrapperProps) {
  cy.mount(FormFieldValidationWrapper, {
    props
  })
}

const validationWrapperSubmitButton = '#form-button'
const inputWrapper = '[data-cy="input-wrapper"]'

const name = "input"
const label = "A custom input"

describe('<ForgeFormField />', () => {
  it('Mounts', () => {
    // Act
    mountFormField({ name: name, fieldLabel: label })

    // Assert
    cy.get(`#${name}`)
      .should('exist')
      .and('be.visible')
  })

  describe("Field Label Position", () => {
    it('Should display label to the left of the form field if FieldLabelPosition is Left', () => {
      // Arrange
      const fieldLabelPosition = 'left'
      const expectedClass = "flex-row"

      // Act
      mountFormField({ name: name, fieldLabel: label, fieldLabelPosition: fieldLabelPosition })

      // Assert
      cy.get(`#${name}`)
        .should('exist')
        .and('be.visible')

      cy.get(inputWrapper)
        .should('have.class', expectedClass)
    });

    it.only('Should display validation underneath the input if FieldLabelPosition is Left', () => {
      // Arrange
      const fieldLabelPosition = 'left'
      const expectedClass = "flex-row"
      const errorMessage = "Length must be greater than 10 characters"
      const schema = yup.object().shape({
        input: yup.string().min(10, errorMessage)
      })
      
      // Act
      mountFormFieldValidation({ name: name, fieldLabel: label, fieldLabelPosition: fieldLabelPosition, schema })
      cy.get(`#${name}`).type(fieldLabelPosition)
      
      // Assert
      cy.get(`#${name}`)
        .should('exist')
        .and('be.visible')

      cy.get(inputWrapper)
        .should('have.class', expectedClass)

      cy.get('[data-cy="error"]')
        .should('have.text', errorMessage)
    });
  })
  


  describe('Number', () => {
    // Arrange
    const type = "number"

    it("Displays error alert when validation isnt met", () => {
      // Arrange
      const errorMessage = "Must be less than 1"
      const value = '2'
      const invalid = "is-invalid"
      const schema = yup.object().shape({
        input: yup.number().max(1, errorMessage)
      })

      // Act
      mountFormFieldValidation({ name: name, type: type, fieldLabel: label, schema })
      cy.get(`#${name}`).type(value)
      cy.get(`#${name} input`).blur()

      // Assert
      cy.get(`#${name} input`)
        .should('contain.value', value)
        .and('have.class', invalid)

      cy.get("[data-cy='error']")
        .should('have.text', errorMessage)
    })
  })

  describe('Text', () => {
    // Arrange
    const type = "text"

    it("Allows for alphanumeric characters to be inputted when type is text", () => {
      // Arrange
      const expectedString = "Hello123"

      // Act
      mountFormField({ name: name, type: type, fieldLabel: label })
      cy.get(`#${name}`).type(expectedString)

      // Assert
      cy.get(`#${name}`).should('contain.value', expectedString)
    })

    it("Displays error alert when validation isnt met", () => {
      // Arrange
      const errorMessage = "Length must be greater than 10 characters"
      const value = 'Not 10'
      const invalid = "is-invalid"
      const schema = yup.object().shape({
        input: yup.string().min(10, errorMessage)
      })
      
      // Act
      mountFormFieldValidation({ name: name, type: type, fieldLabel: label, schema })
      cy.get(`#${name}`).type(value)

      // Assert
      cy.get(`#${name}`)
        .should('contain.value', value)
        .and('have.class', invalid)

      cy.get('[data-cy="error"]')
        .should('have.text', errorMessage)
    })
  })

  describe('Text Area', () => {
    // Arrange
    const type = "textarea"

    it("Displays text area when type is text area", () => {
      // Arrange
      const expectedString = "Hello123"

      // Act
      mountFormField({ name: name, type: type, fieldLabel: label })
      cy.get(`#${name}`).type(expectedString)

      // Assert
      cy.get(type)
        .should('exist')
        .and('be.visible')
        .and('contain.value', expectedString)
    })

    it("Displays error alert when validation isnt met", () => {
      // Arrange
      const errorMessage = "Length must be greater than 10 characters"
      const value = 'Not 10'
      const invalid = "is-invalid"
      const schema = yup.object().shape({
        input: yup.string().min(10, errorMessage)
      })

      // Act
      mountFormFieldValidation({ name: name, type: type, fieldLabel: label, schema })
      cy.get(`#${name}`).type(value)

      // Assert
      cy.get(`#${name}`)
        .should('contain.value', value)
        .and('have.class', invalid)

      cy.get('[data-cy="error"]')
        .should('have.text', errorMessage)
    })
  })

  describe('Mask', () => {
    const type = "mask"
    const mask = "99-999999"

    it("Displays error alert when validation isnt met", () => {
      // Arrange
      const errorMessage = "Invalid"
      const invalid = "is-invalid"
      const schema = yup.object().shape({
        input: yup.string().max(1, errorMessage)
      })

      // Act
      mountFormFieldValidation({ name: name, fieldLabel: label, type: type, mask: mask, schema })
      cy.get(`#${name}`).type(mask)

      // Assert
      cy.get(`#${name}`)
        .and('have.class', invalid)

      cy.get('[data-cy="error"]')
        .should('have.text', errorMessage)
    })
  })

  describe('Checkbox', () => {
    // Arrange
    const type = "checkbox"
    
    it("Displays checkbox when type is checkbox", () => {
      // Act
      mountFormField({ name: name, type: type, fieldLabel: label })

      // Assert
      cy.get(`[data-cy="checkbox-container"]`)
        .should('exist')
        .and('be.visible')
    })

    it("Displays error alert when validation isnt met", () => {
      // Arrange
      const errorMessage = "This is required"
      const invalid = "is-invalid"
      const schema = yup.object().shape({
        input: yup.boolean().required(errorMessage)
      })
      
      // Act
      mountFormFieldValidation({ name: name, type: type, fieldLabel: label, schema })
      cy.get(validationWrapperSubmitButton).click()

      // Assert
      cy.get(`[data-pc-section="input"]`)
        .and('have.class', invalid)

      cy.get('[data-cy="error"]')
        .should('have.text', errorMessage)
    })
  })
  
  describe("Select", () => {
    const type = "select"
    const dropdownId = '[data-pc-name="dropdown"]'
    
    it("Displays dropdown when type is select", () => {
      // Act
      mountFormField({ name: name, type: type, fieldLabel: label })

      // Assert
      cy.get(dropdownId)
        .should('exist')
        .and('be.visible')
    })

    it("Displays error when validation isnt met", () => {
      // Arrange
      const errorMessage = "This is required"
      const invalid = "is-invalid"
      const schema = yup.object().shape({
        input: yup.array().required(errorMessage)
      })

      // Act
      mountFormFieldValidation({ name: name, type: type, fieldLabel: label, schema })
      cy.get(validationWrapperSubmitButton).click()

      // Assert
      cy.get(dropdownId)
        .and('have.class', invalid)

      cy.get('[data-cy="error"]')
        .should('have.text', errorMessage)
    })
  })
  
  describe("Multiselect", () => {
    const type = "multiselect"
    const multiselectId = '[data-cy="multiselect"]'
    const items = [
      { id: "1", label: "1" },
      { id: "2", label: "2" },
      { id: "3", label: "3" },
    ] as MultiSelectOption<string>[]
    const option1Id = '[data-cy="1"]'
    const option2Id = '[data-cy="2"]'


    it("Displays dropdown when type is select", () => {
      // Act
      //@ts-ignore
      mountFormField({ name: name, type: type, fieldLabel: label, options: items, modelValue: [] })

      // Assert
      cy.get(multiselectId)
        .should('exist')
        .and('be.visible')
    })

    it("Displays error when validation isnt met", () => {
      // Arrange
      const errorMessage = "Must be less than 1"
      const schema = yup.object().shape({
        input: yup.array().max(1, errorMessage)
      })


      // Act
      //@ts-ignore
      mountFormFieldValidation({ name: name, type: type, fieldLabel: label, options: items, modelValue: [], schema: schema })
      cy.get(multiselectId).click()
      cy.get(option1Id).click()
      cy.get(option2Id).click()


      // Assert
      cy.get('[data-cy="error"]').should('contain.text', errorMessage)
    })
  })
  
  describe("Datepicker", () => {
    const type = "datepicker"
    const datepickerId = '[data-pc-name="calendar"]'
    const datepickerInputId = '[data-pc-section="input"]'

    it("Displays datepicker when type is datepicker", () => {
      // Act
      mountFormField({ name: name, type: type, fieldLabel: label })

      // Assert
      cy.get(datepickerId)
        .should('exist')
        .and('be.visible')
    })

    it("Displays error when validation isnt met", () => {
      // Arrange
      const errorMessage = "This is required"
      const invalid = "is-invalid"
      const schema = yup.object().shape({
        input: yup.array().required(errorMessage)
      })

      // Act
      mountFormFieldValidation({ name: name, type: type, fieldLabel: label, schema })
      cy.get(validationWrapperSubmitButton).click()

      // Assert
      cy.get(datepickerInputId)
        .and('have.class', invalid)

      cy.get('[data-cy="error"]')
        .should('have.text', errorMessage)
    })
  })
})