import { ColumnPassThroughMethodOptions, ColumnProps } from "primevue/column";

export default {
  column: {
    pcSortBadge: 'ms-2 my-auto cursor-pointer',
    headerCell: (options: ColumnPassThroughMethodOptions & { props: { reorderableColumns: boolean }, column: { context: { frozen: boolean | '', resizable: boolean } } }) => {
      return {
        class: [
          'align-top',
          {
          'cursor-move': options.props.reorderableColumns,
          'position-sticky': options.column?.context.frozen !== undefined || options.column?.context.frozen || options.column?.context.frozen === '',
          'overflow-hidden position-relative bg-clip-padding': options.column?.context.resizable
        }],
      }
    },
    pcRowEditorInit: 'btn',
    rowToggleIcon: {
      class: 'btn'
    },
    columnResizer: {
      class: 'position-absolute top-0 end-0 m-0 h-100 p-0 cursor-resize border border-transparent'
    },
    pcRowEditorSave: 'btn',
    pcRowEditorCancel: 'btn',
    bodyCell: (options: ColumnPassThroughMethodOptions & { props: { resizableColumns: boolean }, column: { props: { frozen: boolean | '' } } }) => {
      return {
        class: {
          'position-sticky': options.column.props?.frozen !== undefined,
          'overflow-hidden text-nowrap': options.props.resizableColumns
        }
      }
    },
    rowreordericon: 'cursor-move',
    filterMenuButton: ({ props }: ColumnProps & { props: { type: string } }) => {
      return {
        class: ['btn',
          {
            'd-none': props.type !== 'text' && props.type !== 'numeric' && props.type !== 'date'
          }]
      }
    },
    // headerFilterClearButton: ({ props } : ColumnPassThroughMethodOptions & { props: { filters: object}}) => {
    //   return {
    //     class: [
    //       'btn',
    //       { 
    //         'd-none': props.filters[props.field] ? props.filters[props.field]?.value === null : false
    //       }
    //     ]
    //   }
    // },
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
    filterConstraint: (options : ColumnPassThroughMethodOptions) => {
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
    columnHeaderContent: 'd-flex',
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