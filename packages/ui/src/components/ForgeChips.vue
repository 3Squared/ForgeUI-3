<template>
  <Chips v-bind="{...props, ...$attrs}" :pt="chipsPt" v-model:model-value="value">
    <template #removetokenicon="{ removeCallback }">
      <Icon v-show="!props.disabled" icon="bi:x" class="cursor-pointer" @click="removeCallback"/>
    </template>
  </Chips>
  <small v-show="hasErrors" data-cy="error" class="text-invalid">{{ errorMessage }}</small>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ChipsPassThroughMethodOptions, ChipsPassThroughOptions, ChipsProps } from "primevue/chips";
import { Severity } from "../types/forge-types";
import { computed } from "vue";
import { DefaultPassThrough } from "primevue/ts-helpers";
import { TypedSchema, useField } from "vee-validate";

export interface ForgeChipsProps extends /* vue-ignore */ Omit<ChipsProps, "aria-label" | "aria-labelledby"> {
  chipSeverity?: Severity,
  pill?: boolean,
  name?: string,
  rules?: TypedSchema
}

const props = withDefaults(defineProps<ForgeChipsProps>(), {
  name: "",
  chipSeverity: "primary",
  separator: ',',
  pill: false
})

const { errors, value, errorMessage } = useField(() => props.name, props.rules)
value.value = props.modelValue

const hasErrors = computed(() => errors.value.length > 0)

const chipsPt = computed<DefaultPassThrough<ChipsPassThroughOptions>>(() => ({
  inputtoken: 'list-unstyled',
  input: 'border-0', 
  container: ({ props }: ChipsPassThroughMethodOptions) => ({
    class: [
      'form-control mb-0 d-flex',
      {
        'disabled': props.disabled,
        'is-invalid': hasErrors.value
      }
    ]
  }),
  token: {
    class: [
      'rounded px-2 py-1 me-2 text-white list-unstyled',
      {
        'rounded-pill': props.pill,
        'opacity-75': props.disabled
      },
      {
        'bg-primary border-primary': (props.chipSeverity === undefined || props.chipSeverity === "primary"),
        'bg-brand border-brand': props.chipSeverity === "brand",
        'bg-secondary border-secondary': props.chipSeverity === "secondary",
        'bg-success border-success': props.chipSeverity === "success",
        'bg-warning border-warning': props.chipSeverity === "warning",
        'bg-danger border-danger': props.chipSeverity === "danger",
        'bg-info border-info': props.chipSeverity === "info"
      }
    ]
  }
}))

</script>