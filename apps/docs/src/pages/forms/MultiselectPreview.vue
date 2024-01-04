<template>
  <div>
    <forge-page-header title="Multiselect Preview" />
    <OPTIONS />
    <playground :options="options" :config="config" :code="code">
      <template #component>
        <component :is="ForgeMultiSelectPreview" v-bind="options" v-model="selectedItems" class="w-100" />
      </template>
    </playground>
    Here is an example of an options array and selected options array
    <code-block :code="optionsArrayExample" />
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader, ForgeMultiSelectPreview } from "@3squared/forge-ui-3";
import { computed, ref } from "vue";
import { usePlayground, Playground, CodeBlock } from "@3squared/forge-playground-3";

const orientations = ["row", "column"];

const items = [
  { id: 1, label: "Jake Minor", labelShort: "Jake Minor" },
  { id: 2, label: "Adam Thompson", labelShort: "Adam Thompson" },
  { id: 3, label: "Tom McGurrin", labelShort: "Tom McGurrin" },
  { id: 4, label: "Mark Lloyd", labelShort: "Mark Lloyd" },
  { id: 5, label: "Nathan Bell", labelShort: "Nathan Bell" },
  { id: 6, label: "Hamza Mahmood", labelShort: "Hamza Mahmood" },
  { id: 7, label: "Isabel Mallon", labelShort: "Isabel Mallon" }
];

const selectedItems = ref([
  { id: 1, label: "Jake Minor", labelShort: "Jake Minor" },
  { id: 2, label: "Adam Thompson", labelShort: "Adam Thompson" },
  { id: 3, label: "Tom McGurrin", labelShort: "Tom McGurrin" },
  { id: 4, label: "Mark Lloyd", labelShort: "Mark Lloyd" },
]);

const { options, propVals, config } = usePlayground(
    {
      vModel: "selectedItemsArray",
      options: items,
      title: "Selected Items",
      orientation: orientations[0],
      height: "200px",
      canRemoveItemFromPreview: true,
      multiple: true,
      trackBy: "id",
      label: "label"
    },
    {
      vModel: { required: true, disabled: () => true },
      options: { required: true },
      orientation: { type: "select", options: orientations },
      label: { type: "select", options: Object.keys(items[0]) },
      trackBy: { type: "select", options: Object.keys(items[0]) }
    }
);

const code = computed(() => `<forge-multi-select-preview ${propVals.value.join(" ")}/>`);
const optionsArrayExample = computed(
    () => `<script setup lang="ts">
 const optionsArray = ref([
   { id: 1, label: 'option 1', value: 'opt_1'},
   { id: 2, label: 'option 2', value: 'opt_2'}
 ])
 
 const selectedOptions = ref([])
<\/script>`
);
</script>
