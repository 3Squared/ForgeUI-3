// @ts-ignore
import { AutoCompleteProps } from "primevue/autocomplete";
import { ForgeAutoComplete } from "../../../index.ts";

const id = "autocomplete"

function mountAutoComplete(props: AutoCompleteProps) {
  cy.mount(ForgeAutoComplete, {
    props,
    attrs: {
      id: id
    }
  })
}

describe("<ForgeAutoComplete />", () => {
  it("Mounts", () => {
    // Arrange
    const suggestions = ['Chip 1', 'Chip 2'];

    // Act
    mountAutoComplete({ suggestions: suggestions })

    // Assert
    cy.get(`#${id}`)
      .should('exist')
      .and('be.visible')
  })

  it('Greys out when disabled is true', () => {
    // Arrange

    const disabledClass = "disabled"
    const suggestions = ['Chip 1', 'Chip 2'];

    // Act
    mountAutoComplete({ suggestions: suggestions, disabled: true })

    // Assert
    cy.get(`[data-pc-name="autocomplete"]`)
      .should('have.class', disabledClass)
  })

  it("Displays placeholder when values are empty", () => {
    // Arrange
    const placeholder = "I am a placeholder"

    // Act
    mountAutoComplete({ placeholder: placeholder })

    // Assert
    cy.get(`[data-pc-name="pcinputtext"]`)
      .should('have.attr', 'placeholder', placeholder)
  })
});