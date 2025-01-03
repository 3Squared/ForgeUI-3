<template>
  <Stepper>
    <StepList>
      <Step
          v-for="step in steps"
          :key="step.value"
          :value="step.value"
          :disabled="step.disabled"
           v-bind="{...$attrs, ...props}"
      >{{ step.label }}
      </Step>
    </StepList>
    <StepPanels>
      <StepPanel v-for="step in steps" :key="step.value" :value="step.value"> Panel 1</StepPanel>
    </StepPanels>
  </Stepper>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { StepsPassThroughMethodOptions, StepsProps } from "primevue/steps";
import { Severity, ForgeSteps } from "../types/forge-types";
import { computed, ref, onMounted } from "vue";
import ForgeAlert from "@/components/ForgeAlert.vue";
import Step, { StepPassThroughMethodOptions } from "primevue/step";
import Stepper from "primevue/stepper";
import StepList from "primevue/steplist";
import StepPanel from "primevue/steppanel";
import StepPanels from "primevue/steppanels";

export interface ForgeStepperProps extends /* vue-ignore */ StepsProps {
  currentStep?: number;
  severity?: Severity;
  steps: ForgeSteps[];
}

const props = withDefaults(defineProps<ForgeStepperProps>(), {
  severity: "primary",
  currentStep: 1,
});

const stepPT = computed(() => ({
  number: ({ context }: StepPassThroughMethodOptions) => ({
    class: [
      "step mb-2 d-flex align-items-center justify-content-center",
      {
        inactive: context.disabled,
        "bg-primary text-white": context.active && props.severity === "primary",
        "bg-brand text-white": context.active && props.severity === "brand",
        "bg-secondary text-white": context.active && props.severity === "secondary",
        "bg-success text-white": context.active && props.severity === "success",
        "bg-warning text-white": context.active && props.severity === "warning",
        "bg-danger text-white": context.active && props.severity === "danger",
        "bg-info text-white": context.active && props.severity === "info",
      },
    ],
  }),
  title: ({ context }: StepPassThroughMethodOptions) => ({
    class: [
      "h5",
      {
        inactive: context.disabled,
        "border-bottom border-2 border-primary": context.active && props.severity === "primary",
        "border-bottom border-2 border-brand": context.active && props.severity === "brand",
        "border-bottom border-2 border-secondary": context.active && props.severity === "secondary",
        "border-bottom border-2 border-success": context.active && props.severity === "success",
        "border-bottom border-2 border-warning": context.active && props.severity === "warning",
        "border-bottom border-2 border-danger": context.active && props.severity === "danger",
        "border-bottom border-2 border-info": context.active && props.severity === "info"
      },
    ],
  }),
}));

</script>
