import InputNumber, { InputNumberProps } from "primevue/inputnumber";

const id = "input"

function mountInput(props: InputNumberProps) {
  // @ts-ignore
  cy.mount(InputNumber, {
    props: {
      ...props,
      inputId: id
    },
  })
}

describe('<InputNumber />', () => {
  it("Mounts", () => {
    // Arrange
    const expectedClass = "form-control"
    
    // Act
    mountInput({})
    
    // Assert
    cy.get(`#${id}`)
      .should('exist')
      .and("have.class", expectedClass)
      .and('be.visible')
  })

  it("Only allows numeric characters to be inputted when type is number", () => {
    // Arrange
    const numericString = "123"
    const string = "Hello"

    // Act
    mountInput({ })
    cy.get(`#${id}`).type(string)

    // Assert
    cy.get(`#${id}`).should('not.contain.value')

    cy.get(`#${id}`).type(numericString)
    cy.get(`#${id}`).should('contain.value', numericString)
  })
})