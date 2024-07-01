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
        <component :is="SelectButton" v-bind="options" v-model="value" :options="opts" :multiple="multiple" />
      </template>
      <template #additionalOptions>
        <ForgeCheckbox label="Multiple" :value="multiple" @mousedown="clickMultiple" />
        {{ multiple }}
      </template>
    </Playground>
  </div>
</template>

<script setup lang="ts">
import { Playground, usePlayground } from "@3squared/forge-playground-3";
import { ForgePageHeader, ForgeCheckbox } from "@3squared/forge-ui-3";
import SelectButton from "primevue/selectbutton";
import { computed, ref, watch } from "vue";

const opts = ref([
  { label: "Option 1", value: 1 },
  { label: "Option 2", value: 2 },
  { label: "Option 3", value: 3 }
]);

const propertyNames = ["label", "value"];

const { options, propVals, config, reset } = usePlayground(
  {
    optionLabel: "label",
    optionValue: "value",
    disabled: false,
    allowEmpty: true
  },
  {
    optionLabel: { type: "select", options: propertyNames },
    optionValue: { type: "select", options: propertyNames }
  }
);

const multiple = ref<boolean>(false);

const value = ref();

const code = computed(
  () => `<SelectButton options="options" ${propVals.value.length > 0 ? " " + propVals.value.join(" ") : ""} ${multiple.value ? "multiple" : ""}/>`
);

const clickMultiple = () => {
  value.value = null;
  if (multiple.value) {
    multiple.value = false;
  } else {
    multiple.value = true;
  }
};

watch(
  () => options.value.optionValue,
  (val) => {
    value.value = val === "value" ? opts.value[0].value : opts.value[1].label;
  }
);
</script>
