// @ts-ignore
import OverlayPanelWrapper, { OverlayPanelWrapperProps } from './OverlayPanelWrapper.vue'

const overlayToggleId = "[data-cy='overlay-toggle']"
const overlayId = "[data-cy='overlay']"

function mountOverlayPanel(props : OverlayPanelWrapperProps) {
  cy.mount(OverlayPanelWrapper, {
    props
  })
}

describe("<OverlayPanel />", () => {
  it("Mounts", () => {
    // Arrange
    const content = "Hello"
    
    // Act
    mountOverlayPanel({ overlayPanelContent: content })
    cy.get(overlayToggleId).click()
    
    // Assert
    cy.get(overlayId)
      .should("exist")
      .and("be.visible")
  })
  
  it("Shows close icon when showCloseIcon is true", () => {
    // Arrange
    const content = "Hello"

    // Act
    mountOverlayPanel({ overlayPanelContent: content, showCloseIcon: true })
    cy.get(overlayToggleId).click()

    // Assert
    cy.get(overlayId)
      .should("exist")
      .and("be.visible")
  })
})