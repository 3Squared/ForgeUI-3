import { PrimeVuePTOptions } from "primevue/config";
import { ButtonPassThroughMethodOptions } from "primevue/button";
import { CheckboxPassThroughMethodOptions } from "primevue/checkbox";
import { DropdownPassThroughMethodOptions } from "primevue/dropdown";

export default {
  button: {
    root: ({ props }: ButtonPassThroughMethodOptions) => ({
      class: [
        'btn',
        // Primary
        {
          "btn-primary text-white": (props.severity === null || props.severity === "primary") && !props.outlined && !props.link && !props.text,
          "btn-outline-primary": (props.severity === null || props.severity === "primary") && props.outlined,
          "text-primary fw-bold btn-text-primary": (props.severity === null || props.severity === "primary") && props.text,
        },
        // Secondary
        {
          "btn-secondary text-white": props.severity === "secondary" && !props.outlined && !props.link && !props.text,
          "btn-outline-secondary": props.severity === "secondary" && props.outlined ,
          "text-secondary fw-bold btn-text-secondary": props.severity === "secondary" && props.text,
        },
        // Success
        {
          "btn-success text-white": props.severity === "success" && !props.outlined && !props.link && !props.text,
          "btn-outline-success": props.severity === "success" && props.outlined,
          "text-success fw-bold btn-text-success": props.severity === "success" && props.text,
        },
        // Warning
        {
          "btn-warning text-white": props.severity === "warning" && !props.outlined && !props.link && !props.text,
          "btn-outline-warning": props.severity === "warning" && props.outlined,
          "text-warning fw-bold btn-text-warning": props.severity === "warning" && props.text
        },
        // Danger
        {
          "btn-danger text-white": props.severity === "danger" && !props.outlined && !props.link && !props.text,
          "btn-outline-danger": props.severity === "danger" && props.outlined,
          "text-danger fw-bold btn-text-danger": props.severity === "danger" && props.text,
        },
        // Info
        {
          "btn-info text-white": props.severity === "info" && !props.outlined && !props.link && !props.text,
          "btn-outline-info": props.severity === "info" && props.outlined,
          "text-info fw-bold btn-text-info": props.severity === "info" && props.text
        },
        // Misc
        {
          "btn-link": props.link,
          "shadow": props.raised,
          "rounded-pill": props.rounded,
          "btn-lg": props.size == "large",
          "btn-sm": props.size == "small"
        }
      ]
    }),
    loadingIcon: () => ({
      class: ['spinner-border spinner-border-sm border-0 me-2']
    }),
    badge: () => ({
      class: ["rounded-pill ms-2 badge"]
    })
  },
  checkbox: {
    root: () => ({
      class: [
        'form-check'
      ]
    }),
    input: (options: CheckboxPassThroughMethodOptions) => ({
      class: [
        'form-check-input px-2 py-2 rounded',
        {
          'bg-primary': options.context.checked,
          'form-check-input__focus': options.state.focused,
        }
      ],
    })
  },
  toast: {
    message: () => ({
      class: ['toast-container w-100 position-relative'],
    }),
    content: () => ({
      class: ['toast-body d-flex align-items-center gap-2']
    }),
    container: () => ({
      class: ['toast show']
    }),
    buttonContainer: () => ({
      class: ['ms-auto']
    }),
    closeButton: () => ({
      class: ['btn-close']
    }),
    closeIcon: () => ({
      class: 'd-none'
    }),
    summary: () => ({
      class: ['toast-body']
    }),
    icon: () => ({
      class: ['me-2']
    }),
  },
  dropdown: {
    root: (options: DropdownPassThroughMethodOptions) => ({
        class: [
          {
            "rounded-0 rounded-top": options.state.overlayVisible,
            "disabled": options.instance.disabled,
            'form-control': !options.instance.disabled
          },
          'd-flex cursor-pointer']
    }),
    input: () => ({
      class: ['fs-6']
    }),
    trigger: (options: DropdownPassThroughMethodOptions) => ({
      class: {
        'ms-2': options.props.showClear,
        'ms-auto': !options.props.showClear || !options.props.modelValue
      }
    }),
    loadingIcon: () => ({
      class: ['spinner-border spinner-border-sm border-0']
    }),
    clearIcon: () => ({
      class: ['ms-auto my-auto']
    }),
    list: () => ({
      class: ['border list-unstyled rounded-bottom']
    }),
    item: (options : DropdownPassThroughMethodOptions) => ({
      class: [
        'px-2 py-1 cursor-pointer item',
        {
          'bg-primary text-white': options.context.selected
        }
      ]
    }),
    itemGroup: () => ({
      class: ['d-flex px-2 py-1 fw-bold']
    }),
    filterContainer: () => ({
      class: ['d-flex border-start border-end p-2 bg-light']
    }),
    filterIcon: () => ({
      class: ['my-auto ms-3 me-2']
    }),
    filterInput: () => ({
      class: ['form-control']
    })
  }
} as PrimeVuePTOptions
