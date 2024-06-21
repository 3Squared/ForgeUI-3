<template>
  <span data-cy="before-slot">
    <slot name="before" />
  </span>
  
  <Calendar v-bind="{...props, ...$attrs}" :pt="pt" />
  <Icon data-cy="icon" icon="bi:calendar3" width="32" height="32" v-show="props.showIcon" class="ps-2" :class="props.severity == undefined ? 'text-primary' : `text-${props.severity}`"/>
  
  <span data-cy="after-slot">
     <slot name="after" />
  </span>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { CalendarPassThroughMethodOptions, CalendarProps } from "primevue/calendar";
import { Severity } from "../types/forge-types";
import { computed } from "vue";

export interface ForgeDatePickerProps extends /* vue-ignore */ Omit<CalendarProps, "aria-label" | "aria-labelledby"> {
  severity?: Severity
}

const props = withDefaults(defineProps<ForgeDatePickerProps>(), {
  severity: "primary",
  selectionMode: "single",
  dateFormat: "dd/mm/yy",
  showOtherMonths: true,
  showIcon: true,
  numberOfMonths: 1,
  showButtonBar: false,
  view: "date",
  autoZIndex: true,
  manualInput: true,
  baseZIndex: 0,
  appendTo: "body"
})

const pt = computed(() => ({
  dayLabel: ({ context } : CalendarPassThroughMethodOptions) => ({
    class: [
      'btn rounded-circle w-100 py-2',
      {
        'disabled border-0': context.disabled,
        'btn-primary': context.selected && !context.disabled && (props.severity === undefined || props.severity === 'primary'),
        'btn-brand': context.selected && !context.disabled && props.severity === 'brand',
        'btn-secondary': context.selected && !context.disabled && props.severity === 'secondary',
        'btn-success': context.selected && !context.disabled && props.severity === 'success',
        'btn-warning': context.selected && !context.disabled && props.severity === 'warning',
        'btn-danger': context.selected && !context.disabled && props.severity === 'danger',
        'btn-info': context.selected && !context.disabled && props.severity === 'info'
      }
    ]
  }),
  clearButton: {
    root: () => ({
      class: [
        'btn ms-auto',
        {
          'btn-link text-primary': (props.severity === undefined || props.severity === 'primary'),
          'btn-link text-brand': props.severity === 'brand',
          'btn-link text-secondary': props.severity === 'secondary',
          'btn-link text-success': props.severity === 'success',
          'btn-link text-warning': props.severity === 'warning',
          'btn-link text-danger': props.severity === 'danger',
          'btn-link text-info': props.severity === 'info'
        }
      ]
    })
  },
  todayButton: {
    root: () => ({
      class: [
        'btn',
        {
          'btn-link text-primary': (props.severity === undefined || props.severity === 'primary'),
          'btn-link text-brand': props.severity === 'brand',
          'btn-link text-secondary': props.severity === 'secondary',
          'btn-link text-success': props.severity === 'success',
          'btn-link text-warning': props.severity === 'warning',
          'btn-link text-danger': props.severity === 'danger',
          'btn-link text-info': props.severity === 'info'
        }
      ]
    })
  }
}))

</script>