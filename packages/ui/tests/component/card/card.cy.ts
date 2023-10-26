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
    
    // Act
    mountCard({ title: title, content: content, footer: footer })
    
    // Arrange
    cy.get(`#${cardId}`)
      .should('exist')
      .and('be.visible')
  })
})