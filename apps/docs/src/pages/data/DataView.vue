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
import { severities } from "../../composables/playgroundOptions";
import { computed, ref } from "vue";
import Button from "primevue/button";
import { products } from "./exampleTableData";
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

const code = computed(() => `<DataView${propVals.value.length > 0 ? " " + propVals.value.join(" ") : ""} />`);
</script>
