// @ts-ignore
import ForgeStepper, { ForgeStepperProps } from "@/components/ForgeStepper.vue";
import { MenuItem } from "primevue/menuitem";

function mountStepper(props : ForgeStepperProps) {
  cy.mount(ForgeStepper, 
    {
      props
    })
}

describe('<ForgeStepper />', () => {
  it("Mounts", () => {
      // Arrange
      const steps = [
        { label: "Step 1" },
        { label: "Step 2", disabled: true},
        { label: "Step 3" }
      ] as MenuItem[]
    
      // Act
      mountStepper({ model: steps })
        
      // Assert
      
  })
})