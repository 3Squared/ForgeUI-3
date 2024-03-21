import DialogWrapper from "./DialogWrapper.vue";
// @ts-ignore
import { ForgeModalProps } from "../../../src/components/ForgeModal.vue";

const modalId = "modal"
const dialog = '[data-pc-name="dialog"]'
const maximiseButton = '[data-pc-section="maximizablebutton"]'
const closeButton = '[data-pc-section="closebutton"]'

function mountDialog(props : ForgeModalProps) {
  cy.mount(DialogWrapper, {
    props
  })

  cy.get("#show-modal").click()
}

describe('<Dialog />', () => {
  it('Mounts', () => {
    // Act
    mountDialog({})
    
    // Assert
    cy.get(`#${modalId}`)
      .should('exist')
      .and('be.visible')
  })
  
  it('Greys out background when the modal is open', () => {
    // Arrange
    const expectedBackgroundClass = "modal-open"

    // Act
    mountDialog({})
    
    // Assert
    cy.get(`[data-pc-section="mask"]`)
      .should('be.visible')
      .and('have.class', expectedBackgroundClass)
  })
  
  it("Hides header when showHeader is set to false", () => {
    // Act
    mountDialog({ showHeader: false })

    // Assert
    cy.get(`[data-pc-section="header"]`)
      .should('not.exist')
  })

  it("Displays close icon in the top right corner", () => {
    // Arrange
    const iconClass = "iconify iconify--bi"
    const buttonClass = 'btn'
    const positionClass = 'd-flex ms-auto'
    
    // Act
    mountDialog({ closable: true })

    // Assert
    cy.get(`[data-pc-section="icons"]`)
      .should('have.class', positionClass)

    cy.get(closeButton)
      .should('exist')
      .and('be.visible')
      .and('have.class', buttonClass)
    
    cy.get(`[data-cy="close-icon"]`)
      .should('exist')
      .and('be.visible')
      .and('have.class', iconClass)
  })
  
  it("Displays maximisable icon when maximizable prop is true", () => {
    // Arrange
    const iconClass = "iconify iconify--bi"
    const buttonClass = 'btn'
    const positionClass = 'd-flex ms-auto'
    
    // Act
    mountDialog({ maximizable: true })

    // Assert
    cy.get(`[data-pc-section="icons"]`)
      .should('have.class', positionClass)
    
    cy.get(maximiseButton)
      .should('exist')
      .and('be.visible')
      .and('have.class', buttonClass)
    
    cy.get(`[data-cy="maximisable-icon"]`)
      .should('exist')
      .and('be.visible')
      .and('have.class', iconClass)
  })
  
  it("Should take up the entire screen when maximised", () => {
    // Arrange
    const fullscreenClass = 'mw-100 vh-100 vw-100 top-0 start-0'
    
    // Act
    mountDialog({ maximizable: true })
    
    cy.get(maximiseButton).click()
    
    // Assert
    cy.get(dialog)
      .should('exist')
      .and('be.visible')
      .and('have.class', fullscreenClass)
  })
  
  it('Displays custom title which is passed in via props', () => {
    // Arrange
    const expectedTitle = "Custom Title"

    // Act
    mountDialog({ header: expectedTitle })

    // Assert
    cy.get(`[data-pc-section="title"]`)
      .and('have.text', expectedTitle)
  })
  
  it("Runs the onConfirm function on click of the submit button", () => {
    // Arrange
    const alertMessage = "I am an Alert!"
    const onConfirm = () => { window.alert(alertMessage)}

    // Act
    mountDialog({ onConfirm: onConfirm })
    cy.get(`[data-cy="submit-button"]`).click()

    // Assert
    cy.on("window:alert", (str) => {
      return expect(str).to.equal(alertMessage)
    })
  })

  it("Displays an error alert if onConfirm throws an error", () => {
    // Arrange
    const errorMessage = "I am an Error!"
    const onConfirm = () => {
      throw Error(errorMessage)
    }

    // Act
    mountDialog({ onConfirm: onConfirm })
    cy.get(`[data-cy="submit-button"]`).click()

    // Assert
    cy.get(`[data-cy="error"]`)
      .should('exist')
      .and('be.visible')
      .and('contain.text', errorMessage)
  })

  it("Shows loading spinner whilst waiting for the function to complete", () => {
    // Arrange
    const onConfirm = () => new Promise((resolve) => setTimeout(resolve, 10000))

    // Act
    mountDialog({ onConfirm: onConfirm })
    cy.get(`[data-cy="submit-button"]`).click()

    // Assert
    cy.get(`[data-cy="loader"]`)
      .should('exist')
      .and('be.visible')
  })

  it("Closes modal on click of the cancel button", () => {
    // Arrange
    const onConfirm = () => {
      window.alert("I am an Alert!")
    }

    // Act
    mountDialog({ onConfirm: onConfirm })
    cy.get(`[data-cy="cancel-button"]`).click()

    // Assert
    cy.get(`#${modalId}`)
      .should('not.exist')
  })

  it("Updates cancel button text when passed in as a prop", () => {
    // Arrange
    const cancelButtonText = "Custom Cancel"
    const onConfirm = () => {
      window.alert("I am an Alert!")
    }

    // Act
    mountDialog({ onConfirm: onConfirm, cancelText: cancelButtonText })
    
    // Assert
    cy.get(`[data-cy="cancel-button"]`)
      .should('contain.text', cancelButtonText)
  })

  it("Updates cancel button text when passed in as a prop", () => {
    // Arrange
    const submitButtonText = "Custom Submit"
    const onConfirm = () => {
      window.alert("I am an Alert!")
    }

    // Act
    mountDialog({ onConfirm: onConfirm, submitText: submitButtonText })

    // Assert
    cy.get(`[data-cy="submit-button"]`)
      .should('contain.text', submitButtonText)
  })
  
  it('Hides footer when showFooter is false', () => {
    // Arrange
    const onConfirm = () => {
      window.alert("I am an Alert!")
    }

    // Act
    mountDialog({ onConfirm: onConfirm, showFooter: false })

    // Assert
    cy.get(`[data-cy="footer"]`)
      .should('not.exist')
  })
})