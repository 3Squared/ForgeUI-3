<template>
  <div>
    <ForgePageHeader title="Input Number" />
    <p>
      Further documentation and examples can be found in the
      <a class="link" target="_blank" href="https://primevue.org/inputnumber/"><strong>PrimeVue documentation</strong></a>
      .
    </p>
    <Playground :options="options" :code="code" :config="config" @reset="reset">
      <template #component>
        <component :is="InputNumber" v-bind="options" />
      </template>
      <template #min>
        <div class="d-flex flex-column mb-2">
          Min
          <InputNumber v-model="min" />
        </div>
      </template>
      <template #max>
        <div class="d-flex flex-column mb-2">
          Max
          <InputNumber v-model="max" />
        </div>
      </template>
      <template #step>
        <div class="d-flex flex-column mb-2">
          Step
          <InputNumber v-model="step" />
        </div>
      </template>
    </Playground>
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader } from "@3squared/forge-ui-3";
import InputNumber from "primevue/inputnumber";
import { Playground, usePlayground } from "@3squared/forge-playground-3";
import { computed, ref, watch } from "vue";

const min = ref<number | null>();
const max = ref<number | null>();
const step = ref<number | null>();

const { options, propVals, config, reset } = usePlayground(
  {
    format: true,
    showButtons: false,
    buttonLayout: "stacked",
    min: min.value,
    max: max.value,
    step: step.value,
    allowEmpty: true,
    incrementButtonClass: "",
    decrementButtonClass: "",
    prefix: "",
    suffix: "",
    placeholder: ""
  },
  {},
  () => {
    max.value = null;
    min.value = null;
    step.value = null;
  }
);

watch(
  () => min.value,
  (min) => (options.value.min = min)
);

watch(
  () => max.value,
  (max) => (options.value.max = max)
);

watch(
  () => step.value,
  (step) => (options.value.step = step)
);

const code = computed(() => `<InputNumber${propVals.value.length > 0 ? " " + propVals.value.join(" ") : ""} />`);
</script>
