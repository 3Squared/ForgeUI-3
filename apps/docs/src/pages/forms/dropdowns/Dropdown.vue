<template>
  <div>
    <forge-page-header title="Dropdown" />
    <p>
      Further documentation and examples can be found in the
      <a class="link" target="_blank" href="https://primevue.org/dropdown/"><strong>PrimeVue documentation</strong></a>
      .
    </p>
    <playground :options="options" :config="config" :code="code">
      <template #component>
        <component :is="Dropdown" v-bind="options" v-model="selectedItem" class="w-100" />
      </template>
    </playground>
    Here is an example of an options array and selected options array
    <code-block :code="optionsArrayExample" />
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader } from "@3squared/forge-ui-3";
import Dropdown from "primevue/dropdown";
import { computed, ref } from "vue";
import { usePlayground, Playground, CodeBlock } from "@3squared/forge-playground-3";
import { stringFilterTypes } from "../../../composables/playgroundOptions";

const selectedItem = ref();

const opts = ref([
  { id: 1, optionLabel: "option 1", value: "opt_1" },
  { id: 2, optionLabel: "option 2", value: "opt_2" },
  { id: 3, optionLabel: "option 3", value: "opt_3" },
  { id: 4, optionLabel: "option 4", value: "opt_4" },
  { id: 5, optionLabel: "option 5", value: "opt_5" }
]);

const { options, propVals, config } = usePlayground(
  {
    vModel: "selectedItem",
    options: opts.value,
    optionLabel: "optionLabel",
    optionValue: "value",
    scrollHeight: "200",
    filter: false,
    filterPlaceholder: "",
    filterMatchMode: stringFilterTypes[0],
    editable: false,
    placeholder: "",
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
    filterMatchMode: { type: "select", options: stringFilterTypes, disabled: (): boolean => !options.value.filter },
    filterPlaceholder: { disabled: (): boolean => !options.value.filter },
    optionLabel: { type: "select", options: Object.keys(opts.value[0]) },
    optionValue: { type: "select", options: Object.keys(opts.value[0]) },
    dataKey: { type: "select", options: Object.keys(opts.value[0]) }
  }
);

const code = computed(() => `<Dropdown ${propVals.value.join(" ")}/>`);
const optionsArrayExample = computed(
  () => `<script setup lang="ts">
 const optionsArray = ref([
   { id: 1, optionLabel: 'option 1', value: 'opt_1'},
   { id: 2, optionLabel: 'option 2', value: 'opt_2'}
 ])
 
 const selectedItem = ref()
<\/script>`
);
</script>
