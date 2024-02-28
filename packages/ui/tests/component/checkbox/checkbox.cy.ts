import { ForgeCheckbox } from "../../../index";

const checkboxInput = '[data-pc-section="input"]'
const checkboxContainer = '[data-cy="checkbox-container"]'
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
    cy.mount(ForgeCheckbox, {
      props: {
        modelValue: true,
        binary: true,
        name: id,
        label: label
      }
    })

    // Assert
    cy.get(checkboxInput)
      .should('be.visible')
      .and('have.css', expectedCssProperty, whiteTickUrl)
      .and('have.class', expectedClass)

  })
})