import { ForgeCheckbox } from "../../../index";

describe("<ForgeCheckbox />", () => {
  it("Mounts", () => {
    // Arrange
    const id = "checkbox"
    const label = "Checkbox"
    
    // Act
    cy.mount(ForgeCheckbox, {
      props: {
        binary: true,
        name: id,
        label: label
      }
    })
    
    // Assert
    cy.get('[data-cy="checkbox-container"]').should('be.visible').and('contain.text', label)
  })
  
  it("Displays a white tick when checked", () => {
    // Arrange
    const id = "checkbox"
    const label = "Checkbox"

    // Act
    cy.mount(ForgeCheckbox, {
      props: {
        modelValue: true,
        binary: true,
        name: id,
        label: label
      }
    })

    // Assert
    cy.get('[data-cy="checkbox-icon"]').should('be.visible')
  })
})