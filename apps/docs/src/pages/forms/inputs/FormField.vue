<template>
  <div>
    <ForgePageHeader title="Form Field" />
    <Playground :options="options" :code="code" :config="config" @reset="reset">
      <template #component>
        <component :is="ForgeFormField" v-bind="options" v-model="value" :options="dropdownOptions" option-label="label" />
      </template>
    </Playground>
  </div>
</template>

<script setup lang="ts">
import { Playground, usePlayground } from "@3squared/forge-playground-3";
import { ForgeFormField, ForgePageHeader } from "@3squared/forge-ui-3";
import { computed, ref, watch } from "vue";
import { formFieldTypes } from "../../../composables/playgroundOptions";

const value = ref();
const { options, propVals, config, reset } = usePlayground(
  {
    name: "",
    fieldLabel: "",
    type: "text",
    mask: "",
    placeholder: ""
  },
  {
    type: { type: "select", options: formFieldTypes },
    name: { required: true },
    mask: { disabled: (): boolean => options.value.type !== "mask" },
    placeholder: { disabled: (): boolean => options.value.type === "checkbox" }
  }
);

const dropdownOptions = [
  { id: "option-1", label: "Option 1" },
  { id: "option-2", label: "Option 2" },
  { id: "option-3", label: "Option 3" },
  { id: "option-4", label: "Option 4" },
  { id: "option-5", label: "Option 5" },
  { id: "option-6", label: "Option 6" }
];

watch(
  () => options.value.type,
  (newType) => {
    if (newType == "multiselect") {
      value.value = [];
    } else {
      value.value = null;
    }
  }
);

const code = computed(() => `<ForgeFormField${propVals.value.length > 0 ? " " + propVals.value.join(" ") : ""} />`);
</script>
