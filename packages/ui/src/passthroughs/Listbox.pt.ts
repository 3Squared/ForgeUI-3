import { ListboxPassThroughMethodOptions } from "primevue";

export default {
  listbox: {
    root: "border rounded",
    list: "list-unstyled list-group list-group-flush",
    option: ({ context }: ListboxPassThroughMethodOptions) => ({
      class: [
        "list-group-item d-flex cursor-pointer align-items-center gap-1",
        {
          "disabled": context.disabled,
          "active": context.selected
        }
      ]
    }),
    listContainer: "overflow-y-auto",
    emptyMessage: "px-3 py-2",
    pcFilterContainer: { root: "d-flex w-100 cursor-pointer" },
    filterIcon: "d-none",
    pcFilter: { root: "form-control form-control-sm mx-2 mt-2 mb-1" }
  }
};
