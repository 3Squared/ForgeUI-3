import { MultiSelectPassThroughMethodOptions } from "primevue/multiselect";

export default {
  multiselect: {
    root: ({ props }: MultiSelectPassThroughMethodOptions) => ({
      class: [
        'form-select d-flex cursor-pointer position-relative w-100',
        {
          'disabled': props.disabled
        }
      ]
    }),
    panel: 'dropdown-menu overflow-y-auto show',
    list: 'list-unstyled mb-0',
    item: 'dropdown-item d-flex cursor-pointer',
    header: 'd-flex dropdown-item',
    headerCheckbox: 'dropdown-item ',
    labelContainer: "w-100 me-2",
    label: "w-100",
    filterContainer: "d-flex w-100 cursor-pointer",
    filterIcon: 'd-none',
    filterInput: "form-control form-control-sm",
    closeButton: 'd-none',
    hiddenInput: 'd-none',
    token: 'badge rounded-pill bg-primary-subtle text-primary d-inline-flex align-items-center border border-primary me-1 pt-1',
    tokenLabel: 'px-2 fs-6 fw-400',
    emptymessage: 'mx-3 my-2',
    trigger: ({ state } : MultiSelectPassThroughMethodOptions) => {
      return {
        class: [
          
          'd-none ms-auto my-auto filter-trigger', {
          'rotate-180': state.overlayVisible 
        }]
      }
      }

  }
}