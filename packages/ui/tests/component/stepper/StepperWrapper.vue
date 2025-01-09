<template>
  <ForgeStepper :steps="props.stepperProps.steps" :currentStep="props.stepperProps.currentStep" :severity="props.stepperProps.severity">
    <template #step1> Panel 1</template>
    <template #step2> Panel 2</template>
    <template #step3> Panel 3</template>
  </ForgeStepper>
</template>

<script setup lang="ts">
//@ts-ignore
import ForgeStepper, {ForgeStepperProps} from "@/components/ForgeStepper.vue";

export interface StepperWrapperProps {
  stepperProps: ForgeStepperProps
}

const props = defineProps<StepperWrapperProps>();
</script>