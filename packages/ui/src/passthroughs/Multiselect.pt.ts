import { MultiSelectPassThroughMethodOptions } from "primevue/multiselect";

export default {
  multiselect: {
    root: ({ props }: MultiSelectPassThroughMethodOptions) => ({
      class: [
        'form-control d-flex cursor-pointer',
        {
          'disabled': props.disabled
        }
      ]
    }),
    panel: 'dropdown-menu show',
    list: 'list-unstyled mb-0',
    item: 'dropdown-item d-flex cursor-pointer',
    header: 'd-flex',
    filterContainer: "d-flex",
    filterIcon: 'd-none',
    filterInput: "form-control form-control-sm my-2 mx-3",
    closeButton: 'd-none',
    hiddenInput: 'd-none',
    emptymessage: 'mx-3 my-2'
  }
}