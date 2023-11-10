<template>
  <div class="d-flex flex-column align-items-center" data-cy="stepper">
    <div class="d-flex align-items-center justify-content-center w-100">
      <Button :severity="props.severity" :disabled="isBackButtonDisabled" @click="previousStep" class="rounded-circle py-2 me-4" data-cy="back-button">
        <Icon icon="bi:chevron-left" class="mb-1" />
      </Button>
      <Steps v-model:active-step="localCurrentStep" :model="props.model" :pt="stepperPT" :readonly="false" />
    </div>
    <Divider />
    <div v-for="(step, index) in props.model" :key="step.key ?? step.label" class="w-100">
      <slot v-if="index === localCurrentStep" :name="step.key ?? step.label" :next-step="nextStep" :previous-step="previousStep">
        <ForgeAlert severity="info" data-cy="alert">
          Please add Slot Content for the key {{ step.key ?? step.label }}
          <Button severity="primary" label="Next" @click="nextStep" class="ms-2"/>
        </ForgeAlert>
      </slot>
    </div>
  </div>

</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { StepsPassThroughMethodOptions, StepsPassThroughOptions, StepsProps } from "primevue/steps";
import { Severity } from "../types/forge-types";
import { computed, ref } from "vue";
import { MenuItem } from "primevue/menuitem";
import ForgeAlert from "@/components/ForgeAlert.vue";
import { DefaultPassThrough } from "primevue/ts-helpers";

export interface ForgeStepperProps extends /* vue-ignore */ StepsProps {
  currentStep?: number,
  severity?: Severity
  model: MenuItem[]
}

const emit = defineEmits(['update:currentStep'])

const props = withDefaults(defineProps<ForgeStepperProps>(), {
  severity: "primary",
  currentStep: 0
})

const localCurrentStep = ref<number>(props.currentStep)

const previousStep = () => {
  do {
    localCurrentStep.value--
  } while (props.model[localCurrentStep.value].disabled)
  emit('update:currentStep', localCurrentStep.value)
}

const nextStep = () => {
  if (localCurrentStep.value < props.model.length - 1){
    do {
      localCurrentStep.value++
    } while (props.model[localCurrentStep.value].disabled)
  }
  emit('update:currentStep', localCurrentStep.value)
}

const isBackButtonDisabled = computed(() => {
  const index = props.model.findIndex((x) => !x.disabled)
  return !(index < localCurrentStep.value && index > -1)
})

const stepperPT = computed<DefaultPassThrough<StepsPassThroughOptions>>(() => ({
  menuitem: (options : StepsPassThroughMethodOptions) => ({
    class: [{
      'cursor-pointer': !options.context.disabled
    }]
  }),
  step: (options : StepsPassThroughMethodOptions) => ({
     class: [
         'd-flex align-items-center justify-content-center mb-2 step',
         {
           'inactive': options.context.disabled,
           'bg-primary text-white': options.context.index === localCurrentStep.value && (props.severity === undefined || props.severity === 'primary'),
           'bg-secondary text-white': options.context.index === localCurrentStep.value && props.severity === 'secondary',
           'bg-success text-white': options.context.index === localCurrentStep.value && props.severity === 'success',
           'bg-warning text-white': options.context.index === localCurrentStep.value && props.severity === 'warning',
           'bg-danger text-white': options.context.index === localCurrentStep.value && props.severity === 'danger',
           'bg-info text-white': options.context.index === localCurrentStep.value && props.severity === 'info'
         }
     ]
  }),
  label: (options: StepsPassThroughMethodOptions) => ({
    class: [
      'h5',
      {
        'border-bottom border-2 border-primary': options.context.index === localCurrentStep.value && (props.severity === undefined || props.severity === 'primary'),
        'border-bottom border-2 border-secondary': options.context.index === localCurrentStep.value && props.severity === 'secondary',
        'border-bottom border-2 border-success': options.context.index === localCurrentStep.value && props.severity === 'success',
        'border-bottom border-2 border-warning': options.context.index === localCurrentStep.value && props.severity === 'warning',
        'border-bottom border-2 border-danger': options.context.index === localCurrentStep.value && props.severity === 'danger',
        'border-bottom border-2 border-info': options.context.index === localCurrentStep.value && props.severity === 'info'
      }
    ]
  }),
}))
</script>