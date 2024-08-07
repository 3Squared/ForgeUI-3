<template>
  <div class="d-flex" data-cy="checkbox-container" v-bind="{...$attrs}">
    <Checkbox :id="props.name" v-bind="{...props}" v-model="model" :input-class="{'is-invalid': hasErrors }" @update:model-value="changeState">
      <template #icon>
        <div />
      </template>
    </Checkbox>
    <label :for="props.name" class="w-100 my-auto" :class="`${props.disabled ? 'opacity-50' : 'cursor-pointer'} ${hasErrors ? 'text-danger-dark' : ''}`" @click="changeState">
      <slot>{{ props.label }}</slot>
    </label>
  </div>
  <small data-cy="error" class="text-invalid" v-show="hasErrors">{{ errorMessage }}</small>
</template>



<script setup lang="ts" >
import { CheckboxProps } from "primevue/checkbox";
import { useField } from "vee-validate";
import { computed, onMounted, watch } from "vue";

type CheckProps = Omit<CheckboxProps, "aria-label" | "aria-labelledby">

export interface ForgeCheckProps extends CheckProps {
  label: string
}

const model = defineModel<boolean>()

const props = withDefaults(defineProps<ForgeCheckProps>(), 
    {
      binary: true, 
      label: ""
    })

const { handleChange, checked, setValue, errors, errorMessage } = useField(() => props.name ?? props.label, undefined, {
  type: "checkbox",
  checkedValue: model.value
})

const changeState = (event : Event) => {
  if(!props.disabled) {
    handleChange(event)
    model.value = !model.value
  }
}

onMounted(() => {
  if (props.value !== undefined && props.value !== checked?.value) {
    setValue(props.value)
  } else if (props.modelValue !== undefined && props.modelValue !== checked?.value){
    setValue(props.modelValue)
  }
})

watch(() => props.value, (value) => {
  setValue(value)
})

const hasErrors = computed(() => errors.value.length > 0)
</script>