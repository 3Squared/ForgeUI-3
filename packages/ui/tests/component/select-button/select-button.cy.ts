import SelectButton, { SelectButtonProps } from "primevue/selectbutton";

const id = "select-button"

function mountSelectButton(props : SelectButtonProps) {
  // @ts-ignore
  cy.mount(SelectButton, {
    props,
    attrs: {
      id: id
    }
  })
}

describe('<SelectButton />', () => {
  it("Mounts", () => {
    // Arrange
    const options = ['Option 1', 'Option 2', 'Option 3']
    
    // Act
    mountSelectButton({ options: options })
    
    // Assert
    cy.get(`#${id}`)
      .should('exist')
      .and('be.visible')
  })
  
  it("Displays selected value as a primary button", () => {
    // Arrange
    const selectedOption = "Option 2"
    const expectedClass = "btn btn-primary"
    const options = ['Option 1', 'Option 2', 'Option 3']

    // Act
    mountSelectButton({ options: options, modelValue: selectedOption })

    // Assert
    cy.get(`#${id}`)
      .contains(selectedOption)
      .should('have.class', expectedClass)
  })
  
  it("Allows for multiple options to be selected when multiple is true", () => {
    // Arrange
    const selectedOptions = ['Option 1', 'Option 2']
    const expectedClass = "btn btn-primary"
    const options = ['Option 1', 'Option 2', 'Option 3']

    // Act
    mountSelectButton({ options: options, modelValue: selectedOptions, multiple: true })

    // Assert
    cy.get(`#${id}`)
      .contains(selectedOptions[0])
      .should('have.class', expectedClass)

    cy.get(`#${id}`)
      .contains(selectedOptions[1])
      .should('have.class', expectedClass)


    cy.get(`#${id}`)
      .contains(options[2])
      .parent()
      .should('not.have.class', expectedClass)
  })
  
  it('Disables the entire component when disabled is set to true', () => {
    // Arrange
    const options = ['Option 1', 'Option 2', 'Option 3']

    // Act
    mountSelectButton({ options: options, disabled: true })

    // Assert
    cy.get(`[data-pc-name="pctogglebutton"]`)
      .should('be.disabled')
  })
  
  it("Disables option when specified", () => {
    // Arrange
    const disabledClass = "disabled"
    const disabledOption = "Option 2"
    const options = [
      { label: "Option 1"},
      { label: "Option 2", disabled: true },
      { label: "Option 3"}
    ]

    // Act
    mountSelectButton({ options: options, optionDisabled: 'disabled' })

    // Assert
    cy.get(`#${id}`)
      .contains('Option 2')
      .should('be.disabled')
  })
})