<template>
  <div class="d-flex">
    <span data-cy="before-slot">
      <slot name="before" />
    </span>

    <div class="position-relative w-100">
      <DatePicker v-bind="{...props, ...$attrs}" :pt="pt" v-model="model" @update:model-value="handleChange"
                @blur="handleBlur" :input-class="{'datepicker-invalid': hasErrors}" />
      <Icon data-cy="icon" icon="bi:calendar4" v-show="props.showIcon"
            class="position-absolute end-0 top-50 bottom-50 my-auto me-2 bg-white" 
            :class="`${ hasErrors ? 'text-danger-dark' : 'text-muted'}`"
      />
      <Icon data-cy="icon" icon="bi:x" v-show="props.modelValue" @click="clear"
            class="position-absolute end-0 top-50 bottom-50 my-auto text-muted cursor-pointer bg-white"
            :class="props.showIcon ? 'datepicker-close-icon' : 'me-2'" />
    </div>


    <span data-cy="after-slot">
      <slot name="after" />
    </span>
  </div>

  <small data-cy="error" class="text-invalid" v-show="hasErrors">{{ errorMessage }}</small>

</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { DatePickerPassThroughMethodOptions, DatePickerProps } from "primevue/datepicker";
import { Severity } from "../types/forge-types";
import { computed } from "vue";
import { useField } from "vee-validate";

export interface ForgeDatePickerProps extends /* vue-ignore */ Omit<DatePickerProps, "aria-label" | "aria-labelledby"> {
  severity?: Severity
}

const props = withDefaults(defineProps<ForgeDatePickerProps>(), {
  name: "",
  severity: "primary",
  selectionMode: "single",
  dateFormat: "dd/mm/yy",
  showOtherMonths: true,
  showIcon: true,
  numberOfMonths: 1,
  showButtonBar: false,
  showOnFocus: true,
  view: "date",
  autoZIndex: true,
  manualInput: true,
  baseZIndex: 0,
  appendTo: "body"
})


const model = defineModel<Date | Date[] | (Date | null)[] | null | undefined>()

const { errors, errorMessage, handleChange, handleBlur, setValue } = useField(() => props.name, undefined, {
  initialValue: model.value
})

const clear = () => {
  setValue(null)
  model.value = null
}

const hasErrors = computed(() => errors.value.length > 0)


const pt = computed(() => ({
  day: ({context} : DatePickerPassThroughMethodOptions) => ({
    class: [
      `text-center date-${ props.severity === undefined ? 'primary' : props.severity }`,
      {
        'cursor-pointer': !context.disabled,
        'pe-none': context.disabled,
        'text-white': context.selected
      },
      // Severities
      {
        'selected': context.selected && !context.disabled,
        'text-primary': !context.selected && context.today && (props.severity === undefined || props.severity === 'primary'),
        'text-brand': !context.selected && context.today && props.severity === 'brand',
        'text-secondary': !context.selected && context.today && props.severity === 'secondary',
        'text-success': !context.selected && context.today && props.severity === 'success',
        'text-warning': !context.selected && context.today && props.severity === 'warning',
        'text-danger': !context.selected && context.today && props.severity === 'danger',
        'text-info': !context.selected && context.today && props.severity === 'info'
      }
    ]
  }),
  dayLabel: ({ context } : DatePickerPassThroughMethodOptions) => ({
    class: [
      // Disabled States
      {
        'text-muted': context.disabled,
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
  },
  year: ({ context }: DatePickerPassThroughMethodOptions) => {
    return {
      class: [
        "col-3 text-center cursor-pointer py-2",
        {
          'text-primary': (props.severity === undefined || props.severity === 'primary') && context.year.value === new Date().getFullYear(),
          'text-brand': props.severity === 'brand' && context.year.value === new Date().getFullYear(),
          'text-secondary': props.severity === 'secondary' && context.year.value === new Date().getFullYear(),
          'text-success': props.severity === 'success' && context.year.value === new Date().getFullYear(),
          'text-warning': props.severity === 'warning' && context.year.value === new Date().getFullYear(),
          'text-danger': props.severity === 'danger' && context.year.value === new Date().getFullYear(),
          'text-info': props.severity === 'info' && context.year.value === new Date().getFullYear()
        }
      ]
    }
  },
  month: ({ context }: DatePickerPassThroughMethodOptions) => ({
    class: [
      "col-3 text-center cursor-pointer py-2",
      {
        'text-primary': (props.severity === undefined || props.severity === 'primary') && (context.monthIndex + 1) === (new Date().getMonth() + 1),
        'text-brand': props.severity === 'brand' && (context.monthIndex + 1) === (new Date().getMonth() + 1),
        'text-secondary': props.severity === 'secondary' && (context.monthIndex + 1) === (new Date().getMonth() + 1),
        'text-success': props.severity === 'success' && (context.monthIndex + 1) === (new Date().getMonth() + 1),
        'text-warning': props.severity === 'warning' && (context.monthIndex + 1) === (new Date().getMonth() + 1),
        'text-danger': props.severity === 'danger' && (context.monthIndex + 1) === (new Date().getMonth() + 1),
        'text-info': props.severity === 'info' && (context.monthIndex + 1) === (new Date().getMonth() + 1)
      }
    ]
  }),
}))

</script>