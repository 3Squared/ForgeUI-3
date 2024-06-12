import InputSwitch, { InputSwitchProps } from "primevue/inputswitch";

const inputSwitch = "inputSwitch"
const inputSwitchInput = '[data-pc-section="input"]'

function mountInputSwitch(props : InputSwitchProps) {
  //@ts-ignore
  cy.mount(InputSwitch, {
    props: {
      id: inputSwitch,
      ...props  
    }
  })
}

describe("<InputSwitch />", () => {
  it("Mounts", () => {
    // Act
    mountInputSwitch({})
    
    // Assert
    cy.get(`#${inputSwitch}`)
      .should("exist")
      .and("be.visible")
  })

  it('Should have classes to make it look like a switch', () => {
    // Arrange
    const expectedClasses = "form-check form-switch";
    const expectedInputClasses = "form-check-input"
    
    // Act
    mountInputSwitch({})

    // Assert
    cy.get(`#${inputSwitch}`)
      .should("have.class", expectedClasses)
    
    cy.get(inputSwitchInput)
      .should("have.class", expectedInputClasses)
  });

  it('Should have a primary background when the switch is true', () => {
    // Arrange
    const expectedCssBackgroundProperty = "background-color";
    const expectedCssBackgroundValue = "rgb(13, 110, 253)"
    
    const expectedCssBorderProperty = "border-color"
    const expectedCssBorderValue = "rgb(13, 110, 253)"

    // Act
    mountInputSwitch({ modelValue: true })

    // Assert
    cy.get(inputSwitchInput)
      .should("have.css", expectedCssBackgroundProperty, expectedCssBackgroundValue)
      .and("have.css", expectedCssBorderProperty, expectedCssBorderValue)
  });
})