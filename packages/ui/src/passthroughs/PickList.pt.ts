import { ListboxPassThroughMethodOptions, ListboxPassThroughOptions, PickListPassThroughOptions } from "primevue";
import { MultiSelectPassThroughMethodOptions } from "primevue/multiselect";


export default {
  picklist: {
    root: ' d-flex gap-3',
    pcMoveAllToSourceButton: {root: 'btn btn-sm btn-outline-primary focus-ring '},
    pcMoveAllToTargetButton: {root: 'btn btn-sm btn-outline-primary focus-ring'},
    pcMoveToTargetButton: {root: 'btn btn-sm btn-outline-primary focus-ring'},
    pcMoveToSourceButton: {root: 'btn btn-sm btn-outline-primary focus-ring'},
    pcSourceMoveBottomButton: {root: 'btn btn-sm btn-outline-primary focus-ring'},
    pcSourceMoveDownButton: {root: 'btn btn-sm btn-outline-primary focus-ring'},
    pcSourceMoveUpButton: {root: 'btn btn-sm btn-outline-primary focus-ring'},
    pcSourceMoveTopButton: {root: 'btn btn-sm btn-outline-primary focus-ring'},
    pcTargetMoveBottomButton: {root: 'btn btn-sm btn-outline-primary focus-ring'},
    pcTargetMoveDownButton: {root: 'btn btn-sm btn-outline-primary focus-ring'},
    pcTargetMoveTopButton: {root: 'btn btn-sm btn-outline-primary focus-ring'},
    pcTargetMoveUpButton: {root: 'btn btn-sm btn-outline-primary focus-ring'},
    sourceControls: 'd-flex flex-column gap-1 justify-content-center focus-ring',
    transferControls: 'd-flex flex-column gap-1 justify-content-center focus-ring',
    targetControls: 'd-flex flex-column gap-1 justify-content-center focus-ring',
    pcListbox: {
      root: '',
      list: 'list-unstyled list-group list-group-flush',
      option: ({ context }: ListboxPassThroughMethodOptions) => ({
        class: [
          "list-group-item d-flex cursor-pointer ",
          {
            'disabled': context.disabled,
            'active': context.selected,
          },
        ],
      }),
      listContainer: 'overflow-y-auto border rounded ',
      emptyMessage: 'px-3 py-2',
    },
    sourceListContainer: ' h-100 flex-1',
    targetListContainer: 'h-100 flex-1'
  } as PickListPassThroughOptions,
  
  listbox : {
  }
};
