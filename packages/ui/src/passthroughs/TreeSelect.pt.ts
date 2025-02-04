import { TreeSelectPassThroughOptions } from "primevue/treeselect";
import { SelectPassThroughMethodOptions } from "primevue/select";
import { TreePassThroughMethodOptions } from "primevue/tree";

export default {
  treeSelect: {
    root: ({ props }: SelectPassThroughMethodOptions<any>) => {
      return {
        class: [
          'form-select d-flex cursor-pointer position-relative',
          {
            'disabled': props.disabled
          }
        ]
      }
    },
    dropdown: 'd-none',
    panel: 'dropdown-menu overflow-y-auto show',
    labelContainer: "w-100 me-2",
    label: "w-100 d-flex ellipsis-overflow",
    clearIcon: "ms-auto my-auto",
    header: 'p-2 w-100',

    pcTree: {
      node: 'mx-1',
      nodeToggleButton: ({ context }: TreePassThroughMethodOptions) => {
        return {
          class: [
            'btn py-0 px-1',
            {
              'invisible': context.leaf
            }
          ]
        }
      },
      rootChildren: 'd-flex flex-column m-0 list-unstyled',
      nodeChildren: 'list-unstyled ps-3 mb-1 me-1',
      nodeContent: ({ context }: TreePassThroughMethodOptions) => {
        return {
          class: [
            'dropdown-item d-flex text-wrap align-items-center mb-1',
            {
              'cursor-pointer': context.node.selectable || context.node.selectable == null,
              'bg-primary-subtle border border-primary rounded-2': context.selected
            }
          ]
        }
      },
      pcFilterIconContainer: {
        root: {
          class: ['position-absolute bottom-0 end-0 me-3'],
          style: "top: 8%;"
        }
      },
      pcFilterInput: { root: "d-flex cursor-pointer form-control form-control-sm w-100" },
      pcFilterContainer: { root: "dropdown-item" },
      filterIcon: "d-none",
    }
  } as TreeSelectPassThroughOptions
}