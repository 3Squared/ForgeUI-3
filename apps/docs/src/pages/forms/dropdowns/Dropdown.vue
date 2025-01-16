<template>
  <div>
    <forge-page-header title="Dropdown" />
    <p>
      Further documentation and examples can be found in the
      <a class="link" target="_blank" href="https://primevue.org/select/"><strong>PrimeVue documentation</strong></a>
      .
    </p>
    <playground :options="options" :config="config" :code="code">
      <template #component>
        <component :is="Select" v-bind="options" v-model="selectedItem" class="w-100" />
      </template>
    </playground>
    Here is an example of an options array and selected options array
    <code-block :code="optionsArrayExample" />
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader } from "@3squared/forge-ui-3";
import Select from "primevue/select";
import { computed, ref } from "vue";
import { usePlayground, Playground, CodeBlock } from "@3squared/forge-playground-3";
import { stringFilterTypes } from "../../../composables/playgroundOptions";

const selectedItem = ref();

const opts = ref([
  { id: 1, optionLabel: "Option 1", value: "opt_1" },
  { id: 2, optionLabel: "Option 2", value: "opt_2" },
  { id: 3, optionLabel: "Option 3", value: "opt_3" },
  { id: 4, optionLabel: "Option 4", value: "opt_4" },
  { id: 5, optionLabel: "Option 5", value: "opt_5" },
  { id: 6, optionLabel: "Option 6", value: "opt_6" },
  { id: 7, optionLabel: "Option 7", value: "opt_7" },
  { id: 8, optionLabel: "Option 8", value: "opt_8" },
  { id: 9, optionLabel: "Option 9", value: "opt_9" },
  { id: 10, optionLabel: "Option 10", value: "opt_10" },
  { id: 11, optionLabel: "Option 11", value: "opt_11" },
  { id: 12, optionLabel: "Option 12", value: "opt_12" }
]);

const { options, propVals, config } = usePlayground(
  {
    vModel: "selectedItem",
    options: opts.value,
    optionLabel: "optionLabel",
    optionValue: "value",
    scrollHeight: "200px",
    filter: false,
    filterPlaceholder: "Search",
    filterMatchMode: stringFilterTypes[0],
    editable: false,
    showClear: false,
    placeholder: "Select an option",
    disabled: false,
    dataKey: "id",
    loading: false,
    resetFilterOnHide: false,
    filterMessage: "{0} results are available",
    selectionMessage: "{0} items selected",
    emptySelectionMessage: "No selected items",
    emptyFilterMessage: "No results found"
  },
  {
    vModel: { required: true, disabled: () => true },
    options: { required: true },
    filterMatchMode: {
      type: "select",
      options: stringFilterTypes,
      disabled: (): boolean => !options.value.filter
    },
    filterPlaceholder: { disabled: (): boolean => !options.value.filter },
    optionLabel: { type: "select", options: Object.keys(opts.value[0]) },
    optionValue: { type: "select", options: Object.keys(opts.value[0]) },
    dataKey: { type: "select", options: Object.keys(opts.value[0]) }
  }
);

const code = computed(() => `<Select ${propVals.value.join(" ")}/>`);
const optionsArrayExample = computed(
  () => `<script setup lang="ts">
import Select from "primevue/select";

 const opts = ref([
  { id: 1, optionLabel: "Option 1", value: "opt_1" },
  { id: 2, optionLabel: "Option 2", value: "opt_2" },
  { id: 3, optionLabel: "Option 3", value: "opt_3" },
  { id: 4, optionLabel: "Option 4", value: "opt_4" },
  { id: 5, optionLabel: "Option 5", value: "opt_5" },
  { id: 6, optionLabel: "Option 6", value: "opt_6" },
  { id: 7, optionLabel: "Option 7", value: "opt_7" },
  { id: 8, optionLabel: "Option 8", value: "opt_8" },
  { id: 9, optionLabel: "Option 9", value: "opt_9" },
  { id: 10, optionLabel: "Option 10", value: "opt_10" },
  { id: 11, optionLabel: "Option 11", value: "opt_11" },
  { id: 12, optionLabel: "Option 12", value: "opt_12" }
]);
 
 const selectedItem = ref()
<\/script>`
);
</script>
