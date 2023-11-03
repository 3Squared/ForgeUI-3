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
    // Act
    mountInput({})
    
    // Assert
    cy.get(`#${id}`)
      .should('exist')
      .and('be.visible')
  })
})