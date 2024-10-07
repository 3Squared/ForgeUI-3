// @ts-ignore
import ForgeDatepicker, { ForgeDatePickerProps } from "../../../src/components/ForgeDatepicker.vue";
import CalendarValidationWrapper, { CalendarValidationWrapperProps } from "./calendarValidationWrapper.vue";
import * as yup from 'yup'

const id = "Calendar"
const input = '[name="datepicker"]'
const errorMessageId = '[data-cy="error"]'
const beforeSlotId = "[data-cy='before-slot']"
const afterSlotId = "[data-cy='after-slot']"
const validationWrapperSubmitButton = "#form-button"

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

function mountCalendarValidationWrapper(props : CalendarValidationWrapperProps) {
  // @ts-ignore
  cy.mount(CalendarValidationWrapper, {
    props: {
      ...props,
      id: id
    },
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
  
  it("Displays validation error when schema isn't satisfied", () => {
    // Arrange
    const name = "datepicker"
    const errorMessage = "Required"
    const invalidClass = 'datepicker-invalid'
    const errorMessageClass = 'text-invalid'
    const schema = yup.object().shape({
      datepicker: yup.date().required(errorMessage)
    })
    
    // Act
    mountCalendarValidationWrapper({ name, schema })
    cy.get(validationWrapperSubmitButton).click()

    // Assert
    cy.get(input)
      .should('have.class', invalidClass)
      
    cy.get(errorMessageId)
      .should('be.visible')
      .and("have.text", errorMessage)
      .and("have.class", errorMessageClass)
  })
})