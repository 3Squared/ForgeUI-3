<template>
  <div>
    <ForgePageHeader title="Select Button" />
    <p>
      Further documentation and examples can be found in the
      <a class="link" target="_blank" href="https://primevue.org/selectbutton/"><strong>PrimeVue documentation</strong></a>
      .
    </p>
    <Playground :options="options" :code="code" :config="config" @reset="reset">
      <template #component>
        <component :is="SelectButton" v-bind="options" v-model="value" :options="opts" />
      </template>
    </Playground>
  </div>
</template>

<script setup lang="ts">
import { Playground, usePlayground } from "@3squared/forge-playground-3";
import { ForgePageHeader } from "@3squared/forge-ui-3";
import SelectButton from "primevue/selectbutton";
import { computed, ref } from "vue";

const opts = ref([
  { label: "Option 1", value: 1 },
  { label: "Option 2", value: 2 },
  { label: "Option 3", value: 3, disabled: true }
]);

const propertyNames = ["label", "value"];

const { options, propVals, config, reset } = usePlayground(
  {
    optionLabel: "label",
    optionValue: "value",
    disabled: false,
    allowEmpty: true,
    multiple: false,
    optionDisabled: "disabled"
  },
  {
    optionLabel: { type: "select", options: propertyNames },
    optionValue: { type: "select", options: propertyNames }
  }
);

const value = ref();

const code = computed(() => `<SelectButton options="options" ${propVals.value.length > 0 ? " " + propVals.value.join(" ") : ""}/>`);
</script>
