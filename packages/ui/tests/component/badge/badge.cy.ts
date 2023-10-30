import Badge, { BadgeProps } from "primevue/badge";

const id = "badge"
function mountBadge(props : BadgeProps) {
  //@ts-ignore
  cy.mount(Badge, {
    attrs: {
      id: id
    },
    props,
  })
}

describe('<Badge />', () => {
  it('Mount', () => {
    // Arrange
    const value = 6
    
    // Act
    mountBadge({ value: value })
    
    // Assert
    cy.get(`#${id}`)
      .should('exist')
      .and('be.visible')
  })
  
  describe('Variants', () => {
    ;[
      { title: 'Defaults to primary when severity isnt defined', severity: undefined },
      { title: 'Displays primary badge when severity is primary', severity: 'primary' },
      { title: 'Displays secondary badge when severity is secondary', severity: 'secondary' },
      { title: 'Displays success badge when severity is success', severity: 'success' },
      { title: 'Displays warning badge when severity is warning', severity: 'warning' },
      { title: 'Displays danger badge when severity is danger', severity: 'danger' },
      { title: 'Displays info badge when severity is info', severity: 'info' },
    ].forEach(({ title, severity }) => {
      it(title, () => {
        // Arrange
        const value = 6
        const expectedClass = severity === undefined ? 'badge badge-primary' : `badge badge-${severity}`

        // Act
        mountBadge({ value: value, severity: severity })

        // Assert
        cy.get(`#${id}`)
          .should('have.class', expectedClass)
      })
    })
  })
  
  describe('Size', () => {
    ;[
      { title: 'Adds the badge-xl class when size is xlarge', size: 'xlarge' },
      { title: 'Adds the badge-lg class when size is large', size: 'large' }
    ].forEach(({ title, size }) => {
      it(title, () => {
        // Arrange
        const value = 6
        const expectedClass = size === 'large' ? 'badge-lg' : `badge-xl`

        // Act
        mountBadge({ value: value, size: size as 'large' | 'xlarge' })

        // Assert
        cy.get(`#${id}`)
          .should('have.class', expectedClass)
      })
    })
  })

})