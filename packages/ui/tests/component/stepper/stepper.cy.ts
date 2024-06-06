// @ts-ignore
import ForgeStepper, { ForgeStepperProps } from "@/components/ForgeStepper.vue";
import { MenuItem } from "primevue/menuitem";

const stepperCyId = '[data-cy="stepper"]' 
const backButtonCyId = '[data-cy="back-button"]'
const stepId = '[data-pc-section="step"]'
const alertId = '[data-cy="alert"]'

function mountStepper(props : ForgeStepperProps) {
  cy.mount(ForgeStepper, { props })
}

describe('<ForgeStepper />', () => {
  it("Mounts", () => {
      // Arrange
      const steps = [
        { label: "Step 1" },
        { label: "Step 2" },
        { label: "Step 3" }
      ] as MenuItem[]
    
      // Act
      mountStepper({ model: steps })
        
      // Assert
      cy.get(stepperCyId)
        .should("exist")
        .and("be.visible")
  })
  
  describe("Variant", () => {
    ;[
      { title: "Should display primary stepper when severity is undefined", severity: "primary" },
      { title: "Should display primary stepper when severity is primary", severity: "primary" },
      { title: "Should display brand stepper when severity is brand", severity: "brand" },
      { title: "Should display secondary stepper when severity is secondary", severity: "secondary" },
      { title: "Should display success stepper when severity is success", severity: "success" },
      { title: "Should display warning stepper when severity is warning", severity: "warning" },
      { title: "Should display danger stepper when severity is danger", severity: "danger" },
      { title: "Should display info stepper when severity is info", severity: "info" },
    ].forEach(({ title, severity }) => {
      it(title, () => {
        // Arrange
        const steps = [
          { label: "Step 1" },
          { label: "Step 2" },
          { label: "Step 3" }
        ] as MenuItem[]
        const backgroundClass = severity === undefined ? 'bg-primary' : `bg-${severity}`
        const buttonClass = severity === undefined ? 'btn-primary' : `btn-${severity}`

        // Act
        mountStepper({ model: steps, severity: severity })

        // Assert
        cy.get(stepperCyId)
          .should("exist")
          .and("be.visible")

        cy.get(backButtonCyId)
          .should('have.class', buttonClass)

        cy.get(stepId)
          .should('have.class', backgroundClass)
      })
    })
  })
  
  describe("Disabled", () => {
    it("Should grey out steps if disabled", () => {
      // Arrange
      const steps = [
        { label: "Step 1" },
        { label: "Step 2", disabled: true },
        { label: "Step 3" }
      ] as MenuItem[]
      const expectedClass = 'step inactive'

      // Act
      mountStepper({ model: steps })

      // Assert
      cy.get(stepId).eq(1)
        .should('have.class', expectedClass)
    })
    
    it("Skips over disabled step when moving forward", () => {
      // Arrange
      const steps = [
        { label: "Step 1" },
        { label: "Step 2", disabled: true },
        { label: "Step 3" }
      ] as MenuItem[]

      // Act
      mountStepper({ model: steps })

      // Act/Assert
      cy.get(stepId).eq(1).click()
      cy.get(alertId).should('contain.text', "Step 1")

      cy.get(stepId).eq(2).click()
      cy.get(alertId).should('contain.text', "Step 3")
    })
    
    it("Skips over disabled step when moving backwards", () => {
      // Arrange
      const steps = [
        { label: "Step 1" },
        { label: "Step 2", disabled: true },
        { label: "Step 3" }
      ] as MenuItem[]
      const currentStep = 3

      // Act
      mountStepper({ model: steps, currentStep: currentStep })
      cy.get(stepId).eq(0).click()

      // Assert
      cy.get(alertId).should('contain.text', "Step 1")
    })
  })
})