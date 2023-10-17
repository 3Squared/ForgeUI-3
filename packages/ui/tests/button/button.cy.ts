import Button from "primevue/button";


describe('<Button />', () => {
  it('Mounts', () => {
    // Arrange
    const id = "button"
    const label = "Button"
    
    // Act
    // @ts-ignore
    cy.mount(Button, {
      props: {
        id: id,
        label: label
      }
    })
    
    // Assert
    cy.get(`#${id}`).should('be.visible').and('contain.text', label)
  })
  
  describe('Base variants', () => {
    ;[
      { title: "Applies primary button classes when severity is null", severity: null },
      { title: "Applies primary button classes when severity is primary", severity: "primary" },
      { title: "Applies secondary button classes when severity is secondary", severity: "secondary" },
      { title: "Applies success button classes when severity is success", severity: "success" },
      { title: "Applies info button classes when severity is info", severity: "info" },
      { title: "Applies warning button classes when severity is warning", severity: "warning" },
      { title: "Applies danger button classes when severity is danger", severity: "danger" },
    ]
      .forEach(({ title, severity }) => {
        it(title, () => {
          // Arrange
          const id = "button"
          const label = "Button"
          const expectedClass = severity !== null ? `btn btn-${severity}` : 'btn btn-primary'

          // @ts-ignore
          cy.mount(Button, {
            props: {
              id: id,
              severity: severity,
              label: label
            }
          })

          cy.get(`#${id}`).should('have.class', expectedClass)
        })
      })
  })
  
  describe('Link', () => {
    it('Applies link button classes when link prop is true', () => {
      // Arrange
      const id = "button"
      const label = "Button"
      const expectedClass = `btn btn-link`
      
      // Act
      // @ts-ignore
      cy.mount(Button, {
        props: {
          id: id,
          link: true,
          label: label
        }
      })

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
      // @ts-ignore
      cy.mount(Button, {
        props: {
          id: id,
          severity: severity,
          link: true,
          label: label
        }
      })

      // Assert
      cy.get(`#${id}`).should('have.class', expectedClass).and('not.have.class', absentClass)
    })
  })

  describe('Outline', () => {
    ;[
      { title: "Applies primary outline button classes when severity is null and outline is true", severity: null },
      { title: "Applies primary outline button classes when severity is primary and outline is true", severity: "primary" },
      { title: "Applies secondary outline button classes when severity is secondary and outline is true", severity: "secondary" },
      { title: "Applies success outline button classes when severity is success and outline is true", severity: "success" },
      { title: "Applies info outline button classes when severity is info and outline is true", severity: "info" },
      { title: "Applies warning outline button classes when severity is warning and outline is true", severity: "warning" },
      { title: "Applies danger outline button classes when severity is danger and outline is true", severity: "danger" },
    ].forEach(({ title, severity }) => {
      it(title, () => {
        // Arrange
        const id = "button"
        const label = "Button"
        const expectedClass = severity !== null ? `btn btn-outline-${severity}` : 'btn btn-outline-primary'

        // Act
        // @ts-ignore
        cy.mount(Button, {
          props: {
            id: id,
            severity: severity,
            outlined: true,
            label: label
          }
        })

        // Assert
        cy.get(`#${id}`).should('have.class', expectedClass)
      })
    })
  })
})