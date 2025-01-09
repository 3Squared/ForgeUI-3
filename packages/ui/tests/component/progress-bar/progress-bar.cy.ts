// @ts-ignore
import ForgeProgressBar, { ForgeProgressBarProps } from "@/components/ForgeProgressBar.vue";

function mountForgeProgressBar(props : ForgeProgressBarProps) {
  cy.mount(ForgeProgressBar, {
    props
  })
}

describe("<ForgeProgressBar />", () => {
  it("Mounts", () => {
    // Arrange
    const value = 10
    
    // Act
    mountForgeProgressBar({ value: value })
    
    // Assert
    cy.get('[data-pc-name="progressbar"]')
      .should('exist')
  })
  
  it("Displays value when showValue is true", () => {
    // Arrange
    const value = 10
    const showValue = true

    // Act
    mountForgeProgressBar({ value: value, showValue: showValue })

    // Assert
    cy.get('[data-pc-section="value"]')
      .should('contain.text', value)
  })
  
  it("Adds a striped bar when striped is true", () => {
    // Arrange
    const striped = true
    const expectedClass = 'progress-bar-striped'
    const value = 10
    
    // Act
    mountForgeProgressBar({ striped: striped, value: value })

    // Assert
    cy.get(`[data-pc-section="value"]`)
      .should('have.class', expectedClass)
  })
  
  it("Animates striped bar when animate and striped are true", () => {
    // Arrange
    const striped = true
    const animate = true
    const expectedClass = 'progress-bar-striped progress-bar-animated'
    const value = 10

    // Act
    mountForgeProgressBar({ striped: striped, animate: animate, value: value })

    // Assert
    cy.get(`[data-pc-section="value"]`)
      .should('have.class', expectedClass)
  })
  
  describe("Variant", () => {
    ;[
      { title: 'Defaults to primary when severity isnt defined', severity: undefined },
      { title: 'Displays primary background when severity is primary', severity: 'primary' },
      { title: 'Displays brand background when severity is brand', severity: 'brand' },
      { title: 'Displays secondary background when severity is secondary', severity: 'secondary' },
      { title: 'Displays success background when severity is success', severity: 'success' },
      { title: 'Displays warning background when severity is warning', severity: 'warning' },
      { title: 'Displays danger background when severity is danger', severity: 'danger' },
      { title: 'Displays info background when severity is info', severity: 'info' },
    ].forEach(({ title, severity }) => {
      it(title, () => {
        // Arrange
        const value = 10
        const expectedClass = severity !== undefined ? `bg-${severity}` : 'bg-primary'

        // Act
        mountForgeProgressBar({ value: value, severity: severity })

        // Assert
        cy.get(`[data-pc-section="value"]`)
          .should('have.class', expectedClass)
      })
    })
  })

})