<template>
  <DataTable v-model:filters="filters" v-model:selection="selected"
             :global-filter-fields="['code', 'name', 'category', 'quantity']" dataKey="id"
             filterDisplay="row" v-bind="props.dataTableProps" :value="products"
             paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" selection-mode="single">
    <template #header>
      <div class="d-flex justify-content-end my-2">
        <InputText v-model="filters.global.value" placeholder="Keyword Search" class="me-2" />
      </div>
    </template>
    <Column v-bind="props.columnProps" :filter-field="col.field" v-for="col of columns" :key="col.field"
            :field="col.field" :header="col.header">
      <template #filter="{ filterModel, filterCallback }">
        <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                   placeholder="Search by country" />
      </template>
    </Column>
  </DataTable>
  {{ selected}}
</template>

<script setup lang="ts">
import DataTable, { DataTableProps } from "primevue/datatable";
import Column, { ColumnProps } from "primevue/column";
import InputText from "primevue/inputtext";
import { ref } from "vue";
import { FilterMatchMode } from "primevue/api";

export interface TableWrapperProps {
  dataTableProps: DataTableProps,
  columnProps: ColumnProps
}

const props = defineProps<TableWrapperProps>()

const selected = ref([])

const columns = [
  { field: 'code', header: 'Code' },
  { field: 'name', header: 'Name' },
  { field: 'category', header: 'Category' },
  { field: 'quantity', header: 'Quantity' }
];

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  code: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  category: { value: null, matchMode: FilterMatchMode.EQUALS },
  quantity: { value: null, matchMode: FilterMatchMode.EQUALS }
})

const products = [
  { code: 1, name: "Blue Shirt", category: "Clothing", quantity: 10 },
  { code: 2, name: "Running Trainers", category: "Fitness", quantity: 3 },
  { code: 3, name: "Watch", category: "Accessories", quantity: 12 },
  { code: 4, name: "Socks", category: "Clothing", quantity: 10 },
  { code: 5, name: "Trousers", category: "Clothing", quantity: 15 }
]
</script>