<template>
  <ForgeTable :total="products.length" :value="products" v-model:filters="filters" filter-display="row" sort-mode="multiple" 
              show-clear-button show-exporter show-column-customiser stripedRows removableSort
              :reorderableColumns="true">
    <template #above-table>
      Some stuff above the table
    </template>
    <Column v-for="column in columns" v-bind="column">
      <template #filter="{ field }">
        <forge-filter-header :column="column" v-model="filters[field].value" :dropdown-options="dropdownOptions" />
      </template>
    </Column>
  </ForgeTable>
</template>

<script setup lang="ts">
import { ForgeTable, ForgeFilterHeader, ForgeColumn } from "@3squared/forge-ui-3";
import Column from "primevue/column";
import { ref } from "vue";
import { FilterMatchMode } from "primevue/api";

const columns = [
  { field: 'code', header: 'Code', sortable: true },
  { field: 'name', header: 'Name', sortable: true },
  { field: 'category', header: 'Category', dataType: 'date', sortable: true },
  { field: 'quantity', header: 'Quantity', dataType: 'numeric', sortable: true }
] as ForgeColumn[];

const filters = ref<ForgeFilterHeader>({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  code: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  category: { value: null, matchMode: FilterMatchMode.IN },
  quantity: { value: null, matchMode: FilterMatchMode.EQUALS }
})

const dropdownOptions = [
    "Fitness",
    "Clothing"
]


const products = [
  { code: 1, name: "Blue Shirt", category: "Clothing", quantity: 10 },
  { code: 2, name: "Running Trainers", category: "Fitness", quantity: 3 },
  { code: 3, name: "Watch", category: "Accessories", quantity: 12 },
  { code: 4, name: "Socks", category: "Clothing", quantity: 10 },
  { code: 5, name: "Trousers", category: "Clothing", quantity: 15 },
  { code: 1, name: "Blue Shirt", category: "Clothing", quantity: 10 },
  { code: 2, name: "Running Trainers", category: "Fitness", quantity: 3 },
  { code: 3, name: "Watch", category: "Accessories", quantity: 12 },
  { code: 4, name: "Socks", category: "Clothing", quantity: 10 },
  { code: 5, name: "Trousers", category: "Clothing", quantity: 15 },
  { code: 1, name: "Blue Shirt", category: "Clothing", quantity: 10 },
  { code: 2, name: "Running Trainers", category: "Fitness", quantity: 3 },
  { code: 3, name: "Watch", category: "Accessories", quantity: 12 },
  { code: 4, name: "Socks", category: "Clothing", quantity: 10 },
  { code: 5, name: "Trousers", category: "Clothing", quantity: 15 }
]
</script>