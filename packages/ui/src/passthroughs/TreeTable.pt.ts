import { TreeTablePassThroughMethodOptions } from "primevue"

export default {
  // More PT options can be found in the ForgeTable file.
  treetable: {
    root: 'position-relative',
    table: ({props, attrs} : TreeTablePassThroughMethodOptions) => {
      return {
        class: [
          'table position-relative',
          {
            'table-striped': attrs.stripedRows || attrs.stripedRows == "",
            'table-hover': props.rowHover,
            'table-bordered': props.showGridlines,
            'table-sm': props.size === 'small',
            'table-lg': props.size === 'large',
            'opacity-50': props.loading
          }
        ]
      }
    },
    mask: () => {
      return {
        class: 'table-overlay table-spinner'
      }
    }
  },
}