import Button, { ButtonProps } from "primevue/button";

function mountButton(props: ButtonProps) {
  // @ts-ignore
  cy.mount(Button,
    {
      props
    })
}

describe('<Button />', () => {
  it('Mounts', () => {
    // Arrange
    const id = "button"
    const label = "Button"

    // Act
    mountButton({ id: id, label: label })

    // Assert
    cy.get(`#${id}`).should('be.visible').and('contain.text', label)
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
          const id = "button"
          const label = "Button"
          const expectedClass = severity !== undefined ? `btn btn-${severity}` : 'btn btn-primary'

          // Act
          mountButton({ id: id, label: label, severity: severity })

          // Assert
          cy.get(`#${id}`).should('have.class', expectedClass)
        })
      
        it(`Applies ${severity !== undefined ? severity : 'primary'} outline button classes when severity is ${severity} and outline is true`, () => {
          // Arrange
          const id = "button"
          const label = "Button"
          const expectedClass = severity !== undefined ? `btn btn-outline-${severity}` : 'btn btn-outline-primary'

          // Act
          mountButton({ id: id, label: label, severity: severity, outlined: true })

          // Assert
          cy.get(`#${id}`).should('have.class', expectedClass)
        })
        
        it(`Displays a ${severity !== undefined ? severity : 'primary'} badge when severity is ${severity}`, () => {
          // Arrange
          const id = "button"
          const label = "Button"
          const expectedClass = 'badge'
          const expectedBackgroundColour = "rgb(255, 255, 255)"

          // Act
          mountButton({ id: id, label: label, severity: severity, badge: '8' })

          // Assert
          cy.get(`[data-pc-name="badge"]`)
            .should('have.class', expectedClass)
            .and('have.css', 'background-color', expectedBackgroundColour)
        })

        it(`Displays a ${severity !== undefined ? severity : 'primary'} badge when severity is ${severity} and outline is true`, () => {
          // Arrange
          const id = "button"
          const label = "Button"
          const expectedClass = 'badge'

          // Act
          mountButton({ id: id, label: label, severity: severity, outlined: true, badge: '8' })

          // Assert
          cy.get(`[data-pc-name="badge"]`)
            .should('have.class', expectedClass)
            .and('have.css', 'background-color', rgb)
        })

        it(`Applies ${severity !== undefined ? severity : 'primary'} text button classes when severity is ${severity} and text is true`, () => {
          // Arrange
          const id = "button"
          const label = "Button"
          const expectedClass = severity !== undefined ? `btn text-${severity} fw-bold btn-text-${severity}` : 'btn text-primary fw-bold btn-text-primary'

          // Act
          mountButton({ id: id, label: label, severity: severity, text: true })

          // Assert
          cy.get(`#${id}`).should('have.class', expectedClass)
        })
        
        it(`Applies ${severity !== undefined ? severity : 'primary'} text button and raised classes when severity is ${severity} and text and raised are true`, () => {
          // Arrange
          const id = "button"
          const label = "Button"
          const expectedClass = severity !== undefined ? `btn text-${severity} fw-bold btn-text-${severity} shadow` : 'btn text-primary fw-bold btn-text-primary shadow'

          // Act
          mountButton({ id: id, label: label, severity: severity, text: true, raised: true })

          // Assert
          cy.get(`#${id}`).should('have.class', expectedClass)
        })
      })
    })
  })

  describe('Size', () => {
    ;[{ title: 'Makes button bigger when size is set to large', size: "large", expectedClass: 'btn-lg'}, 
      { title: 'Makes button smaller when size is set to small', size: "small", expectedClass: 'btn-sm' } ]
      .forEach(({title, size, expectedClass}) => {
        it(title, () => {
          // Arrange
          const id = "button"
          const label = "Button"

          // Act
          mountButton({ id: id, label: label, size: size as 'small' | 'large' })

          // Assert
          cy.get(`#${id}`)
            .should('be.visible')
            .and('have.class', expectedClass)
        })
      })
  })
  
  describe('States', () => {
    it('Applies link button classes when link prop is true', () => {
      // Arrange
      const id = "button"
      const label = "Button"
      const expectedClass = `btn btn-link`

      // Act
      mountButton({ id: id, label: label, link: true })

      // Assert
      cy.get(`#${id}`).should('have.class', expectedClass)
    })

    it("Doesn't apply severity classes when link is true", () => {
      // Arrange
      const id = "button"
      const severity = "Danger"
      const label = "Button"
      const absentClass = "btn btn-danger"
      const expectedClass = "btn btn-link"

      // Act
      mountButton({ id: id, label: label, severity: severity, link: true })

      // Assert
      cy.get(`#${id}`).should('have.class', expectedClass).and('not.have.class', absentClass)
    })

    it("Greys out when disabled", () => {
      // Arrange
      const id = "button"
      const label = "Button"
      const disabledRgb = "rgb(0, 119, 200)"
      const opacity = "0.65"

      // Act
      mountButton({ id: id, label: label, disabled: true })

      // Assert
      cy.get(`#${id}`).should('have.css', 'background-color', disabledRgb)
        .and('have.css', 'border-color', disabledRgb)
        .and('have.css', 'opacity', opacity)
        .and('be.disabled')
    })

    it("Displays loading spinner when loading", () => {
      // Arrange
      const id = "button"
      const label = "Button"
      const expectedClasses = "spinner-border spinner-border-sm border-0 me-2"

      // Act
      mountButton({ id: id, label: label, loading: true })

      // Assert
      cy.get(`#${id}`).should('be.disabled')
      cy.get(`[data-pc-section="loadingicon"]`).should('be.visible').and('have.class', expectedClasses)
    })

    it('Appears raised when raised is true', () => {
      // Arrange
      const id = "button"
      const label = "Button"
      const expectedClass = "shadow"

      // Act
      mountButton({ id: id, label: label, raised: true })

      // Assert
      cy.get(`#${id}`).should('be.visible').and('have.class', expectedClass)
    })

    it('Has rounded corners when rounded is true', () => {
      // Arrange
      const id = "button"
      const label = "Button"
      const expectedClass = "rounded-pill"

      // Act
      mountButton({ id: id, label: label, rounded: true })

      // Assert
      cy.get(`#${id}`).should('be.visible').and('have.class', expectedClass)
    })
  })
  
  it('Overrides badge classes when specified in props', () => {
    // Arrange
    const id = "button"
    const label = "Button"
    const expectedClass = 'badge'
    const severity = "primary"
    const badgeClassOverride = "bg-danger text-white"
    const expectedRgb = "rgb(247, 35, 35)"
    
    // Act
    mountButton({ id: id, label: label, severity: severity, badge: '8', badgeClass: badgeClassOverride })

    // Assert
    cy.get(`[data-pc-name="badge"]`)
      .should('have.class', expectedClass)
      .and('have.css', 'background-color', expectedRgb)
  })
})