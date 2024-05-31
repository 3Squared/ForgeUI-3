// @ts-ignore
import ForgeStatWidget, { ForgeStatWidgetProps } from "@/components/ForgeStatWidget.vue";
import { Size, Severity } from "../../../src/types/forge-types";

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
    const severity = 'primary'
    const content = "Stat"
  
    // Act
    mountStatWidget({ severity: severity }, content)
    
    // Assert
    cy.get(`#${id}`)
      .should('exist')
      .and('be.visible')
  })
  
  describe('Variant', () => {
    ;[
      { title: "Defaults to primary when variant is undefined" },
      { title: "Displays primary stat widget when variant is primary", severity: 'primary' },
      { title: "Displays secondary stat widget when variant is secondary", severity: 'secondary' },
      { title: "Displays brand stat widget when variant is brand", severity: 'brand' },
      { title: "Displays success stat widget when variant is success", severity: 'success' },
      { title: "Displays warning stat widget when variant is warning", severity: 'warning' },
      { title: "Displays danger stat widget when variant is danger", severity: 'danger' },
      { title: "Displays info stat widget when variant is info", severity: 'info' }
    ].forEach(({ title, severity }) => {
      it(title, () => {
        // Arrange 
        const content = "Stat"
        const expectedBackgroundClass = severity === undefined ? 'bg-primary' : `bg-${severity}`

        // Act
        mountStatWidget({ severity: severity as Severity }, content)

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