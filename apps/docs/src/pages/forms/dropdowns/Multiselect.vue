<template>
  <div>
    <ForgePageHeader title="Multiselect" />
    <p>
      Further documentation and examples can be found in the
      <a class="link" target="_blank" href="https://v3.primevue.org/multiselect/">
        <strong>PrimeVue Multiselect documentation</strong>
      </a>
      .
    </p>
    <Playground :options="options" :code="code" :config="config" @reset="reset">
      <template #component>
        <component :is="Multiselect" v-bind="options" v-model="selectedOptions" class="w-100" />
      </template>
    </Playground>

    <h3>Props Info:</h3>
    <ul>
      <li>maxSelectedLabels - Limit the selected labels shown, if the number select goes over this the number selected will be shown and not the pills.</li>
      <li>selectionLimit - Maximum number of selectable items.</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader } from "@3squared/forge-ui-3";
import Multiselect from "primevue/multiselect";
import { Playground, usePlayground } from "@3squared/forge-playground-3";
import { computed, ref } from "vue";

const selectedOptions = ref([]);

const optionsArray = ref([
  { id: 1, label: "Option 1", value: "opt_1" },
  { id: 2, label: "Option 2", value: "opt_2" },
  { id: 3, label: "Option 3", value: "opt_3" },
  { id: 4, label: "Option 4", value: "opt_4" },
  { id: 5, label: "Option 5", value: "opt_5" },
  { id: 6, label: "Option 6", value: "opt_6" },
  { id: 7, label: "Option 7", value: "opt_7" },
  { id: 8, label: "Option 8", value: "opt_8" },
  { id: 9, label: "Option 9", value: "opt_9" },
  { id: 10, label: "Option 10", value: "opt_10" },
  { id: 11, label: "Option 11", value: "opt_11" },
  { id: 12, label: "Option 12", value: "opt_12" }
]);

const placeHolder = ref("Select options");

const displays = ["chip", "comma"];

const code = computed(
  () =>
    `
<template> 
  <Multiselect ${propVals.value.length > 0 ? " " + propVals.value.join(" ") : ""} /> 
</template>

<script>
 import Multiselect from "primevue/multiselect";     
</\script>
`
);
const { options, propVals, config, reset } = usePlayground(
  {
    options: optionsArray,
    optionLabel: "label",
    placeholder: placeHolder,
    filterPlaceholder: "Search",
    display: "comma",
    maxSelectedLabels: 4,
    filter: false,
    showClear: false,
    showToggleAll: true
  },
  {
    display: { type: "select", options: displays }
  }
);
</script>
