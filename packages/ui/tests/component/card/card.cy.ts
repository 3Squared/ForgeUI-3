import Card from "primevue/card";

const cardId = "Card"

interface CardSlots {
  header?: string,
  title?: string,
  subtitle?: string,
  content?: string,
  footer?: string,
}

function mountCard(slots : CardSlots) {
  //@ts-ignore
  cy.mount(Card, {
    attrs: {
      id: cardId
    },
    slots
  })
}

describe('<Card />', () => {
  it('Mounts', () => {
    // Arrange
    const title = "Card title"
    const content = "Card content"
    const footer = "Card footer"
    const expectedCardClass = "card"
    
    // Act
    mountCard({ title: title, content: content, footer: footer })
    
    // Arrange
    cy.get(`#${cardId}`)
      .should('exist')
      .and('be.visible')
      .and('have.class', expectedCardClass)
  })

  it('Adds card-body to the body slot', () => {
    // Arrange
    const header = "Card header"
    const cardHeaderClass = "card-body"

    // Act
    mountCard({ header: header })

    // Arrange
    cy.get(`[data-pc-section="body"]`)
      .should('have.class', cardHeaderClass)
  })
  
  it('Adds card-header to the header slot', () => {
    // Arrange
    const header = "Card header"
    const cardHeaderClass = "card-header"

    // Act
    mountCard({ header: header })

    // Arrange
    cy.get(`[data-pc-section="header"]`)
      .should('have.class', cardHeaderClass)
  })

  it('Adds card-title to the title slot', () => {
    // Arrange
    const title = "Card title"
    const cardHeaderClass = "card-title h4"

    // Act
    mountCard({ title: title })

    // Arrange
    cy.get(`[data-pc-section="title"]`)
      .should('have.class', cardHeaderClass)
      .and('contain.text', title)
  })
  
  it('Adds card-text to the content slot', () => {
    // Arrange
    const content = "Card content"
    const cardHeaderClass = "card-text"

    // Act
    mountCard({ content: content })

    // Arrange
    cy.get(`[data-pc-section="content"]`)
      .should('have.class', cardHeaderClass)
      .and('contain.text', content)
  })
  
  it('Adds mt-3 to the footer slot', () => {
    // Arrange
    const footer = "Card footer"
    const cardHeaderClass = "mt-3"

    // Act
    mountCard({ footer: footer })

    // Arrange
    cy.get(`[data-pc-section="footer"]`)
      .should('have.class', cardHeaderClass)
      .and('contain.text', footer)
  })
})