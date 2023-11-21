// @ts-ignore
import TooltipWrapper, { Position, TooltipWrapperProps } from "./TooltipWrapper.vue";

const inputId = "input"
const tooltipId = '[data-pc-name="tooltip"]'
function mountTooltip(props : TooltipWrapperProps){
  cy.mount(TooltipWrapper, {
    props: {
      ...props, 
      id: inputId
    },
  })
}

describe("<Tooltip />", () => {
  it("Mounts", () => {
    // Act
    mountTooltip({ position: 'right' as Position })
    cy.get(`#${inputId}`).focus()

    // Assert
    cy.get(tooltipId)
        .should('exist')
        .and('be.visible')
  })
  
  ;[{ title: 'Displays the tooltip on the right when direction is undefined.', position: undefined },
    { title: 'Displays the tooltip on the right when the direction is right', position: 'right' },
    { title: 'Displays the tooltip on the left when the direction is left', position: 'left' },
    { title: 'Displays the tooltip on top when the direction is top', position: 'top' },
    { title: 'Displays the tooltip on the bottom when the direction is bottom', position: 'bottom' }
  ].forEach(({ title, position}) => {
    
    function getPositionClass(position : string | undefined) {
      switch (position) {
        case undefined:
        case 'right':
          return 'bs-tooltip-end'
        case 'left':
          return 'bs-tooltip-start'
        case 'top':
          return 'bs-tooltip-top'
        case 'bottom': 
          return 'bs-tooltip-bottom'
      }
    }
    
    it(title, () => {
      // Arrange
      const expectedClass = getPositionClass(position)
      
      // Act
      mountTooltip({ position: position as Position })
      cy.get(`#${inputId}`).focus()

      // Assert
      cy.get(tooltipId)
        .should('have.class', expectedClass)
    })
  })
});