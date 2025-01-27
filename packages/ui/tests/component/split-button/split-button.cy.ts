import SplitButton, { SplitButtonProps } from "primevue/splitbutton";

function mountSplitButton(props: SplitButtonProps) {
  // @ts-ignore
  cy.mount(SplitButton,
    {
      props
    })
}

describe('<SplitButton />', () => {
  it('Mounts', () => {
    // Arrange
    const id = '[data-pc-name="splitbutton"]'
    const label = "Button"

    // Act
    mountSplitButton({ label: label })

    // Assert
    cy.get(id).should('be.visible').and('contain.text', label)
  })

  describe('Variants', () => {
    ;[{ severity: undefined, rgb: 'rgb(0, 119, 200)' }, { severity: "primary", rgb: 'rgb(0, 119, 200)' },
      { severity: "secondary", rgb: 'rgb(95, 95, 95)' }, { severity: "success", rgb: 'rgb(33, 170, 100)' },
      { severity: "info", rgb: 'rgb(13, 202, 240)' }, { severity: "warning", rgb: 'rgb(255, 174, 0)' },
      { severity: "danger", rgb: 'rgb(247, 35, 35)' }, { severity: "brand", rgb: 'rgb(102, 16, 242)' },
    ].forEach(({ severity, rgb }) => {

      describe(severity !== undefined ? severity : 'not specified', () => {
        it(`Applies ${severity !== undefined ? severity : 'primary'} button classes when severity is ${severity}`, () => {
          // Arrange
          const label = "Button"
          const expectedClass = severity !== undefined ? `btn btn-${severity}` : 'btn btn-primary'

          // Act
          mountSplitButton({ label: label, severity: severity })

          // Assert
          cy.get(`[data-pc-name="pcbutton"]`).should('have.class', expectedClass)
        })

        it(`Applies ${severity !== undefined ? severity : 'primary'} outline button classes when severity is ${severity} and outline is true`, () => {
          // Arrange
          const label = "Button"
          const expectedClass = severity !== undefined ? `btn btn-outline-${severity}` : 'btn btn-outline-primary'

          // Act
          mountSplitButton({ label: label, severity: severity, outlined: true })

          // Assert
          cy.get(`[data-pc-name="pcbutton"]`).should('have.class', expectedClass)
        })

        it(`Applies ${severity !== undefined ? severity : 'primary'} button classes to dropdown button when severity is ${severity}`, () => {
          // Arrange
          const label = "Button"
          const expectedClass = severity !== undefined ? `btn dropdown-toggle-split btn-${severity}` : 'btn dropdown-toggle-split btn-primary'

          // Act
          mountSplitButton({ label: label, severity: severity })

          // Assert
          cy.get(`[data-pc-name="pcdropdown"]`).should('have.class', expectedClass)
        })

        it(`Applies ${severity !== undefined ? severity : 'primary'} outline button classes to dropdown button when severity is ${severity} and outline is true`, () => {
          // Arrange
          const label = "Button"
          const expectedClass = severity !== undefined ? `btn dropdown-toggle-split btn-outline-${severity}` : 'btn dropdown-toggle-split btn-outline-primary'

          // Act
          mountSplitButton({ label: label, severity: severity, outlined: true })

          // Assert
          cy.get(`[data-pc-name="pcdropdown"]`).should('have.class', expectedClass)
        })
      })
    })
  })

  describe('Size', () => {
    ;[{ title: 'Makes button bigger when size is set to large', size: "large", expectedClass: 'btn-lg' },
      { title: 'Makes button smaller when size is set to small', size: "small", expectedClass: 'btn-sm' }]
      .forEach(({ title, size, expectedClass }) => {
        it(title, () => {
          // Arrange
          const label = "Button"

          // Act
          mountSplitButton({ label: label, size: size as 'small' | 'large' })

          // Assert
          cy.get(`[data-pc-name="pcbutton"]`)
            .should('be.visible')
            .and('have.class', expectedClass)
        })
      })
  })

  describe('States', () => {
    it("Greys out when disabled", () => {
      // Arrange
      const label = "Button"
      const disabledRgb = "rgb(0, 119, 200)"
      const opacity = "0.65"

      // Act
      mountSplitButton({ label: label, disabled: true })

      // Assert
      cy.get(`[data-pc-name="pcbutton"]`).should('have.css', 'background-color', disabledRgb)
        .and('have.css', 'border-color', disabledRgb)
        .and('have.css', 'opacity', opacity)
        .and('be.disabled')
    })
  })

})