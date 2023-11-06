import InputMask, { InputMaskProps } from "primevue/inputmask";

const id = "mask"
function mountInputMask(props : InputMaskProps) {
  // @ts-ignore
  cy.mount(InputMask, {
    props,
    attrs: {
      id: id
    }
  })
}

describe("<InputMask />", () => {
  it("Displays input mask when type is mask", () => {
    // Arrange
    const expectedClass = "form-control"
    const mask = "99-999999"

    // Act
    mountInputMask({ mask: mask })
    cy.get(`#${id}`).type(mask)

    // Assert
    cy.get(`#${id}`)
      .should('exist')
      .and('be.visible')
      .and('have.class', expectedClass)
      .and('contain.value', mask)
  })
})