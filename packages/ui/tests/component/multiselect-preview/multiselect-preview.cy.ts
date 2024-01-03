// @ts-ignore
import MultiselectPreviewWrapper, { MultiselectPreviewWrapperProps } from "./multiselectPreviewWrapper.vue";
import { MultiSelectOption } from "../../../src/types/forge-types";

function mountMultiselectPreview(props : MultiselectPreviewWrapperProps) {
  cy.mount(MultiselectPreviewWrapper, {
    props
  })
}

const options = [
  { label: "Option 1", id: "1" },
  { label: "Option 2", id: "2" },
  { label: "Option 3", id: "3" }
] as MultiSelectOption<any>[]

const multiselectPreviewId = '[data-cy="multiselect-preview"]'
const optionsPreviewId = '[data-cy="options-preview"]'
const multiselectId = '[data-cy="multiselect"]'
const multiselectContainerId = '[data-cy="multiselect-container"]'
const option1Id = '[data-cy="Option 1"]'
const titleId = '[data-cy="title"]'

describe('<ForgeMultiSelectPreview />', () => {
  it("Mount", () => {
    // Arrange
    const selectedOptions = [
      { label: "Option 1", id: "1"}
    ] as MultiSelectOption<any>[]
    
    // Act
    mountMultiselectPreview({options: options, selectedOptions: selectedOptions})
  
    // Assert
    cy.get(multiselectPreviewId)
      .should('exist')
      .and('be.visible')
  })
  
  it("Can select Item from multiselect and it appears in preview", () => {
    // Arrange
    const selectedOptions = [] as MultiSelectOption<any>[]
    const expectedOption = "Option 1"

    // Act
    mountMultiselectPreview({ options: options, selectedOptions: selectedOptions })
    cy.get(multiselectId).click()
    cy.get(option1Id).click()
    cy.clickOff()

    // Assert
    cy.get(optionsPreviewId)
      .should("contain.text", expectedOption)
  })
  
  it("Displays a custom title", () => {
    // Arrange
    const title = "I am a title"
    const selectedOptions = [
      { label: "Option 1", id: "1" }
    ] as MultiSelectOption<any>[]
    
    // Act
    mountMultiselectPreview({ options: options, selectedOptions: selectedOptions, title: title })

    // Assert
    cy.get(titleId)
      .should("contain.text", title)
  })
  
  it("Displays dropdown and selected options side by side when orientation is column", () => {
    // Arrange
    const orientation = "column"
    const expectedClass = "row"
    const selectedOptions = [
      { label: "Option 1", id: "1" }
    ] as MultiSelectOption<any>[]
 
    // Act
    mountMultiselectPreview({ options: options, selectedOptions: selectedOptions, orientation: orientation })

    // Assert
    cy.get(multiselectPreviewId)
      .should('have.class', expectedClass)
  })

  it('Displays dropdown and selected options side by side when orientation is row', () => {
    // Arrange
    const orientation = "row"
    const expectedClass = "col-12"
    const selectedOptions = [
      { label: "Option 1", id: "1" }
    ] as MultiSelectOption<any>[]

    // Act
    mountMultiselectPreview({ options: options, selectedOptions: selectedOptions, orientation: orientation })

    // Assert
    cy.get(multiselectContainerId)
      .should('have.class', expectedClass)
    
    cy.get(optionsPreviewId)
      .should('have.class', expectedClass)
  });

  it('Removes item when remove icon is clicked', () => {
    // Arrange
    const canRemoveItemFromPreview = true
    const option = { label: "Option 1", id: "1" } as MultiSelectOption<any>
    const selectedOptions = [
      option
    ] as MultiSelectOption<any>[]
    const closeIcon = `[data-cy="close-icon-${option.id}"]`

    // Act
    mountMultiselectPreview({ options: options, selectedOptions: selectedOptions, canRemoveItemFromPreview: canRemoveItemFromPreview })
    cy.get(closeIcon).click()
    
    // Assert
    cy.get(optionsPreviewId)
      .should('not.contain.text', option.label)
  });
})


