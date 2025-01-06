// @ts-ignore
import { ForgeMultiSelectProps } from "@/components/ForgeMultiSelect";
import MultiselectWrapper from "./multiselectWrapper.vue";
import MultiselectValidationWrapper, { MultiSelectValidationWrapperProps } from "./multiselectValidationWrapper.vue";
import * as yup from 'yup'
import { MultiSelectOption } from "../../../src/types/forge-types.ts";
import { MultiSelectProps } from "primevue";


const options = [
  { label: "Option 1", id: "1" },
  { label: "Option 2", id: "2" },
  { label: "Option 3", id: "3" }
] as MultiSelectOption<any>[]

const multiselectId = '[data-pc-name="multiselect"]'
const optionId = '[data-pc-section="option"]'
const clearButtonId = '[data-pc-section="clearicon"]'
const toggleAllId = '[data-pc-name="pcheadercheckbox"]'
const errorMessageId = '[data-cy="error"]'
const labelContainerId = '[data-pc-section="labelcontainer"]'
const filterId = '[data-pc-name="pcfilter"]'
const formButtonId = '[id="form-button"]'


function mountMultiselect(props : MultiSelectProps) {
  cy.mount(MultiselectWrapper, {
    props,
  })
}

function mountMultiselectValidationWrapper(props : MultiSelectValidationWrapperProps) {
  cy.mount(MultiselectValidationWrapper, {
    props
  })
}

describe("<Multiselect />", () => {
  it("Mounts", () => {
    // Act
    mountMultiselect({ options: options })
    
    // Assert
    cy.get(multiselectId)
      .should('exist')
      .and('be.visible')
  })
  
  it("Displays validation", () => {
    // Arrange
    const errorMessage = "Please select at least 1 option"
    const schema = yup.object().shape({
      select: yup.array().min(2, errorMessage)
    })
    
    // Act
    //@ts-ignore
    mountMultiselectValidationWrapper({ options: options, schema: schema })
    
    cy.get(formButtonId).click();
    // Assert
    cy.get(errorMessageId).should('contain.text', errorMessage)
  })
  
  describe("Multiselect", () => {
    it("Allows the user to select multiple options", () => {
      // Act
      mountMultiselect({ options: options})
      cy.get(multiselectId).click()
      cy.get(optionId).contains("Option 1").click()
      cy.get(optionId).contains("Option 2").click()
      

      // Assert
      cy.get(labelContainerId)
        .and('contain.text', 'Option 1')
        .and('contain.text', 'Option 2')
    })
    
    it("Allows the user to unselect an option by clicking on a selected option", () => {
      // Arrange
      const expectedPlaceholder = "Select"
      
      // Act
      mountMultiselect({ options: options })
      cy.get(multiselectId).click()
      cy.get(optionId).contains("Option 1").click()

      cy.get(labelContainerId)
        .and('contain.text', 'Option 1')

      cy.get(optionId).contains("Option 1").click()

      // Assert
      cy.get(multiselectId)
        .should('contain.text', expectedPlaceholder)
    })
  })

  describe("Filter", () => {
    it("Should show filter if filter is true", () => {
      // Arrange
    

      // Act
      mountMultiselect({ options: options, filter: true })
      cy.get(multiselectId).click()

      // Assert
      cy.get(filterId)
        .should('exist')
    })
    
    it("Should show not filter if filter not set to true", () => {
      // Arrange
      // Act
      mountMultiselect({ options: options })
      cy.get(multiselectId).click()

      // Assert
      cy.get(filterId)
        .should('not.exist')
    })
  })
  
  describe("Clear button", () => {
    it("Displays a clear button in the multiselect when showClear is true", () => {
      // Arrange
      // Act
      mountMultiselect({ options: options, showClear: true })
      cy.get(multiselectId).click()
      cy.get(optionId).contains("Option 1").click()
      cy.get(optionId).contains("Option 2").click()

      // Assert
      cy.get(clearButtonId)
        .should('exist')
        .and('be.visible')
    })

    it('Clears all selected options on click of the clear button', () => {
      // Arrange
      const expectedPlaceholder = "Select"

      // Act
      mountMultiselect({ options: options, showClear: true })
      cy.get(multiselectId).click()
      cy.get(optionId).contains("Option 1").click()
      cy.get(optionId).contains("Option 2").click()

      cy.get(labelContainerId)
        .and('contain.text', 'Option 1')
        .and('contain.text', 'Option 2')

      cy.get(clearButtonId).click()

      // Assert
      cy.get(multiselectId)
        .should('contain.text', expectedPlaceholder)
    });
  })
  
  describe("Toggle All", () => {
    it("Displays a toggle all button when showSelectAll is true", () => {
      // Arrange
      // Act
      mountMultiselect({ options: options })
      cy.get(multiselectId).click()

      // Assert
      cy.get(toggleAllId)
        .children()
        .should('exist')
    })

    it("Selects all options on toggle on of select all", () => {
      // Arrange

      // Act
      mountMultiselect({ options: options })
      cy.get(multiselectId).click()
      cy.get(toggleAllId).click()

      // Assert
      cy.get(`${toggleAllId} input`).should('be.checked')

      cy.get(labelContainerId)
        .and('contain.text', 'Option 1')
        .and('contain.text', 'Option 2')
        .and('contain.text', 'Option 3')
    })

    it("Unselects all options on toggle off of select all", () => {
      // Arrange
      const expectedPlaceholder = "Select"

      // Act
      mountMultiselect({ options: options })
      cy.get(multiselectId).click()
      cy.get(toggleAllId).click()

      cy.get(labelContainerId)
        .and('contain.text', 'Option 1')
        .and('contain.text', 'Option 2')
        .and('contain.text', 'Option 3')

      cy.get(toggleAllId).click()

      // Assert
      cy.get(`${toggleAllId} input`).should('not.be.checked')

      cy.get(multiselectId)
        .should('contain.text', expectedPlaceholder)
    })
  })
})