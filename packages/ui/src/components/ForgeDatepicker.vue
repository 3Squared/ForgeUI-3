<template>
  <Calendar v-bind="{...props}" :pt="pt"/>
</template>

<script setup lang="ts">

import { CalendarPassThroughMethodOptions, CalendarPassThroughOptions, CalendarProps } from "primevue/calendar";
import { Severity } from "../types/forge-types";
import { computed } from "vue";

export interface ForgeDatePickerProps extends /* vue-ignore */ CalendarProps {
  severity: Severity
}

const props = withDefaults(defineProps<ForgeDatePickerProps>(), {
  severity: "primary",
  manualInput: false
})

const pt = computed(() => ({
  dayLabel: ({ context } : CalendarPassThroughMethodOptions) => ({
    class: [
      'btn rounded-circle w-100 py-2',
      {
        'disabled border-0': context.disabled,
        'btn-primary': context.selected && !context.disabled && (props.severity === undefined || props.severity === 'primary'),
        'btn-secondary': context.selected && !context.disabled && props.severity === 'secondary',
        'btn-success': context.selected && !context.disabled && props.severity === 'success',
        'btn-warning': context.selected && !context.disabled && props.severity === 'warning',
        'btn-danger': context.selected && !context.disabled && props.severity === 'danger',
        'btn-info': context.selected && !context.disabled && props.severity === 'info'
      }
    ]
  })
}))

</script>