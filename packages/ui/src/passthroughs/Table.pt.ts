import { DataTablePassThroughMethodOptions } from "primevue/datatable";

export default {
  dataTable: {
    table: (options: DataTablePassThroughMethodOptions) => {
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
    bodyRow: (options: DataTablePassThroughMethodOptions) => {
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
    tbody: (options) => {
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
  }
}