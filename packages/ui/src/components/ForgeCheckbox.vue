<template>
  <div class="d-flex" data-cy="checkbox-container">
    <Checkbox :id="props.name" v-bind="{...$attrs, ...props}" v-model="checked" :input-class="{'is-invalid': hasErrors }" @input="handleChange">
      <template #icon>
        <div data-cy="checkbox-icon">
          <Icon icon="bi:check-lg" class="mb-1 fw-medium text-white" width="15" />
        </div>
      </template>
    </Checkbox>
    <label :for="props.name" class="form-check-label">{{ props.label }}</label>
  </div>
  <small data-cy="error" class="text-invalid" v-show="hasErrors">{{ errorMessage }}</small>
</template>



<script setup lang="ts" >
import { CheckboxProps } from "primevue/checkbox";
import { Icon } from '@iconify/vue'
import { TypedSchema, useField } from "vee-validate";
import { computed } from "vue";
type CheckProps = Omit<CheckboxProps, "aria-label" | "aria-labelledby">

interface ForgeCheckProps extends CheckProps {
  label: string,
  rules?: TypedSchema
}

const props = withDefaults(defineProps<ForgeCheckProps>(), 
    {
      binary: true, 
      label: ""
    })

const { checked, handleChange, errors, errorMessage } = useField(() => props.name ?? props.label, props.rules, {
  type: "checkbox",
  checkedValue: true
})

const hasErrors = computed(() => errors.value.length > 0)
</script>