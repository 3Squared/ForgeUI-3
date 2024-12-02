<template>
  <div>
    <ForgePageHeader title="Multiselect" />
    <p>
      Further documentation and examples can be found in the
      <a class="link" target="_blank" href="https://github.com/shentao/vue-multiselect/tree/next?tab=readme-ov-file#vue-multiselect">
        <strong>Vue Multiselect documentation</strong>
      </a>
      .
    </p>
    <Playground :options="options" :code="code" :config="config" @reset="reset">
      <template #component>
        <component :is="ForgeMultiSelect" v-bind="options" v-model="selected" />
      </template>
    </Playground>
    Here is an example of a multiselect options array
    <code-block :code="optionsArrayExample" />
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader, ForgeMultiSelect } from "@3squared/forge-ui-3";
import { Playground, usePlayground, CodeBlock } from "@3squared/forge-playground-3";
import { computed, ref } from "vue";
import { severities } from "../../composables/playgroundOptions";

const multiSelectOptions = [
  { id: "option-1", label: "Option 1" },
  { id: "option-2", label: "Option 2" },
  { id: "option-3", label: "Option 3" },
  { id: "option-4", label: "Option 4" },
  { id: "option-5", label: "Option 5" },
  { id: "option-6", label: "Option 6" },
  { id: "option-7", label: "Option 7" },
  { id: "option-8", label: "Option 8" },
  { id: "option-9", label: "Option 9" },
  { id: "option-10", label: "Option 10" }
];
const selected = ref([]);

const tagPositions = ["top", "bottom"];

const { options, propVals, config, reset } = usePlayground(
  {
    options: multiSelectOptions,
    severity: severities[0],
    expandLeft: false,
    showClearSelection: false,
    showSelectAll: false,
    selectValue: "",
    name: "",
    label: "label",
    searchable: true,
    clearOnSelect: true,
    hideSelected: false,
    placeholder: "Search",
    allowEmpty: true,
    resetAfter: false,
    closeOnSelect: false,
    taggable: false,
    tagPlaceholder: "Please enter to create a tag",
    tagPosition: tagPositions[0],
    max: 9999,
    optionsLimit: 1000,
    groupValues: "",
    groupLabel: "",
    groupSelect: false,
    internalSearch: true,
    preserveSearch: false,
    preselectFirst: false
  },
  {
    severity: { type: "select", options: severities },
    tagPosition: { type: "select", options: tagPositions }
  }
);

const code = computed(() => `<ForgeMultiSelect${propVals.value.length > 0 ? " " + propVals.value.join(" ") : ""} />`);

const optionsArrayExample = computed(
  () => `<script setup lang='ts'>
 const optionsArray = ref([
   { id: 1, label: 'option 1', value: 'opt_1'},
   { id: 2, label: 'option 2', value: 'opt_2'}
 ])
<\/script>`
);
</script>
