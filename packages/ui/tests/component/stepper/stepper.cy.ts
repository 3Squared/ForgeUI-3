// @ts-ignore
import ForgeStepper, { ForgeStepperProps } from "@/components/ForgeStepper.vue";
import type { ForgeSteps } from "../../../src/types/forge-types.ts";
import StepperWrapper, {StepperWrapperProps} from "./StepperWrapper.vue";

const stepperCyId = '[data-pc-name="steplist"]' 
const stepperPanelCyId = '[data-pc-name="steppanel"]' 
const stepId = '[data-pc-section="number"]'

function mountStepperWrapper(props : StepperWrapperProps) {
  cy.mount(StepperWrapper, {
    props
  })
}

describe('<ForgeStepper />', () => {
  it("Mounts", () => {
      // Arrange
      const steps = [{ label: "Step 1", value: 1 }, { label: "Step 2", value: 2 }, { label: "Step 3", value: 3 }] as ForgeSteps[]
    
      // Act
      mountStepperWrapper({ stepperProps: { steps: steps } })
        
      // Assert
      cy.get(stepperCyId)
        .should("exist")
        .and("be.visible")
  })

  describe('Content', () => {
    it("Displays panel content", () => {
      // Arrange
      const steps = [{ label: "Step 1", value: 1 }, { label: "Step 2", value: 2 }, { label: "Step 3", value: 3 }] as ForgeSteps[]

      // Act
      mountStepperWrapper({ stepperProps: { steps: steps } })

      // Assert
      cy.get(stepperPanelCyId)
        .should("exist")
        .contains("Panel 1")
    })
  });
  
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
        const steps = [{ label: "Step 1", value: 1 }, { label: "Step 2", value: 2 }, { label: "Step 3", value: 3 }] as ForgeSteps[]

        const backgroundClass = severity === undefined ? 'bg-primary' : `bg-${severity}`

        // Act
        mountStepperWrapper({ stepperProps: { steps: steps, severity: severity } })

        // Assert
        cy.get(stepperCyId)
          .should("exist")
          .and("be.visible")

        cy.get(stepId)
          .should('have.class', backgroundClass)
      })
    })
  })
  
  describe("Disabled", () => {
    it("Should grey out steps if disabled", () => {
      // Arrange
      const steps = [{ label: "Step 1", value: 1}, { label: "Step 2", value: 2 }, { label: "Step 3", value: 3, disabled: true }] as ForgeSteps[]

      const expectedClass = 'inactive'

      // Act
      mountStepperWrapper({ stepperProps: { steps: steps} })

      // Assert
      cy.get(stepId).eq(2)
        .should('have.class', expectedClass)
    })
  })
})