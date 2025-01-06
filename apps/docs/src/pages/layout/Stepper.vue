<template>
  <div>
    <ForgePageHeader title="Stepper" />
    <p>
      Further documentation and examples can be found in the
      <a class="link" target="_blank" href="https://primevue.org/stepper/"><strong>PrimeVue documentation</strong></a>
      .
    </p>
    <Playground :options="options" :code="code" :config="config" @reset="reset">
      <template #component>
          <component :is="ForgeStepper" v-bind="options" class="w-100">
            <template #step1>Enter your content for your panel here </template>
            <template #step2><ForgeAlert severity="info">I am an alert</ForgeAlert></template>
            <template #step3>Panel 3</template>
         </component>
      </template>
    </Playground>
    <CodeBlock :code="modelCode" />
  </div>
</template>

<script setup lang="ts">
import { ForgeStepper, ForgePageHeader, ForgeAlert } from "@3squared/forge-ui-3";
import { Playground, usePlayground, CodeBlock } from "@3squared/forge-playground-3";
import { computed, ref } from "vue";
import { severities } from "../../composables/playgroundOptions";
import type { ForgeSteps } from "@3squared/forge-ui-3/src/types/forge-types";

const currentStep = ref(1);
const model = [{ label: "Step 1", value: 1 }, { label: "Step 2", value: 2 }, { label: "Step 3", value: 3, disabled: true }] as ForgeSteps[];

const { options, propVals, config, reset } = usePlayground(
  {
    severity: severities[0],
    steps: model,
    inlineSteps: false,
    currentStep: currentStep
  },
  {
    severity: { type: "select", options: severities }
  }
);

const code = computed(() => `<ForgeStepper${propVals.value.length > 0 ? " " + propVals.value.join(" ") : ""} >
   //template name should match the value of the step, it should be 'step + {value}'
   <template #step1>Enter your content for your panel here </template>
   <template #step2><ForgeAlert severity="info">I am an alert</ForgeAlert>/template>
   <template #step3>Panel 3</template>
 </ForgeStepper>`);

const modelCode = computed(
  () => `
  const model = [{ label: "Step 1", value: 1 }, { label: "Step 2", value: 2 }, { label: "Step 3", value: 3 }] as ForgeSteps[]
`
);
</script>
