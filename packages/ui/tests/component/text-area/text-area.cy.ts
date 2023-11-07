import Textarea, { TextareaProps } from "primevue/textarea";

function mountTextArea(props : TextareaProps) {
  // @ts-ignore
  cy.mount(Textarea, {
    props
  })
}

describe('<TextArea />', () => {
  it('Mounts', () => {
    // Arrange
    const id = "text-area"
    const expectedClass = "form-control"
    
    // Act
    mountTextArea({ id: id })
    
    // Assert
    cy.get(`#${id}`)
      .should('exist')
      .and("have.class", expectedClass)
      .and('be.visible')
  })

  it('Greys out when disabled is true', () => {
    // Arrange
    const id = "input"
    const disabledRgb = "rgb(233, 236, 239)"

    // Act
    mountTextArea({ id: id, disabled: true })


    // Assert
    cy.get(`#${id}`)
      .should('be.disabled')
      .and('have.css', 'background-color', disabledRgb)
  })
})