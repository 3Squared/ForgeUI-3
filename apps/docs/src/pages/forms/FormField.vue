<template>
  <div>
    <ForgePageHeader title="Form Field" />
    <Playground :options="options" :code="code" :config="config" @reset="reset">
      <template #component>
        <component :is="ForgeFormField" v-bind="options" v-model="value" />
      </template>
    </Playground>
  </div>
</template>

<script setup lang="ts">
import { Playground, usePlayground } from "@3squared/forge-playground-3";
import { ForgeFormField, ForgePageHeader } from "@3squared/forge-ui-3";
import { computed, ref } from "vue";
import { formFieldTypes } from "../../composables/playgroundOptions";

const value = ref();
const { options, propVals, config, reset } = usePlayground(
  {
    name: "",
    label: "",
    type: "text",
    mask: "",
    placeholder: ""
  },
  {
    type: { type: "select", options: formFieldTypes },
    name: { required: true },
    label: { required: true },
    mask: { disabled: (): boolean => options.value.type === "checkbox" },
    placeholder: { disabled: (): boolean => options.value.type === "checkbox" }
  }
);

const code = computed(() => `<ForgeFormField${propVals.value.length > 0 ? " " + propVals.value.join(" ") : ""} />`);
</script>
