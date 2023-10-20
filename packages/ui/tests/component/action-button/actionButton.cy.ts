// @ts-ignore
import ForgeActionButton, { ForgeActionButtonProps } from "@/components/ForgeActionButton.vue";

function mountActionButton(props : ForgeActionButtonProps) {
  return cy.mount(ForgeActionButton, { 
    props: {
      id: "button",
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
    cy.get("#button").click()
    
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
    cy.get("#button").click()

    // Assert
    cy.on("window:alert", (str) => {
      return expect(str).to.equal(expectedAlertMessage)
    })
  })
  
  it("Displays loading spinner and disable button when performing action", () => {
    // Arrange
    const label = "Button"
    const expectedAlertMessage = "Hello from the parameters of the action button"
    const action = () => new Promise((resolve) => setTimeout(resolve, 10000))

    // Act
    mountActionButton({ label: label, action: action, params: [expectedAlertMessage] })
    cy.get("#button").click()

    // Assert
    cy.get("#button").should('be.disabled').and('be.visible')
    cy.get("#button > svg").should('have.class', "p-icon p-icon-spin").and('be.visible')
  })
  
  
  it("Should re-enable and remove spinner once the action has completed", () => {
    // Arrange
    const label = "Button"
    const expectedAlertMessage = "Hello from the parameters of the action button"
    const delay = 500
    const action = () => new Promise((resolve) => setTimeout(resolve, delay))

    // Act
    mountActionButton({ label: label, action: action, params: [expectedAlertMessage] })
    cy.get("#button").click()
    
    cy.get("#button").should('be.disabled').and('be.visible')
    cy.get("#button > svg").should('have.class', "p-icon p-icon-spin").and('be.visible')
    
    cy.wait(delay)
    
    // Assert
    cy.get("#button").should('not.be.disabled').and('be.visible')
    cy.get("#button > svg").should("not.exist")
  })
})
