// @ts-ignore
import ForgeTile, { ForgeTileProps } from "@/components/ForgeTile.vue";

const tileId = "[data-cy='tile']"
const buttonTileId = "[data-cy='button-tile']"

function mountTile(props : ForgeTileProps) {
  cy.mount(ForgeTile, {
    props
  })
}

describe("<ForgeTile />", () => {
  it("Mounts", () => {
    // Act
    mountTile({ })
    
    // Assert
    cy.get(tileId)
      .should('exist')
      .and('be.visible')
  })
  
  it("Displays tile as a button when clickable is true", () => {
    // Arrange
    const clickable = true
    const buttonClass = "btn"
    
    // Act
    mountTile({ clickable: clickable })

    // Assert
    cy.get(buttonTileId)
      .should('exist')
      .and('be.visible')
      .and('have.class', buttonClass)
  })

  describe("Button Tile", () => {
    describe('Severity', () => {
      ;[
        { title: "Displays primary button tile when severity is undefined", severity: undefined },
        { title: "Displays primary button tile when severity is primary", severity: "primary" },
        { title: "Displays secondary button tile when severity is secondary", severity: "secondary" },
        { title: "Displays success button tile when severity is success", severity: "success" },
        { title: "Displays warning button tile when severity is warning", severity: "warning" },
        { title: "Displays danger button tile when severity is danger", severity: "danger" },
        { title: "Displays info button tile when severity is info", severity: "info" },
      ].forEach(({ title, severity }) => {
        it(title, () => {
          // Arrange
          const expectedTileClass = severity === undefined ? 'tile-primary' : `tile-${severity}`
          const expectedButtonClass = severity === undefined ? 'btn-primary' : `btn-${severity}`

          // Act
          mountTile({ severity: severity, clickable: true })

          // Assert
          cy.get(buttonTileId)
            .should('have.class', expectedTileClass)
            .and('have.class', expectedButtonClass)
        })
      })
    })
    
    describe("Bar", () => {
      ;[
        { title: "Displays no border on the button tile when position is undefined", position: undefined },
        { title: "Displays no border on the button tile when position is none", position: "none" },
        { title: "Displays border at the top of the button tile when position is top", position: "top" },
        { title: "Displays border on the left of the button tile when position is left", position: "left" },
      ].forEach(({ title, position }) => {
        it(title, () => {
          // Arrange
          const expectedClass = `tile-bar-${position}`

          // Act
          mountTile({ barPosition: position, clickable: true })

          // Assert
          if (position === undefined || position === 'none') {
            cy.get(buttonTileId)
              .should('not.have.class', expectedClass)
          } else {
            cy.get(buttonTileId)
              .should('have.class', expectedClass)
          }
        });
      })
    })
  })
  
  describe('Tile', () => {
    describe("Severity", () => {
      ;[
        { title: "Displays primary tile when severity is undefined", severity: undefined },
        { title: "Displays primary tile when severity is primary", severity: "primary" },
        { title: "Displays secondary tile when severity is secondary", severity: "secondary" },
        { title: "Displays success tile when severity is success", severity: "success" },
        { title: "Displays warning tile when severity is warning", severity: "warning" },
        { title: "Displays danger tile when severity is danger", severity: "danger" },
        { title: "Displays info tile when severity is info", severity: "info" },
      ].forEach(({ title, severity }) => {
        it(title, () => {
          // Arrange
          const expectedClass = severity === undefined ? 'tile-primary' : `tile-${severity}`

          // Act
          mountTile({ severity: severity })

          // Assert
          cy.get(tileId)
            .should('have.class', expectedClass)
        })
      })
    })
    
    describe("Bar", () => {
      ;[
        { title: "Displays no border on tile when position is undefined", position: undefined },
        { title: "Displays no border on tile when position is none", position: "none" },
        { title: "Displays border at the top of the tile when position is top", position: "top" },
        { title: "Displays border on the left of the tile when position is left", position: "left" },
      ].forEach(({ title, position }) => {
        it(title, () => {
          // Arrange
          const expectedClass = `tile-bar-${position}`

          // Act
          mountTile({ barPosition: position })

          // Assert
          if (position === undefined || position === 'none') {
            cy.get(tileId)
              .should('not.have.class', expectedClass)
          } else {
            cy.get(tileId)
              .should('have.class', expectedClass)
          }
        });
      })
    })
  })
})