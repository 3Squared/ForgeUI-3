// @ts-ignore
import TabWrapper, { TabWrapperProps } from "./TabWrapper.vue";
const id = "tabs";

function mountTab(props : TabWrapperProps) {
  cy.mount(TabWrapper, {
    props,
    attrs: {
      id: id
    }
  })
}

describe('<Tab />', () => {
  it("Mounts", () => {
    // Arrange
    // Act
    mountTab({ })
  
    // Assert
    cy.get(`#${id}`)
      .should('exist')
      .and('be.visible')
  })
  
  //Add back in when next prime vue release goes out - currently there is a problem with the inkbar
  // it("Applies active tab to panel which is open", () => {
  //   // Arrange
  //   const expectedActiveClass = "active"
  //   // Act
  //   mountTab({ })
  //  
  //   // Assert
  //   cy.get(`[data-pc-name="tab"]`).contains('Header I').should('have.class', expectedActiveClass)
  //   cy.get(`[data-pc-name="tab"]`).contains('Header II').should('not.have.class', expectedActiveClass)
  //
  //   cy.get(`[data-pc-name="tab"]`).contains('Header II').click()
  //
  //   cy.get(`[data-pc-name="tab"]`).contains('Header I').should('not.have.class', expectedActiveClass)
  //   cy.get(`[data-pc-name="tab"]`).contains('Header II').should('have.class', expectedActiveClass)
  // })
  //
  // it("Disables tab panel when disabled is true", () => {
  //   // Arrange
  //   // Act
  //   mountTab({ disabled: true })
  //
  //   // Assert
  //   cy.get(`[data-pc-name="tab"]`).contains('Header II').should('be.disabled')
  // })
})