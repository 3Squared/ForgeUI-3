import { TreeTablePassThroughMethodOptions } from "primevue"

export default {
  // More PT options can be found in the ForgeTable file.
  treetable: {
    root: 'position-relative',
    table: ({props, attrs}) => {
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
        class: 'tree-table-overlay tree-table-spinner'
      }
    },
    loadingIcon: ({props}) => {
    return {
      class: [
        'spinner-border border-0',
        {
          'text-brand': props.severity === "brand",
          'text-primary': props.severity === "primary",
          'text-success': props.severity === "success",
          'text-success-alternate': props.severity === "success-alternate",
          'text-warning': props.severity === "warning",
          'text-danger': props.severity === "danger",
          'text-info': props.severity === "info"
        }]
    }
  },
  }
}