// @ts-ignore
import TooltipWrapper, {TooltipWrapperProps} from "./TooltipWrapper.vue";

const inputId = "input"
function mountTooltip(props : TooltipWrapperProps){
  cy.mount(TooltipWrapper, {
    props,
    attrs: {
      id: inputId
    }
  })
}

describe("<Tooltip />", () => {
  it("Mounts", () => {
    // Act
    mountTooltip({ position: 'right', })
    cy.get(`#${inputId}`).realHover()

    // Assert
    cy.get('[data-pc-name="tooltip"]')
        .should('exist')
        .and('be.visible')
  })
});