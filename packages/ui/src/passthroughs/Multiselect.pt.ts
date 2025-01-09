import { MultiSelectPassThroughMethodOptions } from "primevue/multiselect";

export default {
  multiselect: {
    root: ({ props }: MultiSelectPassThroughMethodOptions) => ({
      class: [
        "form-select d-flex cursor-pointer position-relative w-100",
        {
          disabled: props.disabled,
        },
      ],
    }),
    overlay: "dropdown-menu overflow-y-auto show",
    list: "list-unstyled mb-0",
    option: "dropdown-item d-flex cursor-pointer",
    header: "d-flex dropdown-item",
    headerCheckbox: "dropdown-item ",
    labelContainer: "w-100 me-2",
    label: "w-100 ellipsis-overflow",
    pcFilterContainer: { root: "d-flex w-100 cursor-pointer" },
    filterIcon: "d-none",
    pcFilter: { root: "form-control form-control-sm" },
    closeButton: "d-none",
    hiddenInput: "d-none",
    emptyMessage: "mx-3 my-2",
    clearIcon: "ms-auto my-auto",
    dropdown: () => ({
      class: "d-none",
    }),
  },
};
