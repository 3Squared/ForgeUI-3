import { ForgeLoader } from "../../../index";
// @ts-ignore
import { ForgeLoaderProps } from "../../../src/components/ForgeLoader.vue";
import { Variant } from "../../../src/types/forge-types";

const id = "spinner"
function mountSpinner(props : ForgeLoaderProps) {
  //@ts-ignore
  cy.mount(ForgeLoader, {
    props,
    attrs: {
      id: id
    }
  })
}

describe('<ForgeLoader />', () => {
  it("Mounts", () => {
    // Act
    mountSpinner({})
    
    // Assert
    cy.get(`#${id}`)
      .should('exist')
      .and('be.visible')
  })
  
  describe('Variant', () => {
    ;[{ title: "Defaults to primary when variant is undefined" },
      { title: "Displays primary loader when variant is primary", variant: 'primary' },
      { title: "Displays secondary loader when variant is secondary", variant: 'secondary' },
      { title: "Displays success loader when variant is success", variant: 'success' },
      { title: "Displays warning loader when variant is warning", variant: 'warning' },
      { title: "Displays danger loader when variant is danger", variant: 'danger' },
      { title: "Displays info loader when variant is info", variant: 'info' }
    ].forEach(({ title, variant }) => {
      it(title, () => {
        // Arrange 
        const expectedLoaderClass = variant === undefined ? 'text-primary' : `text-${variant}`

        // Act
        mountSpinner({ variant: variant as Variant })

        // Assert
        cy.get('[data-pc-name="progressspinner"]')
          .should('exist')
          .and('be.visible')
          .and('have.class', expectedLoaderClass)
      })
    })
  })
})