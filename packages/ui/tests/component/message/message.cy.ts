import { MessageProps } from "primevue/message";
import { ForgeAlert } from "../../../index";

function mountMessage(props : MessageProps, content : string) {
  cy.mount(ForgeAlert, {
    props,
    slots: {
      default: content
    }
  })
}

describe('<ForgeAlert />', () => {
  it("Mounts", () => {
    // Arrange
    const content = "I am a message"
    const severity = 'primary'
    
    // Act
    mountMessage({ severity: severity }, content)

    // Assert
    cy.get(`[data-pc-name="message"]`)
      .should('be.visible')
      .and('contain.text', content)
  })
  
  it('Closes alert on click of the close icon', () => {
    // Arrange
    const content = "I am a message"

    // Act
    mountMessage({ closable: true }, content)

    // Assert
    cy.get(`[data-pc-section="closebutton"]`).should('be.visible')
    
    cy.get(`[data-pc-section="closebutton"]`).click()
    cy.get(`[data-pc-name="message"]`).should('not.be.visible')
  })
  
  it('Shows icon and be in the colour of the specified severity', () => {
    // Arrange
    const content = "I am a message"
    const severity = "danger"
    const icon = "bi:emoji-smile-fill"

    // Act
    mountMessage({ closable: true, icon: icon, severity: severity }, content)

    // Assert
    cy.get(`[data-cy="message-icon"]`)
      .should('be.visible')
      .and('have.class', `text-${severity}`)
  })
  
  it('Should disappear after the time limit when sticky is false', () => {
    // Arrange
    const content = "I am a message"
    const lifetime = 1000

    // Act
    mountMessage({ life: lifetime, sticky: false }, content)

    // Assert
    cy.get(`[data-pc-name="message"]`)
      .should('be.visible')
      .and('contain.text', content)
    
    cy.wait(lifetime)

    cy.get(`[data-pc-name="message"]`)
      .should('not.be.visible')
  })
})