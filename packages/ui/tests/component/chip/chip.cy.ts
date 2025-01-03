import ForgeChip, { ForgeChipProps } from "../../../src/components/ForgeChip.vue";
import { Severity } from "../../../src/types/forge-types.ts";

const id = "chip"

function mountChip(props : ForgeChipProps) {
  cy.mount(ForgeChip, {
    props,
    attrs: {
      id: id
    }
  })
}

 describe("<Chips />", () => {
   it("Mounts", () => {
     // Arrange
     const label = 'Chip 1';

     // Act
     mountChip({label: label})

     // Assert
     cy.get(`#${id}`)
       .should('exist')
       .and('be.visible')
   })

   describe('Variant', () => {
     ;[
       { title: "Defaults to primary when variant is undefined" },
       { title: "Displays primary chips when variant is primary", variant: 'primary' },
       { title: "Displays brand chips when variant is brand", variant: 'brand' },
       { title: "Displays secondary chips when variant is secondary", variant: 'secondary' },
       { title: "Displays success chips when variant is success", variant: 'success' },
       { title: "Displays warning chips when variant is warning", variant: 'warning' },
       { title: "Displays danger chips when variant is danger", variant: 'danger' },
       { title: "Displays info chips when variant is info", variant: 'info' }
     ].forEach(({ title, variant }) => {
       it(title, () => {
         // Arrange 
         const label = 'Chip 1';

         const expectedClasses = variant === undefined ? 'bg-primary-subtle border-primary' : `bg-${variant}-subtle border-${variant}`

         // Act
         mountChip({ chipSeverity: variant as Severity, label: label})

         // Assert
         cy.get(`[data-pc-name="chip"]`)
           .should('exist')
           .and('be.visible')
           .and('have.class', expectedClasses)
       })
     })
   })

   it('Applies rounded-pill class when pill is true', () => {
     // Arrange
     const label = 'Chip 1';
     const pillClass = "rounded-pill"

     // Act
     mountChip({ label: label, pill: true })

     // Assert
     cy.get(`[data-pc-name="chip"]`)
       .and('have.class', pillClass)
   })
 });