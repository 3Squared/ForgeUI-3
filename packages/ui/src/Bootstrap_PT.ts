import { PrimeVuePTOptions } from "primevue/config";
import { SelectButtonPassThroughMethodOptions } from "primevue/selectbutton";
import { TooltipPassThroughMethodOptions } from "primevue/tooltip";
import ButtonPT from "./passthroughs/Button.pt.ts";
import CheckboxPT from "./passthroughs/Checkbox.pt.ts";
import DropdownPT from "./passthroughs/Dropdown.pt.ts";
import ColumnPT from "./passthroughs/Column.pt.ts";
import InputPT from "./passthroughs/Input.pt.ts";
import InputMaskPT from "./passthroughs/InputMask.pt.ts";
import TextAreaPT from "./passthroughs/TextArea.pt.ts";
import ChipsPT from "./passthroughs/Chips.pt.ts";
import DialogPT from "./passthroughs/Dialog.pt.ts";
import OverlayPanelPT from "./passthroughs/OverlayPanel.pt.ts";
import MessagePT from "./passthroughs/Message.pt.ts";
import StepsPT from "./passthroughs/Steps.pt.ts";
import TabsPT from "./passthroughs/Tabs.pt.ts";
import DatepickerPT from "./passthroughs/Datepicker.pt.ts";
import MultiselectPT from "./passthroughs/Dropdown.pt.ts";
import ProgressBarPT from "./passthroughs/ProgressBar.pt.ts";
import TablePT from "./passthroughs/Table.pt.ts";
import NavbarPT from "./passthroughs/Navbar.pt.ts";

export default {
  ...ButtonPT,
  ...CheckboxPT,
  ...ChipsPT, 
  ...ColumnPT,
  ...DatepickerPT,
  ...DialogPT,
  ...DropdownPT,
  ...InputPT,
  ...InputMaskPT,
  ...MessagePT,
  ...MultiselectPT,
  ...NavbarPT,
  ...OverlayPanelPT,
  ...ProgressBarPT,
  ...StepsPT,
  ...TablePT,
  ...TabsPT, 
  ...TextAreaPT,
  badge: {
    root: ({ props }) => {
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
      class: ['card-text h-100']
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


  divider: {
    root: 'border-bottom m-4 w-100'
  },

  image: {
    root: "position-relative d-inline-block",
    button: 'preview-button',
    mask: "position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center mask",
    preview: 'preview',
    toolbar: 'position-absolute top-0 end-0 d-flex p-3',
    rotaterightbutton: 'btn text-white',
    rotateleftbutton: 'btn text-white',
    zoomoutbutton: 'btn text-white',
    zoominbutton: 'btn text-white',
    closebutton: 'btn text-white'
  }
} as PrimeVuePTOptions
