// @ts-ignore
import ForgeDatepicker, { ForgeDatePickerProps } from "../../../src/components/ForgeDatepicker.vue";
import { Severity } from "../../../src/types/forge-types";

const id = "Calendar"
const beforeSlotId = "[data-cy='before-slot']"
const afterSlotId = "[data-cy='after-slot']"
const iconId = "[data-cy='icon']"

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
})