import { PrimeVuePTOptions } from "primevue/config";
import { ButtonPassThroughMethodOptions } from "primevue/button";
import { CheckboxPassThroughMethodOptions } from "primevue/checkbox";
import { DropdownPassThroughMethodOptions } from "primevue/dropdown";
import { InputTextPassThroughMethodOptions } from "primevue/inputtext";
import { MessagePassThroughMethodOptions } from "primevue/message";
import { BadgePassThroughMethodOptions } from "primevue/badge";
import { SelectButtonPassThroughMethodOptions } from "primevue/selectbutton";
import { DialogPassThroughMethodOptions } from "primevue/dialog";
import { TabPanelPassThroughMethodOptions } from "primevue/tabpanel";
import { TooltipPassThroughMethodOptions } from "primevue/tooltip";
import { CalendarPassThroughMethodOptions } from "primevue/calendar";

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
          "btn-outline-warning": props.severity === "warning"  && props.outlined,
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
    badge: ({ props } : ButtonPassThroughMethodOptions) => {
      return {
        class: [
          {
            "button-badge-primary": (props.severity === 'primary' || props.severity === null) && !props.outlined,
            "button-badge-secondary": props.severity === 'secondary' && !props.outlined,
            "button-badge-success": props.severity === 'success' && !props.outlined,
            "button-badge-warning": (props.severity === 'warning' || props.severity === 'warn') && !props.outlined,
            "button-badge-danger": props.severity === 'danger' && !props.outlined,
            'button-badge-info': props.severity === 'info' && !props.outlined
          },
          {
            "button-badge-primary outlined": (props.severity === 'primary' || props.severity === null) && props.outlined,
            "button-badge-secondary outlined": props.severity === 'secondary' && props.outlined,
            "button-badge-success outlined": props.severity === 'success' && props.outlined,
            "button-badge-warning outlined": (props.severity === 'warning' || props.severity === 'warn') && props.outlined,
            "button-badge-danger outlined": props.severity === 'danger' && props.outlined,
            'button-badge-info outlined': props.severity === 'info' && props.outlined
          },
          "rounded-pill ms-2"
        ]
      }
    }
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
  },
  inputtext: {
    root: (options : InputTextPassThroughMethodOptions) => ({
      class: [
        'form-control',
        {
          'form-control-lg': options.props.size?.toLowerCase() == 'large',
          'form-control-sm': options.props.size?.toLowerCase() == 'small'
        }
      ]
    })
  },
  inputmask: {
    root: () => ({
      class: [
        'form-control'
      ]
    })
  },
  textarea: {
    root: () => ({
      class: [
        'form-control',
      ]
    })
  },
  message: {
    root: ({ props }: MessagePassThroughMethodOptions) => ({
      class: [
        'alert',
        {
          'alert-primary': props.severity === 'primary' || props.severity === undefined,
          'alert-secondary': props.severity === 'secondary',
          'alert-success': props.severity === 'success',
          'alert-warning': props.severity === 'warning' || props.severity === 'warn',
          'alert-danger': props.severity === 'danger' || props.severity === 'error',
          'alert-info': props.severity === 'info'
        }
      ]
    }),
    text: () => ({
      class: ['my-auto']
    }),
    wrapper: () => ({
      class: ['d-flex']
    }),
    icon: () => ({
      class: ['alert-icon my-auto me-2 pe-1']
    }),
    closeButton: () => ({
      class: ['ms-auto btn d-flex']
    })
  },
  badge: {
    root: ({ props }: BadgePassThroughMethodOptions) => {
      return {
        class: [
          'badge',
          {
            "badge-primary": props.severity === 'primary' || props.severity === null,
            "badge-secondary": props.severity === 'secondary',
            "badge-success": props.severity === "success",
            "badge-warning": props.severity === "warning" || props.severity === "warn",
            "badge-danger": props.severity === "danger",
            "badge-info": props.severity === "info"
          },
          {
            'badge-xl fs-4 lh-sm': props.size === 'xlarge',
            'badge-lg fs-5 lh-1': props.size === 'large'
          }
        ]
      }
    }
  },
  card: {
    root: () => ({
      class: ['card']
    }),
    title: () => ({
      class: ['card-title h4']
    }),
    subtitle: () => ({
      class: ['card-subtitle mb-2']
    }),
    content: () => ({
      class: ['card-text']
    }),
    body: () => ({
      class: ['card-body']
    }),
    footer: () => ({
      class: ['mt-3']
    }),
    header: () => ({
      class: ['card-header']
    })
  },
  progressspinner: {
    spinner: () => ({
      class: [
        'spinner-border'
      ]
    })
  },
  selectbutton: {
    root: () => ({
      class: ['btn-group']
    }),
    button: ({ context, props,  } : SelectButtonPassThroughMethodOptions) => ({
      class: [
        'btn',
        {
          'btn-primary': context.active,
          'btn-outline-primary': !context.active
        },
        {
          'disabled w-auto': props.disabled || props.optionDisabled === context.option
        }
      ]
      })
  },
  dialog: {
    root: () => ({
      class: ['modal modal-dialog modal-content vw-100']
    }),
    header: () => ({
      class: ['modal-header']
    }),
    headerTitle: () => ({
      class: ['h5 modal-title text-black']
    }),
    content: () => ({
      class: ['modal-body']
    }),
    footer: () => ({
      class: ['modal-footer']
    }),
    headerIcons: () => ({
      class: ['ms-auto']
    }),
    maximizableButton: ({ props }: DialogPassThroughMethodOptions) => ({
      class: [
        {
          "me-2": props.closable
        }
      ]
    }),
    mask: ({ props } : DialogPassThroughMethodOptions) => ({
      class: [{
          'modal-open': props.modal && props.visible
        }]
    })
  },
  tabview: {
    navContainer: () => ({
      class: ['nav nav-tabs position-relative']
    }),
    navContent: () => ({
      class: ['overflow-hidden']
    }),
    nav: () => ({
      class: ['mb-0 list-unstyled d-flex']
    }),
    previousButton: () => ({
      class: ['bg-white btn h-100 position-absolute top-0 d-flex align-items-center justify-content-center']
    }),
    nextButton: () => ({
      class: ['bg-white btn h-100 position-absolute top-0 end-0 d-flex align-items-center justify-content-center']
    })
  },
  tabpanel: {
    root: () => ({
      class: ['nav-item']
    }),
    headerAction: (options : TabPanelPassThroughMethodOptions & { tabpanel : Partial<TabPanelPassThroughMethodOptions>}) => ({
      class: [
        'nav-link cursor-pointer',
        {
          'active': options.tabpanel.context!.active,
          'disabled': options.tabpanel.props!.disabled
        }
      ]
    }),
    content: () => ({
      class: ['p-2']
    })
  },
  directives: {
    tooltip: {
      root: ({ context }: TooltipPassThroughMethodOptions) => ({
        class: [
          'tooltip show position-absolute',
          {
            'bs-tooltip-end ms-1': context?.right || (!context?.right && !context?.left && !context?.top && !context?.bottom),
            'bs-tooltip-start me-1': context?.left,
            'bs-tooltip-top': context?.top,
            'bs-tooltip-bottom': context?.bottom
          }
        ]
      }),
      arrow: () => ({
        class: [
          'tooltip-arrow position-absolute',
        ]
      }),
      text: {
        class: ['tooltip-inner']
      }
    }
  },
  // More PassThrough options in component file.
  progressbar: {
    root: () => ({
      class: ['progress']
    }),
    value: () => ({
      class: ['progress-bar']
    }),
    label: () => ({
      class: ['text-white']
    })
  },
  // More PassThrough options defined in ForgeDatepicker.
  calendar: {
    root: 'd-inline-flex mw-100 relative',
    input: "form-control",
    panel: ({ props }) => ({
      class: [
        "datepicker-panel",
        {
          'shadow border-0 position-absolute': !props.inline
        }
      ]
    }),
    header: 'd-flex align-items-center justify-content-between p-2 border-bottom',
    previousButton: "btn mb-1",
    nextButton: "btn mb-1",
    yearTitle: "btn",
    monthTitle: "btn",
    table: "m-2",
    tableHeaderRow: "p-2",
    weekday: 'ms-2 ps-1',
    monthPicker: 'my-2',
    month: 'btn w-25',
    yearPicker: "my-2",
    year: "btn w-25",
    timePicker: 'd-flex justify-content-center align-items-center border-top p-2',
    separatorContainer: "d-flex flex-column align-items-center px-2",
    separator: "fs-4 mb-2",
    hourPicker: "px-2 fs-5",
    hour: "my-2",
    minutePicker: "px-2 fs-5",
    minute: "my-2",
    secondPicker: "px-2 fs-5",
    second: "my-2",
    buttonbar: ({ props } : CalendarPassThroughMethodOptions) => ({
      class: [
        'p-2',
        {
          'border-top': !props.showTime
        }
      ]
    })
  },
  steps: {
    root: "w-100 mx-2 line",
    menu: 'p-0 m-0 list-unstyled d-flex justify-content-between ',
  },
  divider: {
    root: 'border-bottom m-4 w-100'
  },
  // More PassThrough options in component file.
  chips: {
    root: "d-flex",
    label: "pe-2"
  }
} as PrimeVuePTOptions
