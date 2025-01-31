import Tree , {TreeProps} from "primevue/tree";
import { nodes } from "../tree-select/exampleTreeNodes.ts";

const optionId = '[data-pc-section="node"]'

function mountTree(props : TreeProps) {
  // @ts-ignore
  return cy.mount(Tree, {
    props: {
      ...props,
    }
  })
}
  
describe("<Tree />", () => {
  it('Mounts', () => {
    // Arrange
   
    // Act
    mountTree({ value: nodes, })
    
    // Assert
    cy.get(`[data-pc-name="tree"]`).should('be.visible')
  })
  
  it('Displays filter input when filter is true', () => {
    mountTree({ value: nodes, filter: true })

    // Assert
    cy.get(`[data-pc-name="tree"]`).should('be.visible')
    cy.get(`[data-pc-name="tree"]`).click()

    cy.get(`[data-pc-name="pcfilterinput"]`)
      .should('exist').and('be.visible')
  })
})