<template>
  <div class="d-flex" data-cy="checkbox-container">
    <Checkbox :id="props.name" v-bind="{...$attrs, ...props}" :value="checked" :input-class="{'is-invalid': hasErrors }" @change="changeState" />
    <label :for="props.name" :class="'form-check-label' && `${props.disabled ? 'opacity-50' : 'cursor-pointer'}`" @click="changeState">
      <slot>{{ props.label }}</slot>
    </label>
  </div>
  <small data-cy="error" class="text-invalid" v-show="hasErrors">{{ errorMessage }}</small>
</template>



<script setup lang="ts" >
import { CheckboxProps } from "primevue/checkbox";
import { TypedSchema, useField } from "vee-validate";
import { computed } from "vue";
type CheckProps = Omit<CheckboxProps, "aria-label" | "aria-labelledby">

export interface ForgeCheckProps extends CheckProps {
  label: string,
  rules?: TypedSchema
}

const emits = defineEmits(['update:modelValue'])

const props = withDefaults(defineProps<ForgeCheckProps>(), 
    {
      binary: true, 
      label: ""
    })


const { checked, handleChange, errors, errorMessage } = useField(() => props.name ?? props.label, props.rules, {
  type: "checkbox",
  checkedValue: true,
  initialValue: props.modelValue
})

const changeState = (event : Event) => {
  if(!props.disabled) {
    handleChange(event)
    emits('update:modelValue', !props.modelValue)
  }
}

const hasErrors = computed(() => errors.value.length > 0)
</script>