// @ts-ignore
import ForgeNavbar, { ForgeNavbarProps } from "@/components/ForgeNavbar.vue";

const navbarCyId = "[data-cy='navbar']"
const menubarId = '[data-pc-section="menu"]'
const logoCyId = "[data-cy='logo']"
const actionId = '[data-pc-section="action"]'
const submenuId = '[data-pc-section="submenu"]'
const separatorId = '[data-pc-section="separator"]'
const burgerIconId = '[data-cy="burger-icon"]'

function mountNavbar(props : ForgeNavbarProps, logoContent : string = "") {
  cy.mount(ForgeNavbar, {
    props,
    slots: {
      logo: logoContent
    }
  })
}

describe("<ForgeNavbar />", () => {
  it("Mounts", () => {
    // Arrange
    const defaultLogoSlotContent = "Logo"
    const items = [
      { label: "Link 1" },
      { label: "Link 2" },
      { label: "Link 3" }
    ]
    
    // Act
    mountNavbar({ model: items })
  
    // Assert
    cy.get(navbarCyId)
      .should('exist')
      .and('be.visible')
    
    cy.get(menubarId).children()
      .should('have.length', items.length)
      .and('be.visible')
    
    cy.get(logoCyId)
      .should('be.visible')
      .and('contain.text', defaultLogoSlotContent)
  })

  it('Disables a link when disabled is true', () => {
    // Arrange
    const disabledClass = "disabled"
    const items = [
      { label: "Link 1" },
      { label: "Link 2", disabled: true},
      { label: "Link 3" }
    ]

    // Act
    mountNavbar({ model: items })

    // Assert
    cy.get(actionId).eq(1)
      .should('have.class', disabledClass)
  });
  
  it("Displays dropdown when item has a sub items", () => {
    // Arrange
    const dropdownClass = "dropdown"
    const dropdownMenuClass = "dropdown-menu"
    const items = [
      { label: "Link 1" },
      { label: "Link 2", items: [
          { label: "Sublink 1" },
          { label: "Sublink 2" }
        ] },
      { label: "Link 3" }
    ]

    // Act
    mountNavbar({ model: items })

    // Assert
    cy.get(menubarId).children().eq(1)
      .should('have.class', dropdownClass)

    cy.get(menubarId).children().eq(1).click()
    
    cy.get(submenuId)
      .should("have.class", dropdownMenuClass)

    cy.get(submenuId).children().each(() => cy.get(actionId).should('have.class', 'dropdown-item'))
  })
  
  it("Displays a divider when separator is true and item is in a dropdown", () => {
    // Arrange
    const expectedSeparatorClass = "border-bottom w-100"
    const items = [
      { label: "Link 1" },
      { separator: true },
      {
        label: "Link 2", 
        items: [
          { label: "Sublink 1" },
          { separator: true },
          { label: "Sublink 2" }
        ]
      },
      { label: "Link 3" }
    ]
    
    // Act
    mountNavbar({ model: items })
    cy.get(menubarId).children().eq(2).click()

    // Assert
    cy.get(`${submenuId} > ${separatorId}`)
      .should('exist')
      .and('be.visible')
      .and('have.class', expectedSeparatorClass)
    
    cy.get(`${menubarId} > ${separatorId}`)
      .should('not.have.class', expectedSeparatorClass)
  })

  it("Displays a divider when separator is true and display is mobile", () => {
    // Arrange
    const expectedSeparatorClass = "border-bottom w-100"
    const items = [
      { label: "Link 1" },
      { separator: true },
      {
        label: "Link 2",
        items: [
          { label: "Sublink 1" },
          { separator: true },
          { label: "Sublink 2" }
        ]
      },
      { label: "Link 3" }
    ]

    // Act
    cy.viewport(500, 500)
    mountNavbar({ model: items })
    cy.get(burgerIconId).click()

    // Assert
    cy.get(`${menubarId} > ${separatorId}`)
      .should('exist')
      .and('be.visible')
      .and('have.class', expectedSeparatorClass)
  })

  it('Displays custom logo content when passed through the logo slot', () => {
    // Arrange
    const customLogoSlotContent = "Custom Logo!"
    
    // Act
    mountNavbar({ }, customLogoSlotContent)
    
    // Assert
    cy.get(logoCyId)
      .should('be.visible')
      .and('contain.text', customLogoSlotContent)
  });
  
  describe("Severity", () => {
    
    describe("Theme", () => {
      ;[
        { title: "Displays light navbar when severity is undefined", severity: undefined },
        { title: "Displays light navbar when severity is light", severity: "light" },
        { title: "Displays dark navbar when severity is dark", severity: "dark" },
        { title: "Displays primary navbar when severity is primary", severity: "primary" },
        { title: "Displays secondary navbar when severity is secondary", severity: "secondary" },
        { title: "Displays success navbar when severity is success", severity: "success" },
        { title: "Displays warning navbar when severity is warning", severity: "warning" },
        { title: "Displays danger navbar when severity is danger", severity: "danger" },
        { title: "Displays info navbar when severity is info", severity: "info" }
      ].forEach(({ title, severity }) => {
        it(title, () => {
          // Arrange
          const expectedClass = severity === undefined ? 'bg-light' : `bg-${severity}`

          // Act
          mountNavbar({ severity: severity })

          // Assert
          cy.get(navbarCyId)
            .should('have.class', expectedClass)
        })
      })
    })

    describe("Burger Icon", () => {
      ;[
        { title: "Displays black burger icon when severity is undefined", severity: undefined },
        { title: "Displays black burger icon when severity is light", severity: "light" },
        { title: "Displays white burger icon when severity is dark", severity: "dark" },
        { title: "Displays white burger icon when severity is secondary", severity: "secondary" },
        { title: "Displays white burger icon when severity is success", severity: "success" },
        { title: "Displays white burger icon when severity is primary", severity: "primary" },
        { title: "Displays white burger icon when severity is warning", severity: "warning" },
        { title: "Displays white burger icon when severity is danger", severity: "danger" },
        { title: "Displays white burger icon severity is info", severity: "info" }
      ].forEach(({ title, severity }) => {
        it(title, () => {
          // Arrange
          const expectedClass = severity === 'light' || severity === undefined ? 'text-black' : `text-white`
          const items = [
            { label: "Link 1" },
            { separator: true },
            {
              label: "Link 2",
              items: [
                { label: "Sublink 1" },
                { separator: true },
                { label: "Sublink 2" }
              ]
            },
            { label: "Link 3" }
          ]

          // Act
          cy.viewport(500, 500)
          mountNavbar({ severity: severity, model: items })

          // Assert
          cy.get(burgerIconId)
            .should('have.class', expectedClass)
        })
      })
    })

  })
})