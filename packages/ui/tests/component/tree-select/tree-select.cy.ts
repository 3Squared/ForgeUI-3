import TreeSelect , {TreeSelectProps} from "primevue/treeselect";
import { nodes } from "./exampleTreeNodes.ts";

const optionId = '[data-pc-section="nodecontent"]'

function mountTreeSelect(props : TreeSelectProps) {
  // @ts-ignore
  return cy.mount(TreeSelect, {
    props: {
      ...props,
    }
  })
}
  
describe("<TreeSelect />", () => {
  it('Mounts', () => {
    // Arrange
   
    // Act
    mountTreeSelect({ options: nodes })
    
    // Assert
    cy.get(`[data-pc-name="treeselect"]`).should('be.visible')
  })
  
  it('Sets background to primary when selection mode is multiple', () => {
    
    const selectedClass = 'dropdown-item d-flex text-wrap align-items-center mb-1 cursor-pointer bg-primary-subtle border border-primary rounded-2'
    // Act
    mountTreeSelect({ options: nodes, selectionMode: "multiple" })

    // Assert
    cy.get(`[data-pc-name="treeselect"]`).should('be.visible')
    cy.get(`[data-pc-name="treeselect"]`).click()
    cy.get(optionId).contains("Documents").click()
    cy.get(optionId).contains("Documents").parent().should('have.class', selectedClass)
  })
  
  it('Sets background to primary when selection mode is single', () => {
    
    const selectedClass = 'dropdown-item d-flex text-wrap align-items-center mb-1 cursor-pointer bg-primary-subtle border border-primary rounded-2'
    // Act
    mountTreeSelect({ options: nodes, selectionMode: "single" })

    // Assert
    cy.get(`[data-pc-name="treeselect"]`).should('be.visible')
    cy.get(`[data-pc-name="treeselect"]`).click()
    cy.get(optionId).contains("Documents").click()
    cy.get(`[data-pc-name="treeselect"]`).click()
    cy.get(optionId).contains("Documents").parent().should('have.class', selectedClass)
  })
  
  
  it('Displays placeholder in input', () => {
    // Arrange
    const placeholder = "I am a placeholder"
    
    // Act
    mountTreeSelect({ options: nodes, placeholder })
    
    // Assert
    cy.get(`[data-pc-name="treeselect"]`)
      .should('be.visible')
      .and('contain.text', placeholder)
  })
  
  it('Displays selected option in dropdown', () => {
    // Arrange
    const placeholder = "I am a placeholder"
    const selectedOption = "Documents"

    // Act
    mountTreeSelect({ options: nodes, placeholder: placeholder })

    // Assert
    cy.get(`[data-pc-name="treeselect"]`).should('be.visible')
    cy.get(`[data-pc-name="treeselect"]`).click()
    cy.get(optionId).contains("Documents").click()
    
    cy.get(`[data-pc-name="treeselect"]`)
      .should('be.visible')
      .and('not.contain.text', placeholder)
      .and('contain.text', selectedOption)
  })

  it('Displays clear icon at the end of the dropdown', () => {
    // Arrange

    // Act
    mountTreeSelect({ options: nodes, showClear: true })

    // Assert
    cy.get(`[data-pc-name="treeselect"]`).should('be.visible')
    cy.get(`[data-pc-name="treeselect"]`).click()
    cy.get(optionId).contains("Documents").click()
    
    cy.get(`[data-pc-section="clearicon"]`)
      .and('have.class', 'ms-auto')
  })
  
  it('Displays filter input when filter is true', () => {

    mountTreeSelect({ options: nodes, filter: true })

    // Assert
    cy.get(`[data-pc-name="treeselect"]`).should('be.visible')
    cy.get(`[data-pc-name="treeselect"]`).click()

    cy.get(`[data-pc-name="pcfilterinput"]`)
      .should('exist').and('be.visible')
  })
})