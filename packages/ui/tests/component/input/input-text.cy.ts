import InputText, { InputTextProps } from "primevue/inputtext";

function mountInput(props : InputTextProps) {
  // @ts-ignore
  cy.mount(InputText, {
    props
  })
}

describe('<InputText />', () => {
  it('Mounts', () => {
    // Arrange
    const id = "input"
    
    // Act
    mountInput({ id: id })
    
    // Assert
    cy.get(`#${id}`)
      .should('exist')
      .and('be.visible')
  })
  
  it('Displays placeholder in textbox', () => {
    // Arrange
    const id = "input"
    const placeholder = "Placeholder"

    // Act
    mountInput({ id: id, placeholder: placeholder })

    // Assert
    cy.get(`#${id}`)
      .should('have.attr', 'placeholder', placeholder)
  })
  
  ;[
    { title: 'Makes the textbox smaller when size is small', size: 'small' },
    { title: 'Makes the textbox bigger when the size is large', size: 'large' },
  ]
    .forEach(({ title, size }) => {
      it(title, () => {
        // Arrange
        const id = "input"
        const expectedClass = size == 'small' ? 'form-control-sm' : 'form-control-lg'

        // Act
        mountInput({ id: id, size: size as 'small' | 'large' })

        // Assert
        cy.get(`#${id}`).should('have.class', expectedClass)
      })
    })
  
  it('Greys out when disabled is true', () => {
    // Arrange
    const id = "input"
    const disabledRgb = "rgb(233, 236, 239)"

    // Act
    mountInput({ id: id, disabled: true })

    // Assert
    cy.get(`#${id}`)
      .should('be.disabled')
      .and('have.css', 'background-color', disabledRgb)
  })
  
  it('Makes input readonly when readonly is set to true', () => {
    // Arrange
    const id = "input"

    // Act
    mountInput({ id: id, readonly: true,  })

    // Assert
    cy.get(`#${id}`)
      .should('have.attr', 'readonly')
  })
})