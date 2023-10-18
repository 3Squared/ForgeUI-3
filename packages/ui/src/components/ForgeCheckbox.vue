<template>
  <div class="d-flex" data-cy="checkbox-container">
    <Checkbox :id="props.name" v-bind="{...$attrs, ...props}">
      <template #icon>
        <div data-cy="checkbox-icon">
          <Icon icon="bi:check-lg" class="mb-1 fw-medium text-white" width="15" />
        </div>
      </template>
    </Checkbox>
    <label :for="props.name" class="form-check-label">{{ props.label }}</label>
  </div>
</template>



<script setup lang="ts" >
import { CheckboxProps } from "primevue/checkbox";
import { Icon } from '@iconify/vue'
type CheckProps = Omit<CheckboxProps, "aria-label" | "aria-labelledby">

const props = withDefaults(defineProps<CheckProps & { label: string }>(), { binary: true, label: ""})
</script>