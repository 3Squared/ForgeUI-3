import Dropdown, { DropdownProps } from "primevue/dropdown";
import { ref } from "vue";
import DropdownWrapper from "./dropdownWrapper.vue";

const controlId = "dropdown"
function mountDropdown(props : DropdownProps) {
  // @ts-ignore
  return cy.mount(Dropdown, {
    props: {
      id: controlId,
      ...props,
    }
  })
}

function mountWrapperDropdown(props: DropdownProps) {
  // @ts-ignore
  return cy.mount(DropdownWrapper, {
    props: {
      id: controlId,
      ...props,
    }
  })
}
  
describe("<Dropdown />", () => {
  it('Mounts', () => {
    // Arrange
    const options = [
          'Option 1',
          'Option 2',
          'Option 3'
    ]
    
    // Act
    mountWrapperDropdown({ options: options })
    
    // Assert
    cy.get(`#${controlId}`).should('be.visible')
  })
  
  it('Sets background to primary and text to white when option is selected', () => {
    // Arrange
    const options = [
      'Option 1',
      'Option 2',
      'Option 3'
    ]

    // Act
    mountDropdown({ options: options, modelValue: ref(options[0]).value })
    cy.get(`#${controlId}`).click()

    // Assert
    cy.get(`#${controlId}`)
      .should('be.visible')
      .and('contain.text', options[0])

    cy.get('#dropdown_0')
      .should('be.visible')
      .and('have.class', "bg-primary")
      .and('have.class', "text-white")
  })
  
  it('Highlights background on hover of option', () => {
    // Arrange
    const options = [
      'Option 1',
      'Option 2',
      'Option 3'
    ]
    const primarySubtle = 'rgb(229, 240, 247)'

    // Act
    mountDropdown({ options: options })
    cy.get(`#${controlId}`).click()
    cy.get('#dropdown_0').realHover()

    // Assert
    cy.get('#dropdown_0')
      .should('be.visible')
      .and('have.css', 'background-color', primarySubtle)
  })
  
  it('Displays placeholder in dropdown', () => {
    // Arrange
    const options = [
      'Option 1',
      'Option 2',
      'Option 3'
    ]
    const placeholder = "I am a placeholder"

    // Act
    mountDropdown({ options: options, placeholder: placeholder })
    
    // Assert
    cy.get(`#${controlId}`)
      .should('be.visible')
      .and('contain.text', placeholder)
  })
  
  it('Displays selected option in dropdown', () => {
    // Arrange
    const options = [
      'Option 1',
      'Option 2',
      'Option 3'
    ]
    const placeholder = "I am a placeholder"
    const selectedOption = options[0]

    // Act
    mountDropdown({ options: options, placeholder: placeholder, modelValue: ref(selectedOption).value })

    // Assert
    cy.get(`#${controlId}`)
      .should('be.visible')
      .and('not.contain.text', placeholder)
      .and('contain.text', selectedOption)
  })

  it('Displays clear and dropdown icon at the end of the dropdown', () => {
    // Arrange
    const options = [
      'Option 1',
      'Option 2',
      'Option 3'
    ]

    // Act
    mountDropdown({ options: options, showClear: true, modelValue: ref(options[0]).value })

    // Assert
    cy.get(`[data-pc-section="clearicon"]`)
      .and('have.class', 'ms-auto')

    cy.get(`[data-pc-section="dropdownicon"]`)
      .should('be.visible')
      .and('not.have.class', 'ms-auto')
  })

  it('Displays loading spinner when loading is true', () => {
    // Arrange
    const options = [
      'Option 1',
      'Option 2',
      'Option 3'
    ]

    // Act
    mountDropdown({ options: options, loading: true })

    // Assert
    cy.get(`[data-pc-section="loadingicon"]`)
      .should('have.class', 'spinner-border spinner-border-sm')
  })
  
  it('Displays group header in bold', () => {
    // Arrange
    const groupHeader = "Group Header"
    const boldClass = "fw-bold"
    const options = [
      { 
        label: groupHeader,
        items: [
          'Option 1',
          'Option 2',
          'Option 3'
        ]
      }
    ]

    // Act
    mountDropdown({ options: options, optionGroupLabel: 'label', optionGroupChildren: "items" })
    cy.get(`#${controlId}`).click()

    // Assert
    cy.get('[data-pc-section="itemgroup"]')
      .should('be.visible')
      .and('contain.text', groupHeader)
      .and('have.class', boldClass)
  })
  
  it('Displays filter input when filter is true', () => {
    // Arrange
    const formControlClass = "form-control"
    const options = [
      'Option 1',
      'Option 2',
      'Option 3'
    ]

    // Act
    mountDropdown({ options: options, filter: true })
    cy.get(`#${controlId}`).click()

    // Assert
    cy.get(`[data-pc-section="filterinput"]`)
      .should('be.visible')
      .and('have.class', formControlClass)
    
    cy.get(`[data-pc-section="filtericon"]`)
      .should('be.visible')
  })
  
  it('Displays as disabled and is unclickable when disabled is true', () => {
    // Arrange
    const disabledClass = "disabled"
    const options = [
      'Option 1',
      'Option 2',
      'Option 3'
    ]

    // Act
    mountDropdown({ options: options, disabled: true })

    // Assert
    cy.get(`#${controlId}`)
      .should('be.visible')
      .and('have.class', disabledClass)

    cy.get(`#${controlId}`).click()
    cy.get('[data-pc-section="list"]')
      .should('not.exist')
  })
})