import { DataTablePassThroughMethodOptions } from "primevue/datatable";
import { PaginatorPassThroughMethodOptions } from "primevue/paginator";

export default {
  // More PT options can be found in the ForgeTable file.
  dataTable: {
    datatable: 'position-relative',
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
    //@ts-ignore
    tbody: (options) => {
      return {
        class: {
          'sticky-header': options.props.frozenRow
        }
      }
    },
    mask: () => {
      return {
        class: 'table-overlay table-spinner'
      }
    }
  },
  pcPaginator: {
    root: (options : PaginatorPassThroughMethodOptions<any>) => {
      return {
        class: [
          'm-auto pagination justify-content-center',
          {
            'opacity-50': options.parent?.props.loading
          }]
      }
    },
    pages: 'd-flex',
    first: 'page-link cursor-pointer',
    prev: 'page-link cursor-pointer',
    next: 'page-link cursor-pointer',
    last: 'page-link me-2 cursor-pointer',
    page: ({ context } : PaginatorPassThroughMethodOptions<any>) => ({
      class: [
        'page-link cursor-pointer',
        {
          'active': context.active,
          'disabled': context.disabled
        }
      ]
    })
  }
}