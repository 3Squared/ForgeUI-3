<template>
  <Card>
    <template #content>
      <DataView :value="products" dataKey="code" paginator :rows="pageSize" @page="(e) => {console.log(e)}">
        <template #header>
          <div class="d-flex  w-75 m-2">
            <div class="p-1 w-100">
              <ForgeFormField v-model="productType" field-label="Type" type="select" name="product"
                              :options="productOptions" option-label="label" option-value="value"
                              placeholder="Please Select" show-clear field-label-position="left" />
            </div>
            <div class="p-1 w-100">
              <ForgeFormField v-model="pageSize" name="pageSize" type="select" field-label="Page size"
                              :options="sizingOptions" field-label-position="left" label-width-class="w-25" />
            </div>
            <div class="p-1 w-100">
              <ForgeFormField v-model="date" name="pageSize" type="select" field-label="Page size"
                              field-label-position="left" manualInput showTime/>
            </div>
          </div>
        </template>
        <template #list="slotProps">
          <div v-for="(product, index) in slotProps.items" :key="index">
            <div class="border-top p-3 d-flex w-100 justify-content-lg-between">
              <div>
                <div class="p-1">Product: {{ product.name }}</div>
                <div class="p-1">Category: {{ product.category }}</div>
                <div class="p-1">Quantity: {{ product.quantity }}</div>
              </div>
              <div>
                <Button>Test</Button>
              </div>
            </div>
          </div>
        </template>
      </DataView>
    </template>
  </Card>
</template>

<script setup lang="ts">

import Card from "primevue/card";
import DataView from "primevue/dataview";
import Button from "primevue/button";
import { ForgeFormField } from "@3squared/forge-ui-3";
import { ref } from "vue";
import { FilterMatchMode } from "@primevue/core/api";


const pageSize = ref<number>(5);
const productType = ref();
const sizingOptions = ref([5, 10, 15, 20]);
const sortOrder = ref(-1);
const date = ref();
const expandedRowGroups = ref();

const multiselectOptions = ["Fitness", "Clothing"];
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
  "Backpack",
];


const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  code: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  category: { value: null, matchMode: FilterMatchMode.IN },
  quantity: { value: null, matchMode: FilterMatchMode.EQUALS },
  date: { value: null, matchMode: FilterMatchMode.EQUALS },
});

const columns = ref([
  { field: "code", header: "Code", sortable: true },
  { field: "name", header: "Name", dataType: "select", sortable: true },
  {
    field: "category",
    header: "Category",
    dataType: "multiselect",
    sortable: true,
  },
  {
    field: "quantity",
    header: "Quantity",
    dataType: "numeric",
    sortable: true,
  },
  { field: "date", header: "Date", dataType: "date", sortable: true },
]);

const products = [
  {
    code: 1,
    name: "Blue Shirt",
    category: "Clothing",
    quantity: 10,
    date: new Date(),
  },
  {
    code: 2,
    name: "Running Trainers",
    category: "Fitness",
    quantity: 3,
    date: new Date().setDate(new Date().getDate() + 1),
  },
  {
    code: 3,
    name: "Watch",
    category: "Accessories",
    quantity: 12,
    date: new Date().setDate(new Date().getDate() + 2),
  },
  {
    code: 4,
    name: "Socks",
    category: "Clothing",
    quantity: 10,
    date: new Date().setDate(new Date().getDate() + 3),
  },
  {
    code: 5,
    name: "Trousers",
    category: "Clothing",
    quantity: 15,
    date: new Date().setDate(new Date().getDate() + 4),
  },
  {
    code: 6,
    name: "Yoga Mat",
    category: "Fitness",
    quantity: 8,
    date: new Date().setDate(new Date().getDate() + 5),
  },
  {
    code: 7,
    name: "Leather Belt",
    category: "Accessories",
    quantity: 5,
    date: new Date().setDate(new Date().getDate() + 6),
  },
  {
    code: 8,
    name: "Winter Jacket",
    category: "Clothing",
    quantity: 6,
    date: new Date().setDate(new Date().getDate() + 7),
  },
  {
    code: 9,
    name: "Sports Water Bottle",
    category: "Fitness",
    quantity: 20,
    date: new Date().setDate(new Date().getDate() + 8),
  },
  {
    code: 10,
    name: "Baseball Cap",
    category: "Accessories",
    quantity: 7,
    date: new Date().setDate(new Date().getDate() + 9),
  },
  {
    code: 11,
    name: "Gloves",
    category: "Clothing",
    quantity: 11,
    date: new Date().setDate(new Date().getDate() + 10),
  },
  {
    code: 12,
    name: "Fitness Tracker",
    category: "Fitness",
    quantity: 4,
    date: new Date().setDate(new Date().getDate() + 11),
  },
  {
    code: 13,
    name: "Sunglasses",
    category: "Accessories",
    quantity: 9,
    date: new Date().setDate(new Date().getDate() + 12),
  },
  {
    code: 14,
    name: "Jeans",
    category: "Clothing",
    quantity: 13,
    date: new Date().setDate(new Date().getDate() + 13),
  },
  {
    code: 15,
    name: "Backpack",
    category: "Accessories",
    quantity: 6,
    date: new Date().setDate(new Date().getDate() + 14),
  },
];

const productOptions = ref([
  { label: "Fitness", value: "Fitness" },
  { label: "Accessories", value: "Accessories" },
  { label: "Clothing", value: "Clothing" },
]);
</script>