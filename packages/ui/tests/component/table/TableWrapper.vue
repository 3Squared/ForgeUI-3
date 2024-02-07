<template>
  <ForgeTable v-bind="tableProps" >
    <template #above-table>{{ aboveTableContent }}</template>
    <Column v-bind="column" v-for="column in columns">
      <template #filter="{ field }">
        <forge-filter-header :column="column" v-model="tableProps.filters[field].value" :dropdown-options="dropdownOptions" />
      </template>
    </Column>
    <template #footer>{{ footerContent }}</template>
  </ForgeTable>
</template>

<script setup lang="ts">
import Column, { ColumnProps } from "primevue/column";
//@ts-ignore
import ForgeTable, { ForgeTableProps } from '@/components/table/ForgeTable.vue'
import { ForgeFilterHeader } from "../../../index";

export interface TableWrapperProps {
  tableProps: ForgeTableProps,
  columns: ColumnProps[],
  aboveTableContent?: string,
  footerContent?: string
}

const dropdownOptions = [
    'Column 4',
    'Column Four',
    'Column iiii',
    'Column number 4'
]

const { tableProps, columns, aboveTableContent, footerContent } = defineProps<TableWrapperProps>()
</script>