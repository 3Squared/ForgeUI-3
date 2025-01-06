<template>
  <div>
    <forge-page-header title="Form" />
    <playground :options="options" :config="config" :code="code" @reset="reset">
      <template #component>
        <component :is="ForgeForm" v-bind="options" class="w-75" />
      </template>
    </playground>
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader, ForgeForm } from "@3squared/forge-ui-3";
import { computed } from "vue";
import { usePlayground, Playground } from "@3squared/forge-playground-3";

const { options, propVals, config, reset } = usePlayground(
  {
    onSubmit: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
    },
    title: "Forge Form Title",
    hideTitle: false,
    titleClass: "",
    submitText: "Submit",
    cancelText: "Cancel",
    hideCancel: false
  },
  {
    onSubmit: { required: true }
  }
);

const code = computed(() => {
  return `<forge-form ${propVals.value.join(" ")}/>`;
});
</script>
