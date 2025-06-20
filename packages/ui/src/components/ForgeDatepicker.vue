<template>
  <div class="d-flex flex-1">
    <span data-cy="before-slot">
      <slot name="before" />
    </span>

    <div class="position-relative d-flex flex-1">
      <DatePicker v-bind="{...props, ...$attrs}" :pt="pt" v-model="model" @update:model-value="handleChange"
                  @blur="() => handleBlur"
                  :input-class="{'text-truncate': true, 'datepicker-invalid': hasErrors, 'pe-5': props.showIcon && props.modelValue, 'pe-4': (props.showIcon || props.modelValue) && !(props.showIcon && props.modelValue) }" />
      <Icon data-cy="icon" icon="bi:calendar4" v-show="props.showIcon && !props.inline"
            class="position-absolute end-0 top-50 bottom-50 my-auto me-2 bg-white pe-none"
            :class="`${ hasErrors ? 'text-danger-dark' : 'text-muted'}`"
      />
      <Icon data-cy="icon" icon="bi:x" v-show="props.modelValue && !props.inline && !readonly" @click="clear"
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
import { Icon } from "@iconify/vue";
import { DatePickerPassThroughMethodOptions, DatePickerProps } from "primevue/datepicker";
import { Severity } from "../types/forge-types";
import { computed } from "vue";
import { useField } from "vee-validate";

export interface ForgeDatePickerProps extends /* vue-ignore */ Omit<DatePickerProps, "aria-label" | "aria-labelledby"> {
  severity?: Severity;
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
});


const model = defineModel<Date | Date[] | (Date | null)[] | null | undefined>();

const { errors, errorMessage, handleChange, handleBlur, setValue } = useField(() => props.name, undefined, {
  initialValue: model.value
});

const clear = () => {
  setValue(null);
  model.value = null;
};

const hasErrors = computed(() => errors.value.length > 0);

const pt = computed(() => ({
  day: ({ context, props, attrs }: DatePickerPassThroughMethodOptions) => {
    return {
      class: [
        "d-flex justify-content-center align-items-center",
        {
          //When using a range, a disabled date can be both selected and disabled. This logic fights that and also applies the class if a 
          //date across a month boundary is also selected (not prime vue functionality for some reason)
          "text-white": context.selected && (!context.disabled || (context.disabled && context.otherMonth)),
          "opacity-50": context.otherMonth,
          "today": context.today,
          //When using a range, a disabled date can be both selected and disabled. This logic fights that and also applies the class if a 
          //date across a month boundary is also selected (not prime vue functionality for some reason)
          "selected": context.selected && (!context.disabled || (context.disabled && context.otherMonth)),
          //This is used to show which dates should be shows as 'disabled'. The first part of logic is used to only (due to prime vue passing 
          //disabled for otherMonth dates) show the disabled styling for current calendar dates. The second part of logic is used to set the 
          //disabled state for dates out of the min/max date range, as they would also come through the context as disabled dates without knowing why
          "text-grey-300": (context.disabled && !context.otherMonth) || (props.minDate != undefined && new Date(context.date.year, context.date.month, context.date.day) < props.minDate) || (props.maxDate != undefined && new Date(context.date.year, context.date.month, context.date.day) > props.maxDate),
          "fw-500": (context.disabled && !context.otherMonth) || (props.minDate != undefined && new Date(context.date.year, context.date.month, context.date.day) < props.minDate) || (props.maxDate != undefined && new Date(context.date.year, context.date.month, context.date.day) > props.maxDate)
        },
        // Severities
        {
          "date-primary": attrs.severity === undefined || attrs.severity === "primary",
          "date-brand": attrs.severity === "brand",
          "date-secondary": attrs.severity === "secondary",
          "date-success": attrs.severity === "success",
          "date-success-alternate": attrs.severity === "success-alternate",
          "date-warning": attrs.severity === "warning",
          "date-danger": attrs.severity === "danger",
          "date-info": attrs.severity === "info"
        }
      ]
    };
  },
  dayLabel: ({ context }: DatePickerPassThroughMethodOptions) => ({
    class: [
      // Disabled States
      {
        "text-muted": context.disabled
      }
    ]
  }),
  pcClearButton: {
    root: () => ({
      class: [
        "btn ms-auto",
        {
          "btn-link text-primary": (props.severity === undefined || props.severity === "primary"),
          "btn-link text-brand": props.severity === "brand",
          "btn-link text-secondary": props.severity === "secondary",
          "btn-link text-success": props.severity === "success",
          "btn-link text-success-alternate": props.severity === "success-alternate",
          "btn-link text-warning": props.severity === "warning",
          "btn-link text-danger": props.severity === "danger",
          "btn-link text-info": props.severity === "info"
        }
      ]
    })
  },
  pcTodayButton: {
    root: () => ({
      class: [
        "btn",
        {
          "btn-link text-primary": (props.severity === undefined || props.severity === "primary"),
          "btn-link text-brand": props.severity === "brand",
          "btn-link text-secondary": props.severity === "secondary",
          "btn-link text-success": props.severity === "success",
          "btn-link text-success-alternate": props.severity === "success-alternate",
          "btn-link text-warning": props.severity === "warning",
          "btn-link text-danger": props.severity === "danger",
          "btn-link text-info": props.severity === "info"
        }
      ]
    })
  },
  year: ({ context }: DatePickerPassThroughMethodOptions) => {
    return {
      class: [
        "col-3 text-center cursor-pointer py-2",
        {
          "text-primary": (props.severity === undefined || props.severity === "primary") && context.year.value === new Date().getFullYear(),
          "text-brand": props.severity === "brand" && context.year.value === new Date().getFullYear(),
          "text-secondary": props.severity === "secondary" && context.year.value === new Date().getFullYear(),
          "text-success": props.severity === "success" && context.year.value === new Date().getFullYear(),
          "text-success-alternate": props.severity === "success-alternate" && context.year.value === new Date().getFullYear(),
          "text-warning": props.severity === "warning" && context.year.value === new Date().getFullYear(),
          "text-danger": props.severity === "danger" && context.year.value === new Date().getFullYear(),
          "text-info": props.severity === "info" && context.year.value === new Date().getFullYear()
        }
      ]
    };
  },
  month: ({ context }: DatePickerPassThroughMethodOptions) => ({
    class: [
      "col-3 text-center cursor-pointer py-2",
      {
        "text-primary": (props.severity === undefined || props.severity === "primary") && (context.monthIndex + 1) === (new Date().getMonth() + 1),
        "text-brand": props.severity === "brand" && (context.monthIndex + 1) === (new Date().getMonth() + 1),
        "text-secondary": props.severity === "secondary" && (context.monthIndex + 1) === (new Date().getMonth() + 1),
        "text-success": props.severity === "success" && (context.monthIndex + 1) === (new Date().getMonth() + 1),
        "text-success-alternate": props.severity === "success-alternate" && (context.monthIndex + 1) === (new Date().getMonth() + 1),
        "text-warning": props.severity === "warning" && (context.monthIndex + 1) === (new Date().getMonth() + 1),
        "text-danger": props.severity === "danger" && (context.monthIndex + 1) === (new Date().getMonth() + 1),
        "text-info": props.severity === "info" && (context.monthIndex + 1) === (new Date().getMonth() + 1)
      }
    ]
  })
}));

</script>