<template>
  <TreeTable :pt="treetablePT" v-bind="{...props, ...$attrs }">

  </TreeTable>
</template>

<script setup lang="ts">
import { TreeTable, TreeTablePassThroughMethodOptions, TreeTableProps } from 'primevue';
import { computed, onMounted } from 'vue';


export interface ForgeTreeTableProps extends TreeTableProps {
  parentExpanderFullRow?: boolean,
  totalColumns?: number
}

const props = withDefaults(
  defineProps<ForgeTreeTableProps>(), 
  {
    parentExpanderFullRow: false,
    totalColumns: 1
  })

const treetablePT = computed(() => ({
    root: 'position-relative',
    table: (options: TreeTablePassThroughMethodOptions) => {
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
    nodeToggleButton: "btn",
    row: ({ props, instance }) => [
        {
            'test': true,
            'parent-node-row': instance.node.hasOwnProperty("children")
        }
    ],
    column: ({ props, instance }) => [
        {
            'test': true,
            'expander-cell': instance.node.hasOwnProperty("children")
        }
    ],
    }));

  onMounted(() => {
    const rowExpander = Array.from(
      document.querySelectorAll(".parent-node-row td.expander-cell")
    );
    console.log(rowExpander);
    setTimeout(
      () =>
      rowExpander.forEach((rowExpander) => rowExpander.setAttribute("colspan", props.totalColumns.toString())),
      100
    );
  })

</script>