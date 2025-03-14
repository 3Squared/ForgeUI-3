import { TreePassThroughOptions, TreePassThroughMethodOptions } from "primevue/tree";

export default {
  tree: {
      node: 'm-1',
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
      nodeChildren: 'list-unstyled ps-3 me-1',
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
  } as TreePassThroughOptions
}