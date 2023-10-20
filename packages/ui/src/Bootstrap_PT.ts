import { PrimeVuePTOptions } from "primevue/config";
import { ButtonPassThroughMethodOptions } from "primevue/button";
import { CheckboxPassThroughMethodOptions } from "primevue/checkbox";
import { DropdownPassThroughMethodOptions } from "primevue/dropdown";

export default {
  button: {
    root: (options: ButtonPassThroughMethodOptions) => ({
      class: [
        'btn',
        {
          "btn btn-link": options.props.link,
          "btn-outline-primary": (options.props.severity === null || options.props.severity === "primary") && options.props.outlined,
          "btn-primary": (options.props.severity === null || options.props.severity === "primary") && !options.props.outlined && !options.props.link,
          "btn-secondary": options.props.severity === "secondary" && !options.props.outlined && !options.props.link,
          "btn-outline-secondary": options.props.severity === "secondary" && options.props.outlined,
          "btn-success": options.props.severity === "success" && !options.props.outlined && !options.props.link,
          "btn-outline-success": options.props.severity === "success" && options.props.outlined,
          "btn-info": options.props.severity === "info" && !options.props.outlined && !options.props.link,
          "btn-outline-info": options.props.severity === "info" && options.props.outlined,
          "btn-warning": options.props.severity === "warning" && !options.props.outlined && !options.props.link,
          "btn-outline-warning": options.props.severity === "warning" && options.props.outlined,
          "btn-danger": options.props.severity === "danger" && !options.props.outlined && !options.props.link,
          "btn-outline-danger": options.props.severity === "danger" && options.props.outlined,
        }
      ]
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
