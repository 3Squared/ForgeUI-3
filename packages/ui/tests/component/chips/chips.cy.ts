
// @ts-ignore
import ForgeChips, { ForgeChipsProps } from "../../../src/components/ForgeChips.vue";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { Severity } from "../../../src/types/forge-types";

const id = "chips"

function mountChips(props : ForgeChipsProps) {
  cy.mount(ForgeChips, {
    props,
    attrs: {
      id: id
    }
  })
}

describe("<Chips />", () => {
  it("Mounts", () => {
    // Arrange
    const value = ['Chip 1']
    
    // Act
    mountChips({ modelValue: value })
    
    // Assert
    cy.get(`#${id}`)
      .should('exist')
      .and('be.visible')
  })

  describe('Variant', () => {
    ;[
      { title: "Defaults to primary when variant is undefined" },
      { title: "Displays primary chips when variant is primary", variant: 'primary' },
      { title: "Displays secondary chips when variant is secondary", variant: 'secondary' },
      { title: "Displays success chips when variant is success", variant: 'success' },
      { title: "Displays warning chips when variant is warning", variant: 'warning' },
      { title: "Displays danger chips when variant is danger", variant: 'danger' },
      { title: "Displays info chips when variant is info", variant: 'info' }
    ].forEach(({ title, variant }) => {
      it(title, () => {
        // Arrange 
        const value = ['Chip 1', 'Chip 2']
        const expectedClasses = variant === undefined ? 'bg-primary border-primary' : `bg-${variant} border-${variant}`

        // Act
        mountChips({ chipSeverity: variant as Severity, modelValue: value})

        // Assert
        cy.get(`[data-pc-section="token"]`)
          .should('exist')
          .and('be.visible')
          .and('have.class', expectedClasses)
      })
    })
  })


  it('Greys out when disabled is true', () => {
    // Arrange
    const value = ['Chip 1', 'Chip 2']
    const disabledRgb = "rgb(233, 236, 239)"
    const disabledClass = "disabled"
    const disabledChipClass = "opacity-75"
    
    // Act
    mountChips({ modelValue: value, disabled: true })

    // Assert
    cy.get(`[data-pc-section="container"]`)
      .should('have.class', disabledClass)
      .and('have.css', 'background-color', disabledRgb)

    cy.get(`[data-pc-section="token"]`)
      .should('exist')
      .and('be.visible')
      .and('have.class', disabledChipClass)

    cy.get(`[data-pc-section="token"] svg`)
      .should('not.be.visible')
  })
  
  it('Applies rounded-pill class when pill is true', () => {
    // Arrange
    const value = ['Chip 1', 'Chip 2']
    const pillClass = "rounded-pill"
    
    // Act
    mountChips({ modelValue: value, pill: true })

    // Assert
    cy.get(`[data-pc-section="token"]`)
      .and('have.class', pillClass)
  })
  
  it("Displays placeholder when values are empty", () => {
    // Arrange
    const placeholder = "I am a placeholder"
    
    // Act
    mountChips({ placeholder: placeholder })
    
    // Assert
    cy.get(`[data-pc-section="input"]`)
      .should('have.attr', 'placeholder', placeholder)
  })
  
  it("Displays validation error when a rule isn't met", () => {
    // Arrange
    const validationMessage = "Must be greater than 2 characters."
    const rules = toTypedSchema(z.array(z.string().min(2, validationMessage)))
    const expectedErrorTextClass = "text-invalid"
    const expectedErrorClass = "is-invalid"
    
    // Act
    mountChips({ rules: rules })
    cy.get(`#${id}`).type("H{enter}")

    // Assert
    cy.get(`[data-pc-section="container"]`)
      .and('have.class', expectedErrorClass)
    
    cy.get(`[data-cy="error"]`)
      .should('have.class', expectedErrorTextClass)
      .and('contain.text', validationMessage)
  });
  
  it("Separates values by using a comma by default", () => {
    // Arrange
    const value1 = "Value 1"
    const value2 = "Value 2"

    // Act
    mountChips({ })
    cy.get(`#${id}`).type(`${value1},`)

    // Act/Assert
    cy.get(`[data-pc-section="container"]`)
      .and('contain.text', value1)

    cy.get(`#${id}`).type(`${value2},`)
    cy.get(`[data-pc-section="container"]`)
      .and('contain.text', value1)
      .and("contain.text", value2)
  })
  
  it("Uses custom separator when specified", () => {
    // Arrange
    const customSeparator = "@"
    const value1 = "Value 1"
    const value2 = "Value 2"

    // Act
    mountChips({ separator: customSeparator })
    cy.get(`#${id}`).type(`${value1}${customSeparator}`)

    // Act/Assert
    cy.get(`[data-pc-section="container"]`)
      .and('contain.text', value1)

    cy.get(`#${id}`).type(`${value2}${customSeparator}`)
    cy.get(`[data-pc-section="container"]`)
      .and('contain.text', value1)
      .and("contain.text", value2)
  })
  
  it("Separates values on enter", () => {
    // Arrange
    const value1 = "Value 1"
    const value2 = "Value 2"

    // Act
    mountChips({  })
    cy.get(`#${id}`).type(`${value1}{enter}`)

    // Act/Assert
    cy.get(`[data-pc-section="container"]`)
      .and('contain.text', value1)

    cy.get(`#${id}`).type(`${value2}{enter}`)
    cy.get(`[data-pc-section="container"]`)
      .and('contain.text', value1)
      .and("contain.text", value2)
  })
})