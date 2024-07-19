// @ts-ignore
import ForgeFormField, { ForgeFormFieldProps } from "../../../src/components/ForgeFormField.vue";

function mountFormField(props : ForgeFormFieldProps) {
  cy.mount(ForgeFormField, {
    props
  })
}

// TODO: Rewrite tests to check validation is met.
describe.skip('<ForgeFormField />', () => {
  it('Mounts', () => {
    // Arrange
    const name = "input"
    const label = "A custom input"
    
    // Act
    mountFormField({ name: name, label: label })
    
    // Assert
    cy.get(`#${name}`)
      .should('exist')
      .and('be.visible')
  })
  
  describe('Number', () => {      
    // Arrange
    const name = "input"
    const type = "number"
    const label = "A custom input"
    
    it("Displays error alert when validation isnt met", () => {
      // Arrange
      const errorMessage = "Must be less than 1"
      const value = '2'
      const invalid = "is-invalid"
      
      // Act
      mountFormField({ name: name, type: type, label: label })
      cy.get(`#${name}`).type(value)
      cy.get(`#${name} input`).blur()

      // Assert
      cy.get(`#${name} input`)
        .should('contain.value', value)
        .and('have.class', invalid)
      
      cy.get("[data-cy='error']")
        .should('have.text', errorMessage)
    })
  })
  
  describe('Text', () => {
    // Arrange
    const name = "input"
    const type = "text"
    const label = "A custom input"
    
    it("Allows for alphanumeric characters to be inputted when type is text", () => {
      // Arrange
      const expectedString = "Hello123"

      // Act
      mountFormField({ name: name, type: type, label: label })
      cy.get(`#${name}`).type(expectedString)

      // Assert
      cy.get(`#${name}`).should('contain.value', expectedString)
    })

    it("Displays error alert when validation isnt met", () => {
      // Arrange
      const errorMessage = "Length must be greater than 10 characters"
      const value = 'I am longer than 10 characters'
      const invalid = "is-invalid"

      // Act
      mountFormField({ name: name, type: type, label: label })
      cy.get(`#${name}`).type(value)

      // Assert
      cy.get(`#${name}`)
        .should('contain.value', value)
        .and('have.class', invalid)
      
      cy.get('[data-cy="error"]')
        .should('have.text', errorMessage)
    })
  })
  
  describe('Text Area', () => {
    // Arrange
    const name = "input"
    const type = "textarea"
    const label = "A custom input"
    
    it("Displays text area when type is text area", () => {
      // Arrange
      const expectedString = "Hello123"

      // Act
      mountFormField({ name: name, type: type, label: label })
      cy.get(`#${name}`).type(expectedString)

      // Assert
      cy.get(type)
        .should('exist')
        .and('be.visible')
        .and('contain.value', expectedString)
    })

    it("Displays error alert when validation isnt met", () => {
      // Arrange
      const errorMessage = "Length must be greater than 10 characters"
      const value = 'I am longer than 10 characters'
      const invalid = "is-invalid"

      // Act
      mountFormField({ name: name, label: label, type: type})
      cy.get(`#${name}`).type(value)

      // Assert
      cy.get(`#${name}`)
        .should('contain.value', value)
        .and('have.class', invalid)

      cy.get('[data-cy="error"]')
        .should('have.text', errorMessage)
    })
  })
  
  describe('Mask', () => {
    const name = "input"
    const type = "mask"
    const label = "A custom input"
    const mask = "99-999999"

    it("Displays error alert when validation isnt met", () => {
      // Arrange
      const errorMessage = "Length must be greater than 5 characters"
      const value = 'I am longer than 10 characters'
      const invalid = "is-invalid"

      // Act
      mountFormField({ name: name, label: label, type: type,  mask: mask })
      cy.get(`#${name}`).type(value)

      // Assert
      cy.get(`#${name}`)
        .and('have.class', invalid)

      cy.get('[data-cy="error"]')
        .should('have.text', errorMessage)
    })
  })
  
  describe('Checkbox', () => {
    // Arrange
    const type = "checkbox"
    const label = "A custom input"
    const name = "input"
    
    it("Displays checkbox when type is checkbox", () => {
      // Act
      mountFormField({ name: name, type: type, label: label })

      // Assert
      cy.get(`[data-cy="checkbox-container"]`)
        .should('exist')
        .and('be.visible')
    })

    it("Displays error alert when validation isnt met", () => {
      // Arrange
      const errorMessage = "This is required"
      const invalid = "is-invalid"

      // Act
      mountFormField({ name: name, type: type, label: label })
      cy.get(`#${name} label`).dblclick()

      // Assert
      cy.get(`[data-pc-section="input"]`)
        .and('have.class', invalid)

      cy.get('[data-cy="error"]')
        .should('have.text', errorMessage)
    })
  })
})