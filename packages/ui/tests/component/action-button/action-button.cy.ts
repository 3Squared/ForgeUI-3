// @ts-ignore
import ForgeActionButton, { ForgeActionButtonProps } from "@/components/ForgeActionButton.vue";
import { types } from "sass";
import Error = types.Error;

const buttonId = "button"

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

  it("Performs error action with parameters when function fails", () => {
    // Arrange
    const label = "Button"
    const expectedErrorMessage = "Action has failed."
    const action = () => {
      throw new Error('')
    }
    
    const errorAction = (errorMessage : string) => new Promise(() => window.alert(errorMessage))

    // Act
    mountActionButton({ label: label, action: action, errorAction: errorAction, errorParams: [expectedErrorMessage] })
    cy.get(`#${buttonId}`).click()

    // Assert
    cy.on("window:alert", (str) => {
      return expect(str).to.equal(expectedErrorMessage)
    })
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
