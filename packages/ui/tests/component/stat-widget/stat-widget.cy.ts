// @ts-ignore
import ForgeStatWidget, { ForgeStatWidgetProps } from "@/components/ForgeStatWidget.vue";
import { Size, Variant } from "../../../src/types/forge-types";

const id = "stat-widget"
function mountStatWidget(props : ForgeStatWidgetProps, content : string) {
  cy.mount(ForgeStatWidget, {
    props,
    attrs: {
      id: 'stat-widget'
    },
    slots: {
      default: content
    }
  })
}

describe('<ForgeStatWidget />', () => {
  it('Mounts', () => {
    // Arrange
    const variant = 'primary'
    const content = "Stat"
  
    // Act
    mountStatWidget({ variant: variant }, content)
    
    // Assert
    cy.get(`#${id}`)
      .should('exist')
      .and('be.visible')
  })
  
  describe('Variant', () => {
    ;[
      { title: "Defaults to primary when variant is undefined" },
      { title: "Displays primary stat widget when variant is primary", variant: 'primary' },
      { title: "Displays secondary stat widget when variant is secondary", variant: 'secondary' },
      { title: "Displays success stat widget when variant is success", variant: 'success' },
      { title: "Displays warning stat widget when variant is warning", variant: 'warning' },
      { title: "Displays danger stat widget when variant is danger", variant: 'danger' },
      { title: "Displays info stat widget when variant is info", variant: 'info' }
    ].forEach(({ title, variant }) => {
      it(title, () => {
        // Arrange 
        const content = "Stat"
        const expectedBackgroundClass = variant === undefined ? 'bg-primary' : `bg-${variant}`

        // Act
        mountStatWidget({ variant: variant as Variant }, content)

        // Assert
        cy.get(`#${id}`)
          .should('exist')
          .and('be.visible')
          .and('have.class', expectedBackgroundClass)
      })
    })
  })
  
  describe('Size', () => {
    ;[
      { title: "Defaults to medium when size is undefined" },
      { title: "Displays small stat widget when size is sm", size: 'sm' },
      { title: "Displays medium stat widget when size is md", size: 'md' },
      { title: "Displays large stat widget when size is lg", size: 'lg' }
    ].forEach(({ title, size }) => {
      it(title, () => {
        // Arrange 
        const content = "Stat"
        const expectedSizeClass = size === undefined ? 'widget--md' : `widget--${size}`

        // Act
        mountStatWidget({ size: size as Size }, content)

        // Assert
        cy.get(`#${id}`)
          .should('exist')
          .and('be.visible')
          .and('have.class', expectedSizeClass)
      })
    })
  })

})