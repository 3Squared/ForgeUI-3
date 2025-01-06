<template>
  <Stepper :value="currentStep">
    <StepList>
      <Step
          v-for="step in steps"
          :key="step.value"
          :value="step.value"
          :disabled="step.disabled"
          v-bind="{...$attrs}"
          :pt="stepPT"
      >
        <div v-if="showStepLabel">{{ step.label }}</div>
      </Step>
    </StepList>
    <StepPanels>
      <StepPanel v-for="step in steps" :key="step.value" :value="step.value">
        <slot :name="'step' + step.value" />
      </StepPanel>
    </StepPanels>
  </Stepper>
</template>

<script setup lang="ts">
import { StepsPassThroughMethodOptions, StepsProps } from "primevue/steps";
import { Severity, ForgeSteps } from "../types/forge-types";
import { computed } from "vue";
import Step from "primevue/step";
import Stepper from "primevue/stepper";
import StepList from "primevue/steplist";
import StepPanel from "primevue/steppanel";
import StepPanels from "primevue/steppanels";

export interface ForgeStepperProps extends /* vue-ignore */ StepsProps {
  currentStep?: number;
  severity?: Severity;
  steps: ForgeSteps[];
  showStepLabel?: boolean
  inlineSteps?: boolean
}

const props = withDefaults(defineProps<ForgeStepperProps>(), {
  severity: "primary",
  currentStep: 1,
  showStepLabel: true,
  inlineSteps: false
});

const stepPT = computed(() => ({
  header: {
    class: [
      "p-0 m-0 d-flex align-items-center border border-0 bg-transparent gap-1",
      {
        "flex-row": props.inlineSteps,
        "flex-column": !props.inlineSteps
      }
    ]
  },
  number: ({ context }: StepsPassThroughMethodOptions) => ({
    class: [
      "step mb-2 d-flex align-items-center justify-content-center",
      {
        inactive: context.disabled,
        [`bg-${props.severity} text-white`]: context.active,
      },
    ],
  }),
  title: ({ context }: StepsPassThroughMethodOptions) => ({
    class: [
      "h5",
      {
        inactive: context.disabled,
        [`border-bottom border-2 border-${props.severity}`]: context.active
      },
    ],
  }),
}));

</script>
