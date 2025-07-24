import { ColumnPassThroughMethodOptions, ColumnProps } from "primevue/column";

export default {
  column: {
    pcSortBadge: (options: ColumnPassThroughMethodOptions) => {
      return {
        root: {
          class: [
            'ms-2 my-auto cursor-pointer',
            {
              // Remove the badge, if one of the (2) sort columns is the row grouping, as it looks like only one column is sortable. Will show numbers if not only 2 sort values
              'd-none': options.parent.state.d_multiSortMeta != undefined && options.parent.state.d_multiSortMeta.length == 2 && options.parent.state.d_multiSortMeta.some((sort) => {return sort.field == options.parent.props.groupRowsBy})            }
          ]
        }
      }
    },
    headerCell: (options: any) => {
      return {
        class: [
          'align-top',
          {
            'cursor-move': options.props?.reorderableColumns,
            'position-sticky': options.column?.context.frozen !== undefined || options.column?.context.frozen || options.column?.context.frozen === '',
            'overflow-hidden position-relative bg-clip-padding': options.column?.context.resizable,
            'align-bottom': options.column.props?.rowspan > 1,
          }],
      }
    },
    pcRowEditorInit: 'btn',
    rowToggleButton: 'btn',
    nodeToggleButton: "btn btn-sm",
    columnResizer: {
      class: 'position-absolute top-0 end-0 m-0 h-100 p-0 cursor-resize border border-transparent'
    },
    pcRowEditorSave: 'btn',
    pcRowEditorCancel: 'btn',
    bodyCell: (options: ColumnPassThroughMethodOptions & { props: { resizableColumns: boolean }, column: { props: { frozen: boolean | '', expander: boolean | undefined } } }) => {
      return {
        class: {
          'expander-cell': options.column.props?.expander,
          'position-sticky': options.column.props?.frozen !== undefined,
          'overflow-hidden text-nowrap': options.parent.props.resizableColumns
        }
      }
    },
    rowreordericon: 'cursor-move',
    pcColumnFilterButton: ({ props }: ColumnProps & { props: { type: string } }) => {
      return {
        class: ['btn',
          {
            'd-none': props.type !== 'text' && props.type !== 'numeric' && props.type !== 'date'
          }],
      }
    },
    pcColumnFilterClearButton: ({ props }: ColumnPassThroughMethodOptions & { props: { filters: object } }) => {
      return {
        class: [
          'btn',
          {
            'd-none': props.filters[props.field] ? props.filters[props.field]?.value === null : false
          }
        ]
      }
    },
    filterOverlay: {
      class: [
        'show dropdown-menu'
      ]
    },
    filterRowItems: {
      class: [
        'list-unstyled'
      ]
    },
    filter: 'd-flex w-100',
    filterElementContainer: "w-100",
    filterConstraintList: 'ps-0',
    filterConstraint: (options: ColumnPassThroughMethodOptions) => {
      return {
        class: [
          'dropdown-item cursor-pointer',
          {
            //@ts-ignore
            'active': options.column.context?.highlighted
          }
        ]
      }
    },
    filterConstraintSeparator: {
      class: [
        'dropdown-divider'
      ]
    },
    columnHeaderContent: (options: any) => {
      return {
        class: [
          'd-flex',
          {
            'justify-content-center': options.column.props?.colspan > 1
          }
        ]
      }
    },
    columnTitle: "text-break",
    sort: 'd-flex ms-auto cursor-pointer table-sort-icon',
    pcRowCheckbox: (options: any) => {
      return {
        class: [
          'form-check-input px-2 py-2 rounded position-relative',
          {
            'bg-primary': options.props.checked,
            'form-check-input__focus': options.state.focused,
          }
        ]
      }
    },
    pcRowRadiobutton: (options: any) => {
      return {
        class: [
          'form-check-input',
          {
            'disabled': options.props.disabled
          }
        ]
      }
    },

  }
}