import RemainingCharactersWrapper from "./RemainingCharactersWrapper.vue";
// @ts-ignore
import { RemainingCharactersProps } from "@/components/ForgeRemainingCharacters.vue";

function mountRemainingCharacters(props : RemainingCharactersProps) {
  return cy.mount(RemainingCharactersWrapper, {
    props
  })
}

describe('<ForgeRemainingCharacters />', () => {
  it('Updates the remaining count when a string is typed', () => {
    // Arrange
    const stringToType = "Hello!"
    const maxCount = 10
    const expectedRemainingCharacters = 4
    
    // Act
    mountRemainingCharacters({ maxCount: maxCount })
    
    cy.get('[data-cy="remaining-characters"]')
      .should('be.visible')
      .and('contain.text', maxCount)
    
    cy.get('[data-cy="input-field"]').type(stringToType)
    
    // Assert
    cy.get('[data-cy="remaining-characters"]')
      .should('be.visible')
      .and('contain.text', expectedRemainingCharacters)
  })
  
  it("Makes text red once the string length exceeds the max count", () => {
    // Arrange
    const stringToType = "Hello!"
    const maxCount = 1
    const expectedRemainingCharacters = -5
    const expectedClass = "text-danger"

    // Act
    mountRemainingCharacters({ maxCount: maxCount })

    cy.get('[data-cy="remaining-characters"]')
      .should('be.visible')
      .and('contain.text', maxCount)

    cy.get('[data-cy="input-field"]').type(stringToType)

    // Assert
    cy.get('[data-cy="remaining-characters"]')
      .should('be.visible')
      .and('contain.text', expectedRemainingCharacters)
      .and("have.class", expectedClass)
  })
  
  it("Removes danger class once string length is less than the max count", () => {
    // Arrange
    const stringToType = "Hello!"
    const maxCount = 1
    const expectedRemainingCharacters = -5
    const expectedClass = "text-danger"

    // Act
    mountRemainingCharacters({ maxCount: maxCount })

    cy.get('[data-cy="remaining-characters"]')
      .should('be.visible')
      .and('contain.text', maxCount)

    cy.get('[data-cy="input-field"]').type(stringToType)
    
    cy.get('[data-cy="remaining-characters"]')
      .should('be.visible')
      .and('contain.text', expectedRemainingCharacters)
      .and("have.class", expectedClass)

    cy.get('[data-cy="input-field"]').clear()
    
    // Assert
    cy.get('[data-cy="remaining-characters"]')
      .should('be.visible')
      .and('contain.text', maxCount)
      .and("not.have.class", expectedClass)
  })
})