// @ts-ignore
import ForgePageHeader, { ForgePageHeaderProps } from "@/components/ForgePageHeader.vue";

function mountPageHeader(props: ForgePageHeaderProps) {
  return cy.mount(ForgePageHeader, {
    props
  })
}

function mountPageHeaderWithSlot(props: ForgePageHeaderProps, slotContent: string) {
  return cy.mount(ForgePageHeader, {
    props,
    slots: {
      default: slotContent
    }
  })
}

describe("<ForgePageHeader />", () => {
  it("Displays title in a heading", () => {
    // Arrange
    const heading = "Hello"
    const headingClass = "h3"
    
    // Act
    mountPageHeader({ title: heading })
    
    // Assert
    cy.get('[data-cy="title"]')
      .should("be.visible")
      .and('contain.text', heading)
      .and('have.class', headingClass)
  })
  
  it("Displays item in slot next to the title", () => {
    // Arrange
    const heading = "Hello"
    const slot = "I'm in the slot!"
    const headingClass = "h3"

    // Act
    mountPageHeaderWithSlot({ title: heading }, slot)

    // Assert
    cy.get('[data-cy="title"]')
      .should("be.visible")
      .and('contain.text', heading)
      .and('have.class', headingClass)
    
    cy.get('[data-cy="slot"]')
      .should("be.visible")
      .and("contain.text", slot)
  })
})
