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
          <Column v-for="column in columns" :key="column.field as string" v-bind="column">
            <template #filter="{ field }">
              <forge-filter-header v-model="filters[field].value" :data-type="column.dataType" :dropdown-options="dropdownOptions" />
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
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader, ForgeFilterHeader, ForgeColumn, ForgeTable, ForgeTableFilter } from "@3squared/forge-ui-3";
import { Playground, usePlayground, CodeBlock } from "@3squared/forge-playground-3";
import Column from "primevue/column";
import { computed, ref } from "vue";
import InputNumber from "primevue/inputnumber";
import { FilterMatchMode } from "primevue/api";
import InputText from "primevue/inputtext";
import { severities } from "../../composables/playgroundOptions";

const columns = [
  { field: "code", header: "Code", sortable: true },
  { field: "name", header: "Name", sortable: true },
  { field: "category", header: "Category", sortable: true },
  { field: "quantity", header: "Quantity", dataType: "numeric", sortable: true }
] as ForgeColumn[];

const filters = ref<ForgeTableFilter>({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  code: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  category: { value: null, matchMode: FilterMatchMode.IN },
  quantity: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const dropdownOptions = ["Fitness", "Clothing"];

const selection = ref();

const products = [
  { code: 1, name: "Blue Shirt", category: "Clothing", quantity: 10 },
  { code: 2, name: "Running Trainers", category: "Fitness", quantity: 3 },
  { code: 3, name: "Watch", category: "Accessories", quantity: 12 },
  { code: 4, name: "Socks", category: "Clothing", quantity: 10 },
  { code: 5, name: "Trousers", category: "Clothing", quantity: 15 }
];

const { options, propVals, config, reset } = usePlayground(
  {
    severity: "undefined",
    legacyPaginationFooter: false,
    total: products.length,
    first: 0,
    pageLinkSize: 5,
    stickyHeader: true,
    showGridlines: false,
    stripedRows: false,
    rowHover: false,
    size: "",
    loading: false,
    scrollable: false,
    scrollHeight: "",
    sortMode: "",
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
    editMode: ""
  },
  {
    severity: { type: "select", options: ["undefined", ...severities] },
    size: { type: "select", options: ["small", "large"] },
    scrollHeight: { disabled: (): boolean => !options.value.scrollable },
    sortMode: { type: "select", options: ["single", "multiple"] },
    removableSort: { disabled: (): boolean => !(options.value.sortMode !== "") },
    selectionMode: { type: "select", options: ["single", "multiple"] },
    dataKey: { type: "select", options: columns.map((column) => column.field) },
    compareSelectionBy: {
      type: "select",
      options: ["equals", "deepEquals"],
      disabled: (): boolean => !(options.value.selectionMode !== "")
    },
    metaKeySelection: { disabled: (): boolean => !(options.value.selectionMode !== "") },
    exportFileName: { disabled: (): boolean => !options.value.showExporterButton },
    csvSeparator: { disabled: (): boolean => !options.value.showExporterButton },
    editMode: { type: "select", options: ["cell", "row"] }
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
      // Required for inline Editing
      <template #editor="{ data, field }">
        <InputText v-model="data[field]" autofocus v-if="field !== 'quantity' && field !== 'code'" />
        <InputNumber v-model="data[field]" autofocus v-else />
      </template>
    </Column>
  </ForgeTable>
`
);

const scriptCode = computed<string>(
  () => `
 <script setup lang="ts">
 import { ForgeColumn } from "@3squared/forge-ui-3";
 import { FilterMatchMode } from "primevue/api";

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
  ]

  // Columns the table should contain. DataType is used to specify the type of filter ForgeFilterHeader should display.
  const columns = [
    { field: 'code', header: 'Code', sortable: true },
    { field: 'name', header: 'Name', sortable: true },
    { field: 'category', header: 'Category', sortable: true },
    { field: 'quantity', header: 'Quantity', dataType: 'numeric', sortable: true }
  ] as ForgeColumn[];
  
  const filters = ref<ForgeFilterHeader>({
    code: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    category: { value: null, matchMode: FilterMatchMode.IN },
    quantity: { value: null, matchMode: FilterMatchMode.EQUALS }
 })
  
 </\script>
`
);
</script>
