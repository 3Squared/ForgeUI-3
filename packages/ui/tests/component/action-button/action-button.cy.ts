// @ts-ignore
import ForgeActionButton, { ForgeActionButtonProps } from "@/components/ForgeActionButton.vue";

const buttonId = "button"
const toastId = '[data-pc-name="toast"]'

function mountActionButton(props : ForgeActionButtonProps) {
  return cy.mount(ForgeActionButton, { 
    props: {
      id: buttonId,
      ...props
    }
  })
}

describe('<ForgeActionButton />', () => {
  it("Performs action on click of the button", () => {
    // Arrange
    const label = "Button"
    const expectedAlertMessage = "Hello from the action button"
    const action = () => new Promise(() => window.alert(expectedAlertMessage))
    
    // Act
    mountActionButton({ label: label, action: action})
    cy.get(`#${buttonId}`).click()
    
    // Assert
    cy.on("window:alert", (str) => {
      expect(str).to.equal(expectedAlertMessage) 
    })
  })

  it("Performs action with parameters on click of the button", () => {
    // Arrange
    const label = "Button"
    const expectedAlertMessage = "Hello from the parameters of the action button"
    const action = (alertMessage : string) => new Promise(() => window.alert(alertMessage))

    // Act
    mountActionButton({ label: label, action: action, params: [expectedAlertMessage] })
    cy.get(`#${buttonId}`).click()

    // Assert
    cy.on("window:alert", (str) => {
      return expect(str).to.equal(expectedAlertMessage)
    })
  })

  it("Displays toast with a error message on error", () => {
    // Arrange
    const label = "Button"
    const expectedErrorMessage = "Action has failed."
    const action = () => {
      throw Error()
    }

    // Act
    mountActionButton({ label: label, action: action, errorMessage: expectedErrorMessage })
    cy.get(`#${buttonId}`).click()

    // Assert
    cy.get(toastId)
      .should('be.visible')
      .and('contain.text', expectedErrorMessage)
  })
  
  it("Displays toast with a custom error message on error if specified", () => {
    // Arrange
    const label = "Button"
    const expectedErrorMessage = "Hello from the action button"
    const action = () => { throw Error(expectedErrorMessage) }

    // Act
    mountActionButton({ label: label, action: action, errorMessage: expectedErrorMessage })
    cy.get(`#${buttonId}`).click()

    // Assert
    cy.get(toastId)
      .should('be.visible')
      .and('contain.text', expectedErrorMessage)
  })
  
  it("Displays loading spinner and disable button when performing action", () => {
    // Arrange
    const label = "Button"
    const expectedAlertMessage = "Hello from the parameters of the action button"
    const expectedLoadingIconClasses = "spinner-border spinner-border-sm border-0 me-2"
    const action = () => new Promise((resolve) => setTimeout(resolve, 10000))

    // Act
    mountActionButton({ label: label, action: action, params: [expectedAlertMessage] })
    cy.get(`#${buttonId}`).click()

    // Assert
    cy.get(`#${buttonId}`).should('be.disabled').and('be.visible')
    cy.get(`[data-pc-section="loadingicon"]`).should('have.class', expectedLoadingIconClasses).and('be.visible')
  })
  
  
  it("Should re-enable and remove spinner once the action has completed", () => {
    // Arrange
    const label = "Button"
    const expectedAlertMessage = "Hello from the parameters of the action button"
    const expectedLoadingIconClasses = "spinner-border spinner-border-sm border-0 me-2"

    const delay = 500
    const action = () => new Promise((resolve) => setTimeout(resolve, delay))

    // Act
    mountActionButton({ label: label, action: action, params: [expectedAlertMessage] })
    cy.get(`#${buttonId}`).click()
    
    cy.get(`#${buttonId}`).should('be.disabled').and('be.visible')
    cy.get(`[data-pc-section="loadingicon"]`).should('have.class', expectedLoadingIconClasses).and('be.visible')
    
    cy.wait(delay)
    
    // Assert
    cy.get(`#${buttonId}`).should('not.be.disabled').and('be.visible')
    cy.get(`[data-pc-section="loadingicon"]`).should("not.exist")
  })
})
