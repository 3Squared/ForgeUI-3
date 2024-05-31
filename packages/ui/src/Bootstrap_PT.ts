import { PrimeVuePTOptions } from "primevue/config";
import { SelectButtonPassThroughMethodOptions } from "primevue/selectbutton";
import { TooltipPassThroughMethodOptions } from "primevue/tooltip";
import { MenubarPassThroughMethodOptions } from "primevue/menubar";
import { DataTablePassThroughMethodOptions } from "primevue/datatable";
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
  ...OverlayPanelPT,
  ...ProgressBarPT,
  ...StepsPT,
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
  // More PassThrough options in component file.
  menubar: {
    menu: ({ instance }: MenubarPassThroughMethodOptions) => ({
      class: [
        'navbar-nav navbar-collapse collapse me-auto',
        {
          'show dropdown shadow-sm': instance.mobileActive
        }
      ]
    }),
    menuitem: ({ context }: MenubarPassThroughMethodOptions) => ({
      class: [
        'nav-item cursor-pointer',
        {
          'dropdown': context.item.items.length > 0,
        }
      ]
    }),
    action: ({ context, instance }: MenubarPassThroughMethodOptions) => ({
      class: [
        {
          'active': context.active,
          'nav-link': context.level === 0,
          'dropdown-item': context.level > 0,
          'disabled': context.item.item.disabled,
          'px-3': instance.mobileActive
        }
      ]
    }),
    separator: ({ instance }: MenubarPassThroughMethodOptions) => ({
      class: [
        {
          'border-bottom w-100': instance.mobileActive || instance.level > 0
        }
      ]
    }),
    submenu: ({ instance }) => ({
      class: [
        'dropdown-menu w-fit-content',
        {
          'position-absolute start-100 top-0': instance.level > 1
        }
      ]
    }),
    button: (options: MenubarPassThroughMethodOptions & { state: { queryMatches: boolean }}) => {
      return {
        class: [
          'ms-auto me-3',
          {
            'd-none': !options.state.queryMatches
          }
        ]
      }

    },
    submenuicon: 'ms-1'
  },
  menu: {
    menu: (options) => ({
        class: [
          'dropdown dropdown-menu',
          {
            'show': options.state.overlayVisible
          }
        ]
    }),
    menuitem: () => ({
      class: [
        'dropdown-item cursor-pointer'
      ]
    })
  },
  dataTable: {
    table: (options : DataTablePassThroughMethodOptions) => {
      return {
        class: [
          'table position-relative',
          {
            'table-striped': options.props.stripedRows,
            'table-hover': options.props.rowHover,
            'table-bordered': options.props.showGridlines,
            'table-sm': options.props.size === 'small',
            'table-lg': options.props.size === 'large',
            'opacity-50': options.props.loading
          }
        ]
      }
    },
    bodyRow: (options : DataTablePassThroughMethodOptions) => {
      return {
        class: {
          'table-active': options.context.selected
        }
      }
    },
    rowgrouptoggler: 'btn',
    thead: () => {
      return {
        class: 'sticky-header'
      }
    },
    //@ts-ignore
    tbody: (options ) => {
      return {
        class: {
          'sticky-header': options.props.frozenRow
        }
      }
    },
    loadingOverlay: () => {
      return {
        class: 'table-overlay table-spinner'
      }
    },
    loadingIcon: () => {
      return {
        class: 'spinner-border border-0'
      }
    }
  },
  paginator: {
    root: (options) => {
      return {
        class: [
          'm-auto pagination justify-content-center',
          {
            'opacity-50': options.parent?.props.loading
          }]
      }
    },
    pages: 'd-flex',
    firstPageButton: 'page-link',
    previousPageButton: 'page-link',
    nextPageButton: 'page-link',
    lastPageButton: 'page-link me-2',
    pageButton: ({ context }) => ({
      class: [
        'page-link',
        {
          'active': context.active,
          'disabled': context.disabled
        }
      ]
    })
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
