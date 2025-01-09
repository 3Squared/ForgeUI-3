<template>
  <div>
    <ForgePageHeader title="Data View" />
    <Playground :options="options" :code="code" :config="config" @reset="reset">
      <template #component>
        <component :is="DataView" v-bind="options" :value="products" class="w-100">
          <template #header>
            <div class="d-flex w-75 m-2">
              <div class="p-1 w-100">
                <ForgeFormField
                  v-model="productType"
                  field-label="Type"
                  type="select"
                  name="product"
                  :options="productOptions"
                  option-label="label"
                  option-value="value"
                  placeholder="Please Select"
                  show-clear
                  field-label-position="left"
                />
              </div>
              <div class="p-1 w-100">
                <ForgeFormField
                  v-model="pageSize"
                  name="pageSize"
                  type="select"
                  field-label="Page size"
                  :options="sizingOptions"
                  field-label-position="left"
                  label-width-class="w-25"
                />
              </div>
            </div>
          </template>
          <template #list="slotProps">
            <div v-for="(product, index) in slotProps.items" :key="index">
              <div class="border-top p-3 d-flex w-100 justify-content-lg-between">
                <div>
                  <div class="h3">{{ product.name }}</div>
                  <div class="p-1">Category: {{ product.category }}</div>
                  <div class="p-1">Quantity: {{ product.quantity }}</div>
                </div>
                <div>
                  <Button @click="triggerToast">Add</Button>
                </div>
              </div>
            </div>
          </template>
        </component>
      </template>
    </Playground>
  </div>
</template>

<script setup lang="ts">
import { ForgeFormField, ForgePageHeader } from "@3squared/forge-ui-3";
import DataView from "primevue/dataview";
import { Playground, usePlayground } from "@3squared/forge-playground-3";
import { computed, ref } from "vue";
import Button from "primevue/button";
import { products } from "../examples/data/exampleTableData";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const triggerToast = () => {
  toast.add({ severity: "success", summary: "Well done on clicking this!" });
};

const sizingOptions = ref([3, 10, 15, 20]);
const pageSize = ref<number>(3);
const productType = ref();

const productOptions = ref([
  { label: "Fitness", value: "Fitness" },
  { label: "Accessories", value: "Accessories" },
  { label: "Clothing", value: "Clothing" }
]);

const { options, propVals, config, reset } = usePlayground(
  {
    dataKey: "code",
    rows: pageSize,
    paginator: true
  },
  {}
);

const code = computed(
  () => `<template>
 <DataView ${propVals.value.length > 0 ? " " + propVals.value.join(" ") : ""}>
    <template #header>
      <div class="d-flex w-75 m-2">
        <div class="p-1 w-100">
          <ForgeFormField 
             v-model="productType"
             field-label="Type"
             type="select"
             name="product"
             :options="productOptions"
             option-label="label"
             option-value="value"
             placeholder="Please Select"
             show-clear
             field-label-position="left"
          />
        </div>
        <div class="p-1 w-100">
          <ForgeFormField
              v-model="pageSize"
              name="pageSize"
              type="select"
              field-label="Page size"
              :options="sizingOptions"
              field-label-position="left"
              label-width-class="w-25"
          />
        </div>
      </div>
    </template>
    <template #list="slotProps">
      <div v-for="(product, index) in slotProps.items" :key="index">
        <div class="border-top p-3 d-flex w-100 justify-content-lg-between">
          <div>
            <div class="h3">{{ product.name }}</div>
            <div class="p-1">Category: {{ product.category }}</div>
            <div class="p-1">Quantity: {{ product.quantity }}</div>
          </div>
          <div>
            <Button @click="triggerToast">Add</Button>
          </div>
        </div>
      </div>
    </template>
  </DataView>
</template>

<script setup lang="ts">
import DataView from "primevue/dataview";
import Button from "primevue/button";
import { ForgeFormField } from "@3squared/forge-ui-3";
import { ref } from "vue";

const pageSize = ref<number>(5);
const productType = ref();
const sizingOptions = ref([5, 10, 15, 20]);
const date = ref();

const products = [
  {
    code: 1,
    name: "Blue Shirt",
    category: "Clothing",
    quantity: 10,
    date: new Date()
  },
  {
    code: 2,
    name: "Running Trainers",
    category: "Fitness",
    quantity: 3,
    date: new Date().setDate(new Date().getDate() + 1)
  },
  {
    code: 3,
    name: "Watch",
    category: "Accessories",
    quantity: 12,
    date: new Date().setDate(new Date().getDate() + 2)
  },
  {
    code: 4,
    name: "Socks",
    category: "Clothing",
    quantity: 10,
    date: new Date().setDate(new Date().getDate() + 3)
  },
  {
    code: 5,
    name: "Trousers",
    category: "Clothing",
    quantity: 15,
    date: new Date().setDate(new Date().getDate() + 4)
  },
  {
    code: 6,
    name: "Yoga Mat",
    category: "Fitness",
    quantity: 8,
    date: new Date().setDate(new Date().getDate() + 5)
  },
  {
    code: 7,
    name: "Leather Belt",
    category: "Accessories",
    quantity: 5,
    date: new Date().setDate(new Date().getDate() + 6)
  },
  {
    code: 8,
    name: "Winter Jacket",
    category: "Clothing",
    quantity: 6,
    date: new Date().setDate(new Date().getDate() + 7)
  },
  {
    code: 9,
    name: "Sports Water Bottle",
    category: "Fitness",
    quantity: 20,
    date: new Date().setDate(new Date().getDate() + 8)
  },
  {
    code: 10,
    name: "Baseball Cap",
    category: "Accessories",
    quantity: 7,
    date: new Date().setDate(new Date().getDate() + 9)
  },
  {
    code: 11,
    name: "Gloves",
    category: "Clothing",
    quantity: 11,
    date: new Date().setDate(new Date().getDate() + 10)
  },
  {
    code: 12,
    name: "Fitness Tracker",
    category: "Fitness",
    quantity: 4,
    date: new Date().setDate(new Date().getDate() + 11)
  },
  {
    code: 13,
    name: "Sunglasses",
    category: "Accessories",
    quantity: 9,
    date: new Date().setDate(new Date().getDate() + 12)
  },
  {
    code: 14,
    name: "Jeans",
    category: "Clothing",
    quantity: 13,
    date: new Date().setDate(new Date().getDate() + 13)
  },
  {
    code: 15,
    name: "Backpack",
    category: "Accessories",
    quantity: 6,
    date: new Date().setDate(new Date().getDate() + 14)
  }
];

const productOptions = ref([
  { label: "Fitness", value: "Fitness" },
  { label: "Accessories", value: "Accessories" },
  { label: "Clothing", value: "Clothing" }
]);
</\script>
`
);
</script>
