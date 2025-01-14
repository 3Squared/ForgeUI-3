import ForgeScratchpad  from "@/components/ForgeScratchpad.vue";
import { ScratchpadProps } from "../../../src/components/ForgeScratchpad.vue";

function mount(props: ScratchpadProps) {
  return cy.mount(ForgeScratchpad, {
    props
  })
}

describe('<ForgeScratchpad />', () => {
  it('Mount', () => {
    // Arrange

    // Act
    mount({})

    cy.get('[data-cy="drawing-canvas"]')
      .should('exist')
  })
  
  it('Should show undo button', () => {
    // Arrange

    // Act
    mount({})

    cy.get('[data-cy="undo-button"]')
      .should('exist')
  })
  
  it('Should not show undo button when showUndo is set to false', () => {
    // Arrange

    // Act
    mount({showUndo: false})

    cy.get('[data-cy="undo-button"]')
      .should('not.exist')
  })
  
  it('Should show redo button', () => {
    // Arrange

    // Act
    mount({})

    cy.get('[data-cy="redo-button"]')
      .should('exist')
  })
  
  it('Should not show redo button when showRedo is set to false', () => {
    // Arrange

    // Act
    mount({showRedo: false})

    cy.get('[data-cy="redo-button"]')
      .should('not.exist')
  })
  
  it('Should show clear button', () => {
    // Arrange

    // Act
    mount({})

    cy.get('[data-cy="clear-button"]')
      .should('exist')
  })
  
  it('Should not show clear button when showClear is set to false', () => {
    // Arrange

    // Act
    mount({showClear: false})

    cy.get('[data-cy="clear-button"]')
      .should('not.exist')
  })
  
  it('Should show save button', () => {
    // Arrange

    // Act
    mount({})

    cy.get('[data-cy="save-button"]')
      .should('exist')
  })
  
  it('Should not show save button when showSave is set to false', () => {
    // Arrange

    // Act
    mount({showSave: false})

    cy.get('[data-cy="save-button"]')
      .should('not.exist')
  })
})