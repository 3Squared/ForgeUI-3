// @ts-ignore
import ForgeDatepicker, { ForgeDatePickerProps } from "../../../src/components/ForgeDatepicker.vue";
import { Severity } from "../../../src/types/forge-types";

const id = "Calendar"
const beforeSlotId = "[data-cy='before-slot']"
const afterSlotId = "[data-cy='after-slot']"
const iconId = "[data-cy='icon']"
const panelId = '[data-pc-section="panel"]'

function mountCalendar(props : ForgeDatePickerProps, beforeSlotContent : string = "", afterSlotContent : string = "") {
  // @ts-ignore
  cy.mount(ForgeDatepicker, {
    props: {
      ...props,
      id: id
    },
    slots: {
      before: beforeSlotContent,
      after: afterSlotContent
    }
  })
}

describe("<Calendar />", () => {
  it('Mounts', () => {
    // Act
    mountCalendar({ })
    
    // Assert
    cy.get(`#${id}`)
      .should('exist')
      .and('be.visible')
  });
  
  describe("Slots", () => {
    it('Should add content before when element is added to the before slot', () => {
      // Arrange
      const beforeSlotContent = "I am before the calendar!"
      
      // Act
      mountCalendar({ }, beforeSlotContent)
      
      // Assert
      cy.get(beforeSlotId)
        .should("exist")
        .and("be.visible")
        .and("contain.text", beforeSlotContent)
    });

    it('Should add content after when element is added to the after slot', () => {
      // Arrange
      const afterSlotContent = "I am after the calendar!"

      // Act
      mountCalendar({}, "", afterSlotContent)

      // Assert
      cy.get(afterSlotId)
        .should("exist")
        .and("be.visible")
        .and("contain.text", afterSlotContent)
    });
  })
  
  describe("Severity", () => {
    ;[
      { title: "Displays primary icon when severity is undefined", severity: undefined },
      { title: "Displays primary icon when severity is primary", severity: "primary" },
      { title: "Displays secondary icon when severity is secondary", severity: "secondary" },
      { title: "Displays success icon when severity is success", severity: "success" },
      { title: "Displays warning icon when severity is warning", severity: "warning" },
      { title: "Displays primary icon when severity is danger", severity: "danger" },
      { title: "Displays info icon when severity is info", severity: "info" }
    ].forEach(({ title, severity}) => {
      it(title, () => {
        // Arrange
        const expectedIconClass = severity === undefined ? 'text-primary' : `text-${severity}`
        
        // Act
        mountCalendar({ severity: severity as Severity})
        
        // Assert
        cy.get(iconId)
          .should('exist')
          .and('be.visible')
          .and('have.class', expectedIconClass)
      })
    })
  })
  
  it("Opens calendar on focus of component", () => {
    // Act
    mountCalendar({ })
    cy.get(`#${id}`).click()
    
    // Arrange
    cy.get(panelId)
      .should('be.visible')
  })
})