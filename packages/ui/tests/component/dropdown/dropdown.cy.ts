import Select, {SelectProps} from "primevue/select";
import { ref } from "vue";
import DropdownWrapper from "./dropdownWrapper.vue";

const controlId = "dropdown"
function mountSelect(props : SelectProps) {
  // @ts-ignore
  return cy.mount(Select, {
    props: {
      id: controlId,
      ...props,
    }
  })
}

function mountWrapperSelect(props: SelectProps) {
  // @ts-ignore
  return cy.mount(DropdownWrapper, {
    props: {
      id: controlId,
      ...props,
    }
  })
}
  
describe("<Select />", () => {
  it('Mounts', () => {
    // Arrange
    const options = [
          'Option 1',
          'Option 2',
          'Option 3'
    ]
    
    // Act
    mountWrapperSelect({ options: options })
    
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
    mountSelect({ options: options, modelValue: ref(options[0]).value })
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
    const hoverColour = 'rgb(248, 249, 250)'

    // Act
    mountSelect({ options: options })
    cy.get(`#${controlId}`).click()
    cy.get('#dropdown_0').realHover()

    // Assert
    cy.get('#dropdown_0')
      .should('be.visible')
      .and('have.css', 'background-color', hoverColour)
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
    mountSelect({ options: options, placeholder: placeholder })
    
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
    mountSelect({ options: options, placeholder: placeholder, modelValue: ref(selectedOption).value })

    // Assert
    cy.get(`#${controlId}`)
      .should('be.visible')
      .and('not.contain.text', placeholder)
      .and('contain.text', selectedOption)
  })

  it('Displays clear icon at the end of the dropdown', () => {
    // Arrange
    const options = [
      'Option 1',
      'Option 2',
      'Option 3'
    ]

    // Act
    mountSelect({ options: options, showClear: true, modelValue: ref(options[0]).value })

    // Assert
    cy.get(`[data-pc-section="clearicon"]`)
      .and('have.class', 'ms-auto')
    
  })

  it('Displays loading spinner when loading is true', () => {
    // Arrange
    const options = [
      'Option 1',
      'Option 2',
      'Option 3'
    ]
    const expectedClass = "spinner-border spinner-border-sm border-0"

    // Act
    mountSelect({ options: options, loading: true })

    // Assert
    cy.get(`[data-pc-section="loadingicon"]`)
      .should('have.class', expectedClass)
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
    mountSelect({ options: options, optionGroupLabel: 'label', optionGroupChildren: "items" })
    cy.get(`#${controlId}`).click()

    // Assert
    cy.get('[data-pc-section="optiongrouplabel"]')
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
    mountSelect({ options: options, filter: true })
    cy.get(`#${controlId}`).click()

    // Assert
    cy.get(`[data-pc-name="pcfilter"]`)
      .should('be.visible')
      .and('have.class', formControlClass)
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
    mountSelect({ options: options, disabled: true })

    // Assert
    cy.get(`#${controlId}`)
      .should('be.visible')
      .and('have.class', disabledClass)

    cy.get(`#${controlId}`).click()
    cy.get('[data-pc-section="list"]')
      .should('not.exist')
  })
})