// @ts-ignore
import { ForgeMultiSelectProps } from "@/components/ForgeMultiSelect";
import MultiselectWrapper from "./multiselectWrapper.vue";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";


const options = [
  { label: "Option 1", id: "1" },
  { label: "Option 2", id: "2" },
  { label: "Option 3", id: "3" }
]

const multiselectId = '[data-cy="multiselect"]'
const option1Id = '[data-cy="Option 1"]'
const option2Id = '[data-cy="Option 2"]'
const option3Id = '[data-cy="Option 3"]'
const clearButtonId = '[data-cy="clear"]'
const toggleAllId = '[data-cy="toggle-all"]'
const errorMessageId = '[data-cy="error"]'
const tagsWrapId = '.multiselect__tags-wrap'
const inputId = ".multiselect__tags"
const optionId = ".multiselect__option"

function mountMultiselect(props : ForgeMultiSelectProps) {
  cy.mount(MultiselectWrapper, {
    props,
  })
}

describe("<ForgeMultiselect />", () => {
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
    const errorMessage = "Must be less than 1"

    const rules = toTypedSchema(
      z.array(
        z.object({
          id: z.string(),
          label: z.string()
        })
      ).max(2, errorMessage))
    
    // Act
    mountMultiselect({ options: options, rules: rules })
    cy.get(multiselectId).click()
    cy.get(option1Id).click()
    cy.get(option2Id).click()
    cy.get(option3Id).click()
    
    // Assert
    cy.get(errorMessageId).should('contain.text', errorMessage)
  })
  
  describe("Multiselect", () => {
    it("Allows the user to select multiple options", () => {
      // Act
      mountMultiselect({ options: options })
      cy.get(multiselectId).click()
      cy.get(option1Id).click()
      cy.get(option2Id).click()

      // Assert
      cy.get(tagsWrapId).children()
        .should('have.length', 2)
        .and('contain.text', 'Option 1')
        .and('contain.text', 'Option 2')
    })
    
    it("Allows the user to unselect an option by clicking on a selected option", () => {
      // Arrange
      const expectedPlaceholder = "Select"
      
      // Act
      mountMultiselect({ options: options })
      cy.get(multiselectId).click()
      cy.get(option1Id).click()

      cy.get(tagsWrapId).children()
        .should('have.length', 1)
        .and('contain.text', 'Option 1')

      cy.get(option1Id).click()

      // Assert
      cy.get(inputId)
        .should('contain.text', expectedPlaceholder)
    })
  })

  describe("Select", () => {
    it("Allows only allows a user to select a singular option when multiple is false", () => {
      // Arrange
      const multiple = false
      const option1 = "Option 1"
      const option2 = "Option 2"
      
      // Act
      mountMultiselect({ options: options, multiple: multiple })
      cy.get(multiselectId).click()
      cy.get(optionId).contains(option1).click()

      // Assert
      cy.get(inputId)
        .and('contain.text', option1)

      cy.get(optionId).contains(option2).click()

      cy.get(inputId)
        .and('contain.text', option2)
    })
  })
  
  describe("Placeholder", () => {
    it("Should default to Search if searchable is true", () => {
      // Arrange
      const expectedPlaceholder = "Search"

      // Act
      mountMultiselect({ options: options, searchable: true })

      // Assert
      cy.get(inputId)
        .should('contain.text', expectedPlaceholder)
    })

    it("Should default to Select if searchable is false", () => {
      // Arrange
      const expectedPlaceholder = "Select"

      // Act
      mountMultiselect({ options: options, searchable: false })

      // Assert
      cy.get(inputId)
        .should('contain.text', expectedPlaceholder)
    })
  })
  
  describe("Clear button", () => {
    it("Displays a clear button in the multiselect when showClearSelection is true", () => {
      // Arrange
      const showClearSelection = true

      // Act
      mountMultiselect({ options: options, showClearSelection: showClearSelection })
      cy.get(multiselectId).click()
      cy.get(option1Id).click()
      cy.get(option2Id).click()

      // Assert
      cy.get(clearButtonId)
        .should('exist')
        .and('be.visible')
    })

    it('Clears all selected options on click of the clear button', () => {
      // Arrange
      const expectedPlaceholder = "Select"
      const showClearSelection = true

      // Act
      mountMultiselect({ options: options, showClearSelection: showClearSelection })
      cy.get(multiselectId).click()
      cy.get(option1Id).click()
      cy.get(option2Id).click()

      cy.get(tagsWrapId).children()
        .should('have.length', 2)
        .and('contain.text', 'Option 1')
        .and('contain.text', 'Option 2')

      cy.get(clearButtonId).click()

      // Assert
      cy.get(clearButtonId)
        .and('not.exist')

      cy.get(inputId)
        .should('contain.text', expectedPlaceholder)
    });
  })
  
  describe("Toggle All", () => {
    it("Displays a toggle all button when showSelectAll is true", () => {
      // Arrange
      const showSelectAll = true

      // Act
      mountMultiselect({ options: options, showSelectAll: showSelectAll })
      cy.get(multiselectId).click()

      // Assert
      cy.get(toggleAllId)
        .should('exist')
        .and('be.visible')
    })

    it.only("Selects all options on toggle on of select all", () => {
      // Arrange
      const showSelectAll = true

      // Act
      mountMultiselect({ options: options, showSelectAll: showSelectAll })
      cy.get(multiselectId).click()
      cy.get(toggleAllId).click()

      // Assert
      cy.get(`${toggleAllId} input`).should('be.checked')

      cy.get(tagsWrapId).children()
        .should('have.length', 3)
        .and('contain.text', 'Option 1')
        .and('contain.text', 'Option 2')
        .and('contain.text', 'Option 3')
    })

    it("Unselects all options on toggle off of select all", () => {
      // Arrange
      const showSelectAll = true
      const expectedPlaceholder = "Select"

      // Act
      mountMultiselect({ options: options, showSelectAll: showSelectAll })
      cy.get(multiselectId).click()
      cy.get(toggleAllId).click()

      cy.get(tagsWrapId).children()
        .should('have.length', 3)
        .and('contain.text', 'Option 1')
        .and('contain.text', 'Option 2')
        .and('contain.text', 'Option 3')

      cy.get(toggleAllId).click()

      // Assert
      cy.get(`${toggleAllId} input`).should('not.be.checked')

      cy.get(inputId)
        .should('contain.text', expectedPlaceholder)
    })
    
    it("Adds row highlighting on hover of toggle all", () => {
      // Arrange
      const showSelectAll = true
      const expectedClass = 'multiselect__option--highlight'
      
      // Act
      mountMultiselect({ options: options, showSelectAll: showSelectAll })
      cy.get(multiselectId).click()
      cy.get(toggleAllId).realHover()
      
      // Assert
      cy.get(`${toggleAllId} .multiselect__option`).should('have.class', expectedClass)
    })

    it("Removes row highlighting on mouse off of toggle all", () => {
      // Arrange
      const showSelectAll = true
      const expectedClass = 'multiselect__option--highlight'

      // Act
      mountMultiselect({ options: options, showSelectAll: showSelectAll })
      cy.get(multiselectId).click()
      cy.get(toggleAllId).realHover()

      cy.get(`${toggleAllId} .multiselect__option`).should('have.class', expectedClass)

      cy.get(option1Id).realHover()
      
      // Assert
      cy.get(`${toggleAllId} .multiselect__option`).should('not.have.class', expectedClass)
    })
  })
})