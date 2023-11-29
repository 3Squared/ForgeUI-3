// @ts-ignore
import TabViewWrapper, { TabViewWrapperProps } from "./TabViewWrapper.vue";

const id = "tabs"
const firstTabHeaderId = "tabs_0_header_action"
const secondTabHeaderId = "tabs_1_header_action"

function mountTabView(props : TabViewWrapperProps) {
  cy.mount(TabViewWrapper, {
    props,
    attrs: {
      id: id
    }
  })
}

describe('<TabView />', () => {
  it("Mounts", () => {
    // Arrange
    const tabs = Array.from({ length: 3 }, (_, i) => ({ title: `Tab ${i + 1}`, content: `Content for Tab ${i + 1}` }))
    
    // Act
    mountTabView({ tabs: tabs })
  
    // Assert
    cy.get(`#${id}`)
      .should('exist')
      .and('be.visible')
  })
  
  it("Applies active tab to panel which is open", () => {
    // Arrange
    const expectedActiveClass = "active"
    const tabs = Array.from({ length: 3 }, (_, i) => ({ title: `Tab ${i + 1}`, content: `Content for Tab ${i + 1}`}))
    
    // Act
    mountTabView({ tabs: tabs })
    
    // Assert
    cy.get(`#${firstTabHeaderId}`).should('have.class', expectedActiveClass)
    cy.get(`#${secondTabHeaderId}`).should('not.have.class', expectedActiveClass)

    cy.get(`#${secondTabHeaderId}`).click()

    cy.get(`#${firstTabHeaderId}`).should('not.have.class', expectedActiveClass)
    cy.get(`#${secondTabHeaderId}`).should('have.class', expectedActiveClass)
  })
  
  it("Displays arrows which allow the user to scroll between tabs when scrollable is true and tabs go into overflow", () => {
    // Arrange
    const tabs = Array.from({ length: 50 }, (_, i) => ({ title: `Tab ${i + 1}`, content: `Content for Tab ${i + 1}` }))

    // Act
    mountTabView({ tabs: tabs, tabViewProps: { scrollable: true } })

    // Act/Assert
    cy.get(`[data-pc-section="nextbutton"]`)
      .should('exist')
      .and('be.visible')

    cy.get(`[data-pc-section="nextbutton"]`).click()
    
    cy.get(`[data-pc-section="previousicon"]`)
      .should('exist')
      .and('be.visible')

    cy.get(`[data-pc-section="nextbutton"]`).click()
    
    cy.get(`[data-pc-section="previousicon"]`)
      .should('exist')
      .and('be.visible')
  })
  
  it("Disables tab panel when disabled is true", () => {
    // Arrange
    const expectedDisabledClass = "disabled"
    const tabs = Array.from({ length: 3 }, (_, i) => ({ title: `Tab ${i + 1}`, content: `Content for Tab ${i + 1}` }))
    
    // Act
    mountTabView({ tabPanelProps: { disabled: true }, tabViewProps: { activeIndex: 1 }, tabs: tabs})
  
    // Assert
    cy.get(`#${firstTabHeaderId}`).should('have.class', expectedDisabledClass)
  })
})