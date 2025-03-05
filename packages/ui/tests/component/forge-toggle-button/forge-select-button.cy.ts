import ForgeSelectButton from "@/components/ForgeSelectButton.vue";
import { ForgeSelectButtonProps } from "../../../src/components/ForgeSelectButton.vue";
import { ForgeSelectButtonOption } from "../../../src/types/forge-types.ts";

const id = '[data-cy="forge-select-button"]'

function mountSelectButton(props : ForgeSelectButtonProps, value?: string[]) {
  cy.mount(ForgeSelectButton, {
    props: {
      ...props,
      modelValue: value
    },
    attrs: {
      id: id
    }
  })
}

describe('<ForgeSelectButton />', () => {

  it("Mounts", () => {    
    const options = [
      { label: "Maj", value: "1", severity: "danger"},
      { label: "Min", value: "2", severity: "warning" },
      { label: "Pro", value: "3", severity: "success" },
      { label: "Ex", value: "4", severity: "success-dark" },
      { label: "N/A", value: "5", severity: "secondary" }
    ] as ForgeSelectButtonOption[]
    
    mountSelectButton({options: options} )
    // Assert
    cy.get(`${id}`)
      .should('exist')
      .and('be.visible')
  })
  
  describe('Variant', () => {
    ;[
      { title: "Displays primary btn when severity is primary", severity: 'primary' },
      { title: "Displays brand btn when severity is brand", severity: 'brand' },
      { title: "Displays secondary btn when severity is secondary", severity: 'secondary' },
      { title: "Displays success btn when severity is success", severity: 'success' },
      { title: "Displays success-dark btn when severity is success", severity: 'success' },
      { title: "Displays warning btn when severity is warning", severity: 'warning' },
      { title: "Displays danger btn when severity is danger", severity: 'danger' },
      { title: "Displays info btn when severity is info", severity: 'info' }
    ].forEach(({ title, severity }) => {
      it(title, () => {
        // Arrange 
        const options = [{ label: "Test", value: "1", severity: severity}] as ForgeSelectButtonOption[];

        const expectedClasses =`border text-${severity} select-btn-${severity}`

        // Act
        mountSelectButton({options: options} )

        // Assert
        cy.get('[data-cy="toggle-button-1"]')
          .should('exist')
          .and('be.visible')
          .and('have.class', expectedClasses)
      })
    })
  })
  
  it("Toggles selection when button is clicked", () => {
    // Arrange
    const options = [
      { label: "Maj", value: "1", severity: "danger"},
      { label: "Min", value: "2", severity: "warning" },
      { label: "Pro", value: "3", severity: "success" },
      { label: "Ex", value: "4", severity: "success-dark" },
      { label: "N/A", value: "5", severity: "secondary" }
    ] as ForgeSelectButtonOption[]
    
    const severity = `danger`
    const expectedSelectedClasses = `focus-ring focus-ring-${severity} btn-${severity}-subtle border border-2 border-${severity} fw-500 text-${severity}`

    mountSelectButton({options: options} )

    // Assert
    cy.get('[data-cy="toggle-button-1"]').click();
    cy.get('[data-cy="toggle-button-1"]')
      .should('have.class', expectedSelectedClasses)
  })

  it("Allows for multiple options to be selected when multiple is true", () => {
    // Arrange
    const options = [
      { label: "Maj", value: "1"},
      { label: "Min", value: "2" },
      { label: "Pro", value: "3"},
      { label: "Ex", value: "4" },
      { label: "N/A", value: "5"}
    ] as ForgeSelectButtonOption[]

    const severity = `primary`
    const expectedSelectedClasses = `focus-ring focus-ring-${severity} btn-${severity}-subtle border border-2 border-${severity} fw-500 text-${severity}`

    mountSelectButton({multiple: true, options: options})

    cy.get('[data-cy="toggle-button-1"]').click();
    cy.get('[data-cy="toggle-button-2"]').click();
    cy.get('[data-cy="toggle-button-1"]')
      .should('have.class', expectedSelectedClasses)
    cy.get('[data-cy="toggle-button-2"]')
      .should('have.class', expectedSelectedClasses)
  })

  it("Stops multiple options from being selected when multiple is false", () => {
    // Arrange
    // Arrange
    const options = [
      { label: "Maj", value: "1"},
      { label: "Min", value: "2" },
      { label: "Pro", value: "3"},
      { label: "Ex", value: "4" },
      { label: "N/A", value: "5"}
    ] as ForgeSelectButtonOption[]

    const severity = `primary`
    const expectedSelectedClasses = `focus-ring focus-ring-${severity} btn-${severity}-subtle border border-2 border-${severity} fw-500 text-${severity}`

    mountSelectButton({multiple: false, options: options})

    cy.get('[data-cy="toggle-button-1"]').click();
    cy.get('[data-cy="toggle-button-2"]').click();
    cy.get('[data-cy="toggle-button-1"]')
      .should('not.have.class', expectedSelectedClasses)
    cy.get('[data-cy="toggle-button-2"]')
      .should('have.class', expectedSelectedClasses)
  })
  
  it("Show options as selected if set to select when first loaded", () => {
    // Arrange
    const options = [
      { label: "Maj", value: "1"},
      { label: "Min", value: "2" },
      { label: "Pro", value: "3"},
      { label: "Ex", value: "4" },
      { label: "N/A", value: "5"}
    ] as ForgeSelectButtonOption[]

    const severity = `primary`
    const expectedSelectedClasses = `focus-ring focus-ring-${severity} btn-${severity}-subtle border border-2 border-${severity} fw-500 text-${severity}`
    
    mountSelectButton({options: options}, ['1'] )

    cy.get('[data-cy="toggle-button-1"]')
      .should('have.class', expectedSelectedClasses)
  })
  
  it("Should not allow deselection of the last option when allow empty is set to false", () => {
    // Arrange
    const options = [
      { label: "Maj", value: "1" },
      { label: "Min", value: "2" },
      { label: "Pro", value: "3"},
      { label: "Ex", value: "4" },
      { label: "N/A", value: "5"}
    ] as ForgeSelectButtonOption[]

    const severity = `primary`
    const expectedSelectedClasses = `focus-ring focus-ring-${severity} btn-${severity}-subtle border border-2 border-${severity} fw-500 text-${severity}`

    mountSelectButton({allowEmpty: false, options: options}, ['1'])

    cy.get('[data-cy="toggle-button-1"]')
      .should('have.class', expectedSelectedClasses)
    
    cy.get('[data-cy="toggle-button-1"]').click();
    cy.get('[data-cy="toggle-button-1"]')
      .should('have.class', expectedSelectedClasses)
  })
})