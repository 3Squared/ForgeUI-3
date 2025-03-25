<template>
  <div>
    <ForgePageHeader title="Table" />
    <p>
      Further documentation and examples for
      <strong>DataTable</strong>
      ,
      <strong>Column</strong>
      ,
      <strong>ColumnGroup</strong>
      and
      <strong>Row</strong>
      can be found in the
      <a class="link" target="_blank" href="https://primevue.org/datatable/"><strong>PrimeVue documentation</strong></a>
      .
    </p>
    <Playground :code="componentCode" :options="options" :config="config" @reset="reset">
      <template #component>
        <component :is="ForgeTable" v-bind="options" v-model:filters="filters" v-model:selection="selection" :value="products">
          <template #column-customiser>
            <ForgeColumnCustomiser v-model="columns" />
          </template>
          <Column v-for="column in selectedColumns" :key="column.field as string" sortable v-bind="column">
            <template #filter="{ field }">
              <forge-filter-header
                v-if="filters[field]"
                v-model="filters[field].value"
                :data-type="column.dataType"
                :dropdown-options="column.dataType === 'multiselect' ? multiselectOptions : dropdownOptions"
                :placeholder="column.header"
              />
            </template>
            <template #editor="{ data, field }">
              <InputText v-if="field !== 'quantity' && field !== 'code'" v-model="data[field]" autofocus />
              <InputNumber v-else v-model="data[field]" autofocus />
            </template>
          </Column>
        </component>
      </template>
    </Playground>
    To get you started, here is the script code for this documentation page!
    <CodeBlock :code="scriptCode" />
    In order to use the Column Customiser, you can use the following code
    <CodeBlock :code="columnCustomiserCode" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { ForgePageHeader, ForgeColumnCustomiser, ForgeFilterHeader, ForgeTable } from "@3squared/forge-ui-3";
import { Playground, usePlayground, CodeBlock } from "@3squared/forge-playground-3";
import { severities } from "../../composables/playgroundOptions";
import Column from "primevue/column";
import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";
import { FilterMatchMode } from "@primevue/core/api";
import type { ForgeColumn } from "@3squared/forge-ui-3/src/types/forge-types";
import { products } from "../examples/data/exampleTableData";

const selectedColumns = computed<ForgeColumn[]>(() => {
  return columns.value.filter((s) => s.selected);
});

const columns = ref<ForgeColumn[]>([
  { field: "code", header: "Code", sortable: true, selected: true },
  { field: "name", header: "Name", dataType: "select", sortable: true, selected: true },
  {
    field: "category",
    header: "Category",
    dataType: "multiselect",
    sortable: true,
    selected: true
  },
  {
    field: "quantity",
    header: "Quantity",
    dataType: "numeric",
    sortable: true,
    selected: true
  },
  { field: "date", header: "Date", dataType: "date", sortable: true }
]);

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  code: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  category: { value: null, matchMode: FilterMatchMode.IN },
  quantity: { value: null, matchMode: FilterMatchMode.EQUALS },
  date: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const multiselectOptions = ["Fitness", "Clothing", "Accessories"];
const dropdownOptions = [
  "Blue Shirt",
  "Running Trainers",
  "Watch",
  "Socks",
  "Trousers",
  "Yoga Mat",
  "Leather Belt",
  "Winter Jacket",
  "Sports Water Bottle",
  "Baseball Cap",
  "Gloves",
  "Fitness Tracker",
  "Sunglasses",
  "Jeans",
  "Backpack"
];

const perPageOptions = ref([5, 10, 20, 50, 100]);
const selection = ref();

const { options, propVals, config, reset } = usePlayground(
  {
    severity: "undefined",
    legacyPaginationFooter: false,
    totalRecords: products.length,
    first: 0,
    pageLinkSize: 5,
    stickyHeader: true,
    showGridlines: false,
    stripedRows: false,
    rowHover: false,
    size: "",
    emptyMessage: "",
    loading: false,
    scrollable: false,
    scrollHeight: "",
    sortMode: "single",
    removableSort: false,
    showExporterButton: false,
    exportFileName: "download",
    csvSeparator: ",",
    showClearButton: false,
    dataKey: "code",
    selectionMode: "",
    compareSelectionBy: "deepEquals",
    metaKeySelection: false,
    reorderableColumns: false,
    editMode: "",
    paginator: true,
    perPage: 5
  },
  {
    severity: { type: "select", options: ["undefined", ...severities] },
    size: { type: "select", options: ["small", "large"] },
    scrollHeight: { disabled: (): boolean => !options.value.scrollable },
    sortMode: { type: "select", options: ["single", "multiple"] },
    removableSort: {
      disabled: (): boolean => !(options.value.sortMode !== "")
    },
    selectionMode: { type: "select", options: ["single", "multiple"] },
    dataKey: {
      type: "select",
      options: columns.value.map((column) => column.field)
    },
    compareSelectionBy: {
      type: "select",
      options: ["equals", "deepEquals"],
      disabled: (): boolean => !(options.value.selectionMode !== "")
    },
    metaKeySelection: {
      disabled: (): boolean => !(options.value.selectionMode !== "")
    },
    exportFileName: {
      disabled: (): boolean => !options.value.showExporterButton
    },
    csvSeparator: {
      disabled: (): boolean => !options.value.showExporterButton
    },
    editMode: { type: "select", options: ["cell", "row"] },
    perPage: {type: "select", options: perPageOptions.value}
  }
);

const componentCode = computed<string>(
  () => `
  <ForgeTable :value="tableData" v-model:filters="tableFilters"${propVals.value.length > 0 ? " " + propVals.value.join(" ") : ""}> 
   <Column v-for="column in columns" v-bind="column">
      // Required for Filters
      <template #filter="{ field }">
        <forge-filter-header :data-type="column.dataType" v-model="filters[field].value" :dropdown-options="dropdownOptions" />
      </template>
    </Column>
  </ForgeTable>
`
);

const scriptCode = computed<string>(
  () => `
 <script setup lang="ts">
 import { ForgeFilterHeader, ForgeTable } from "@3squared/forge-ui-3";
 import { FilterMatchMode } from "@primevue/core/api";
 import { ref } from 'vue'

  // Data to appear in table, properties must match the 'field' property in columns array unless specified otherwise.
  const tableData = [
    { code: 1, name: "Blue Shirt", category: "Clothing", quantity: 10 },
    { code: 2, name: "Running Trainers", category: "Fitness", quantity: 3 },
    { code: 3, name: "Watch", category: "Accessories", quantity: 12 },
  ]
  
  // Dropdown Filter options
  const dropdownOptions = [
    "Fitness",
    "Clothing"
    "Accessories""
  ]

  // Columns the table should contain. DataType is used to specify the type of filter ForgeFilterHeader should display.
  const columns = [
    { field: "code", header: "Code", sortable: true },
    { field: "name", header: "Name", sortable: true },
    { field: "category", header: "Category", dataType: "multiselect", sortable: true },
    { field: "quantity", header: "Quantity", dataType: "numeric", sortable: true }
  ];
  
  const tableFilters = ref({
    code: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    category: { value: null, matchMode: FilterMatchMode.IN },
    quantity: { value: null, matchMode: FilterMatchMode.EQUALS }
 })
  
 </\script>
`
);

const columnCustomiserCode = computed<string>(
  () => `
  <template>
    <ForgeTable :value="tableData" v-model:filters="tableFilters"${propVals.value.length > 0 ? " " + propVals.value.join(" ") : ""}> 
       <template #column-customiser>
         <ForgeColumnCustomiser v-model="columns" />
      </template>
      <Column v-for="column in selectedColumns" :key="column.field as string" sortable v-bind="column">
        // Required for Filters
        <template #filter="{ field }">
          // The v-if will check if the column actually exists, this is important when using the column customiser.
          <ForgeFilterHeader v-if="filters[field]" :data-type="column.dataType" v-model="filters[field].value" :dropdown-options="dropdownOptions" />
        </template>
      </Column>
    </ForgeTable>
  </template>
  
  <script setup lang="ts">
   import { ForgeColumn, ForgeFilterHeader, ForgeColumnCustomiser } from "@3squared/forge-ui-3";
   import { FilterMatchMode } from "@primevue/core/api";
   import { ref } from 'vue'

   const selectedColumns = computed<ForgeColumn[]>(() => {
     return columns.value.filter((s) => s.selected);
   });
   
   // Data to appear in table, properties must match the 'field' property in columns array unless specified otherwise.
   const tableData = [
     { code: 1, name: "Blue Shirt", category: "Clothing", quantity: 10 },
     { code: 2, name: "Running Trainers", category: "Fitness", quantity: 3 },
     { code: 3, name: "Watch", category: "Accessories", quantity: 12 },
   ]
  
   // Dropdown Filter options
   const dropdownOptions = [
     "Fitness",
     "Clothing",
     "Accessories"
   ]

   // Columns the table should contain. DataType is used to specify the type of filter ForgeFilterHeader should display.
   // IT IS IMPORTANT THAT THE COLUMNS IS A REF, This allows the column customsier to manipulate the columns array.
   // Displayed columns are controlled using 'selected'
   const columns = ref<ForgeColumn[]>([
      { field: "code", header: "Code", sortable: true, selected: true },
      { field: "name", header: "Name", dataType: "select", sortable: true, selected: true },
      {
        field: "category",
        header: "Category",
        dataType: "multiselect",
        sortable: true,
        selected: true
      },
      {
        field: "quantity",
        header: "Quantity",
        dataType: "numeric",
        sortable: true,
        selected: true
      },
      { field: "date", header: "Date", dataType: "date", sortable: true }
   ]);
  
   const tableFilters = ref({
     code: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
     name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
     category: { value: null, matchMode: FilterMatchMode.IN },
     quantity: { value: null, matchMode: FilterMatchMode.EQUALS },
     date: { value: null, matchMode: FilterMatchMode.EQUALS }
   })
  </\script>
`
);
</script>
