import { ForgeCheckbox } from "../../../index";
import { ForgeCheckProps } from "../../../src/components/ForgeCheckbox.vue";
import CheckboxValidationWrapper, { CheckboxValidationWrapperProps } from "./checkboxValidationWrapper.vue";
import * as yup from 'yup'

const checkboxInput = '[data-pc-section="input"]'
const checkboxContainer = '[data-cy="checkbox-container"]'
const formButton = "#form-button"
const error = '[data-cy="error"]'

const id = "checkbox"
const label = "Checkbox"

function mountForgeCheckbox(props: ForgeCheckProps) {
  cy.mount(ForgeCheckbox, {
    props: {
      binary: true,
      ...props
    }
  })
}

function mountForgeCheckboxValidation(props : CheckboxValidationWrapperProps) {
  cy.mount(CheckboxValidationWrapper, {
    props
  })
}

describe("<ForgeCheckbox />", () => {
  it("Mounts", () => {
    // Arrange


    // Act
    mountForgeCheckbox({ name: id, label })

    // Assert
    cy.get(checkboxContainer).should('be.visible').and('contain.text', label)
  })

  it("Displays a white tick when checked", () => {
    // Arrange
    const id = "checkbox"
    const label = "Checkbox"
    const expectedClass = "bg-primary"
    const expectedCssProperty = 'background-image'
    const whiteTickUrl = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='m6 10 3 3 6-6'/%3e%3c/svg%3e")`

    // Act
    mountForgeCheckbox({ modelValue: true, name: id, label: label })

    // Assert
    cy.get(checkboxInput)
      .should('be.visible')
      .and('have.css', expectedCssProperty, whiteTickUrl)
      .and('have.class', expectedClass)

  })

  it("Should display invalid state when validation schema isn't satisfied", () => {
    // Arrange
    const id = "checkbox"
    const label = "Checkbox"
    const errorMessage = "Required"
    const errorClass = "is-invalid"
    const errorMessageClass = "text-invalid"
    const schema = yup.object().shape({
      checkbox: yup.boolean().required(errorMessage)
    })

    // Act
    mountForgeCheckboxValidation({ name: id, label: label, schema })
    cy.get(formButton).click()
    
    // Assert
    cy.get(checkboxInput)
      .should('have.class', errorClass)
    
    cy.get(error)
      .should("have.text", errorMessage)
      .and("have.class", errorMessageClass)
  });
})