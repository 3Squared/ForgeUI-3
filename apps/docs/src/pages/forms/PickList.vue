<template>
  <div>
    <ForgePageHeader title="PickList" />
    <p>
      ForgePickList was created so that we can use a filter within the PrimeVue Picklist.
      Further documentation and examples can be found in the
      <a class="link" target="_blank" href="https://primevue.org/picklist/"><strong>PrimeVue documentation</strong></a>
      .
    </p>

    <p>
      The <strong>v-model</strong> value here is a multi-dimensional array. The first array is the source list, the second is the target.
    </p>
    <playground :options="options" :config="config" :code="code" display-value @reset="reset">
      <template #component>
        <ForgePickList v-bind="options" v-model="value" v-model:target-list="targetList" v-model:source-list="sourceList" class="w-100" />
      </template>
      <template #value>
        <div class="d-flex flex-column gap-2 ">
          <div>
            <strong>Target:</strong> {{ targetList }}
          </div>
          <div>
            <strong>Source:</strong> {{ sourceList }}
          </div>
        </div>
      </template>
    </playground>
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader, ForgePickList } from "@3squared/forge-ui-3";
import { computed, onMounted, ref } from "vue";
import { usePlayground, Playground } from "@3squared/forge-playground-3";
import { notSelectedCountries, selectedCountries } from "../examples/data/exampleCountries";

const value = ref([]);
const targetList = ref([]);
const sourceList = ref([]);

onMounted(() => [
  value.value = [notSelectedCountries, selectedCountries]
]);

const { options, config, reset } = usePlayground(
  {
    filterBy: "name",
    dataKey: "code",
    targetTitle: "Target",
    sourceTitle: "Source",
    showTargetControls: false,
    showSourceControls: false
  }
);

const code = computed(() => {
  return `
<template>
  <ForgePickList v-model="list" dataKey="code" filterBy="name" v-model:targetList="targetList" v-model:sourceList="sourceList" />
</template>

<script setup lang="ts">
import { notSelectedCountries, selectedCountries } from "./data/exampleCountries";
import { onMounted, ref } from "vue";
import { ForgePickList } from "@3squared/forge-ui-3";

const list = ref([]);
const targetList = ref([]);
const sourceList = ref([]);

onMounted(() => {
  list.value = [notSelectedCountries, selectedCountries];
});
</\script>
`;
});
</script>
