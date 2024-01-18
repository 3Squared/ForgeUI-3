<template>
  <DataTable v-model:filters="filters" v-model:frozen-value="lockedRows" v-model:selection="selected" v-model:expandedRows="expandedRows" v-model:editingRows="editingRows"
             :global-filter-fields="['code', 'name', 'category', 'quantity']" dataKey="code"
             filterDisplay="row" v-bind="props.dataTableProps" removable-sort sort-mode="multiple" :value="products"
             paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" editMode="row" @cell-edit-complete="complete"
             scrollable scrollHeight="400px" resizable-columns :reorderableColumns="true" column-resize-mode="expand" show-gridlines>
    <template #header>
      <div class="d-flex justify-content-end my-2">
        <InputText v-model="filters.global.value" placeholder="Keyword Search" class="me-2"/>
      </div>
    </template>
    <Column v-bind="props.columnProps" :filter-field="col.field" sortable v-for="col of columns" :key="col.field" :field="col.field" :header="col.header">
      <template #filter="{ filterModel, filterCallback }">
        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" 
                   placeholder="Search by country" />
      </template>
      <template #editor="{ data, field }">
        <InputText v-model="data[field]" autofocus v-if="field !== 'quantity'"/>
        <InputNumber v-model="data[field]" autofocus v-else />
      </template>
    </Column>
    <Column sortable field="price" header="Price" align-frozen="right" :frozen="true" >
      <template #body="{data}">
        {{ formatCurrency(data.price)}}
      </template>
    </Column>
<!--    <Column :rowEditor="true" style="width: 10%; min-width: 8rem">-->
<!--      <template #body="{ data, frozenRow, index }">-->
<!--        <Button type="button" text size="small"-->
<!--                @click="toggleLock(data, frozenRow, index)">-->
<!--          <Icon :icon="frozenRow ? 'bi:unlock-fill' : 'bi:lock-fill'" />-->
<!--        </Button>-->
<!--      </template>-->
<!--    </Column>-->
    <template #expansion>
      Hello
    </template>
    <ColumnGroup type="footer">
      <Row>
        <Column footer="Totals:" :colspan="3"/>
        <Column :footer="total" />
      </Row>
    </ColumnGroup>
  </DataTable>
</template>

<script setup lang="ts">
import DataTable, { DataTableCellEditCompleteEvent, DataTableProps } from "primevue/datatable";
import ColumnGroup from "primevue/columngroup";
import Row from 'primevue/row'
import Column, { ColumnProps } from "primevue/column";
import InputText from "primevue/inputtext";
import { Icon } from '@iconify/vue'
import { computed, ref } from "vue";
import { FilterMatchMode } from "primevue/api";

export interface TableWrapperProps {
  dataTableProps : DataTableProps,
  columnProps : ColumnProps
}

interface Data {
  code: number;
  name: string;
  category: string;
  quantity: number;
  price: number;
}

const props = defineProps<TableWrapperProps>()

const selected = ref([])

const expandedRows = ref([])

const editingRows = ref([]);

const lockedRows = ref([])


const formatCurrency = (value : number) => {
  return value.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })
}

const toggleLock = (data : Data[], frozen : boolean, index : number) => {
  if(frozen) {
    lockedRows.value = lockedRows.value.filter((_, i) => i !== index)
    //@ts-ignore
    products.value.push(data)
  } 
  else {
    products.value = products.value.filter((_, i) => i !== index)
    //@ts-ignore
    lockedRows.value.push(data)
  }
}

const columns = ref([
  { field: 'code', header: 'Code' },
  { field: 'name', header: 'Name' },
  { field: 'category', header: 'Category' },
  { field: 'quantity', header: 'Quantity' }
]);

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  code: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  category: { value: null, matchMode: FilterMatchMode.EQUALS },
  quantity: { value: null, matchMode: FilterMatchMode.EQUALS }
})

const products = ref<Data[]>([
  { code: 1, name: "Blue Shirt", category: "Clothing", quantity: 10, price: 9.00 },
  { code: 2, name: "Running Trainers", category: "Fitness", quantity: 3, price: 215.00 },
  { code: 3, name: "Watch", category: "Accessories", quantity: 12, price: 255.00 },
  { code: 4, name: "Socks", category: "Clothing", quantity: 10, price: 12.50 },
  { code: 5, name: "Trousers", category: "Clothing", quantity: 15, price: 34.99 }
])

const total = computed(() => products.value.map((s) => s.price).reduce((partialSum, a) => partialSum + a, 0).toString())

const complete = (event : DataTableCellEditCompleteEvent) => {
  const { index, newData } = event
  
  products.value[index] = newData
}
</script>