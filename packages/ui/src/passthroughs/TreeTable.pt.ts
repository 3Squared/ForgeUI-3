import { TreeTablePassThroughOptions, TreeTablePassThroughOptionType } from "primevue/treetable";
import { PaginatorPassThroughMethodOptions } from "primevue/paginator";
import { ColumnContext } from "primevue";

export default {
  // More PT options can be found in the ForgeTable file.
  treetable: {
    root: 'position-relative',
    table: (options) => {
      return {
        class: [
          'table position-relative blah',
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
    nodeToggleButton: "btn",
    row: ({ props, instance }) => [
        {
            'test': true,
            'parent-node': instance.node.hasOwnProperty("children")
        }
    ]
  }
}