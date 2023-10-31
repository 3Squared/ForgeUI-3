// @ts-ignore
import ForgeForm, { ForgeFormProps } from "../../../src/components/ForgeForm.vue";

const id = "from"
const titleId = "form-title"
const cancelButtonId = "cancel-btn"
const submitButtonId = "submit-btn"
const errorId = "error"
const loadingSpinnerId = "loading-spinner"

function mountForm(props : ForgeFormProps) {
  cy.mount(ForgeForm, {
    props,
    attrs: {
      id: id
    }
  })
}

describe("<ForgeForm />", () => {
  it("Mounts", () => {
    // Arrange
    const submit = () => {
      window.alert("Submitted!")
    }
    const expectedTitle = "Forge Form Title"
    const expectedSubmitText = "Submit"
    const expectedCancelText = "Cancel"
    
    // Act
    mountForm({ onSubmit: submit })
    
    // Arrange
    cy.get(`#${id}`)
      .should('exist')
      .and('be.visible')
      
    cy.get(`[data-cy="${titleId}"]`)
      .should('exist')
      .and('be.visible')
      .and('contain.text', expectedTitle)
    
    cy.get(`[data-cy="${submitButtonId}"]`)
      .should('exist')
      .and('be.visible')
      .and('contain.text', expectedSubmitText)

    cy.get(`[data-cy="${cancelButtonId}"]`)
      .should('exist')
      .and('be.visible')
      .and('contain.text', expectedCancelText)
  })
  
  it('Displays custom title when passed in as a prop', () => {
    // Arrange
    const submit = () => {
      window.alert("Submitted!")
    }
    const expectedTitle = "Custom Form Title"

    // Act
    mountForm({ onSubmit: submit, title: expectedTitle })

    // Arrange
    cy.get(`[data-cy="${titleId}"]`)
      .should('exist')
      .and('be.visible')
      .and('contain.text', expectedTitle)
  })
  
  it('Displays custom submit button text when passed in as a prop', () => {
    // Arrange
    const submit = () => {
      window.alert("Submitted!")
    }
    const expectedSubmitText = "Custom Submit"

    // Act
    mountForm({ onSubmit: submit, submitText: expectedSubmitText })

    // Arrange
    cy.get(`[data-cy="${submitButtonId}"]`)
      .should('exist')
      .and('be.visible')
      .and('contain.text', expectedSubmitText)
  })

  it('Displays custom cancel button text when passed in as a prop', () => {
    // Arrange
    const submit = () => {
      window.alert("Submitted!")
    }
    const expectedCancelText = "Custom Cancel"

    // Act
    mountForm({ onSubmit: submit, cancelText: expectedCancelText })

    // Arrange
    cy.get(`[data-cy="${cancelButtonId}"]`)
      .should('exist')
      .and('be.visible')
      .and('contain.text', expectedCancelText)
  })
  
  it("Hides the cancel button when hideCancel is set to true", () => {
    // Arrange
    const submit = () => {
      window.alert("Submitted!")
    }

    // Act
    mountForm({ onSubmit: submit, hideCancel: true })

    // Arrange
    cy.get(`[data-cy="${cancelButtonId}"]`)
      .should('not.exist')
  })
  
  it("Hides the title when hideTitle is set to true", () => {
    // Arrange
    const submit = () => {
      window.alert("Submitted!")
    }

    // Act
    mountForm({ onSubmit: submit, hideTitle: true })

    // Arrange
    cy.get(`[data-cy="${titleId}"]`)
      .should('not.exist')
  })
  
  it("Adds class to title when passed through the titleClass prop", () => {
    // Arrange
    const submit = () => {
      window.alert("Submitted!")
    }
    const expectedClass = "text-danger"

    // Act
    mountForm({ onSubmit: submit, titleClass: expectedClass })

    // Arrange
    cy.get(`[data-cy="${titleId}"]`)
      .should('have.class', expectedClass)
  })

  it("Runs function when the submit button is clicked", () => {
    // Arrange
    const expectedAlertMessage = "Submitted!"
    const submit = () => {
      window.alert(expectedAlertMessage)
    }

    // Act
    mountForm({ onSubmit: submit })
    cy.get(`[data-cy="${submitButtonId}"]`).click()

    // Arrange
    cy.on("window:alert", (str) => {
      expect(str).to.equal(expectedAlertMessage)
    })
  })
  
  it("Displays error when function returns an error", () => {
    // Arrange
    const submit = () => {
      throw Error(expectedErrorMessage)
    }
    const expectedErrorMessage = "Oh no! I am an error"
    const expectedClass = "alert alert-danger"

    // Act
    mountForm({ onSubmit: submit })
    cy.get(`[data-cy="${submitButtonId}"]`).click()

    // Arrange
    cy.get(`[data-cy="${errorId}"]`)
      .should('be.visible')
      .and('have.text', expectedErrorMessage)
    
    cy.get(`[data-cy="${errorId}"`).children()
      .should('have.class', expectedClass)
  })
  
  it("Displays loading spinner when function is running", () => {
    // Arrange
    const submit = () => new Promise((resolve) => setTimeout(resolve, 10000))

    // Act
    mountForm({ onSubmit: submit })
    cy.get(`[data-cy="${submitButtonId}"]`).click()

    // Arrange
    cy.get(`[data-cy="${loadingSpinnerId}"]`)
      .should('be.visible')
  })
  
  it("Has outline-secondary class on Cancel button", () => {
    // Arrange
    const submit = () => {
      window.alert("Submitted!")
    }
    const expectedClass = "btn btn-outline-secondary"

    // Act
    mountForm({ onSubmit: submit })

    // Arrange
    cy.get(`[data-cy="${cancelButtonId}"]`)
      .should('have.class', expectedClass)
  })

  it("Has primary class on Submit button", () => {
    // Arrange
    const submit = () => {
      window.alert("Submitted!")
    }
    const expectedClass = "btn btn-primary"

    // Act
    mountForm({ onSubmit: submit })

    // Arrange
    cy.get(`[data-cy="${submitButtonId}"]`)
      .should('have.class', expectedClass)
  })
})