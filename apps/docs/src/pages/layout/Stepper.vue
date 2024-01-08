<template>
  <ForgePageHeader title="Stepper" />
  <p>
    Further documentation and examples can be found in the <a class="link" target="_blank"
                                                              href="https://primevue.org/steps/"><strong>PrimeVue
    documentation</strong></a>.
  </p>
  <Playground :options="options" :code="code" :config="config" @reset="reset">
    <template #component>
      <component :is="ForgeStepper" v-bind="options" :model="model" />
    </template>
  </Playground>
  In order to add a step, you can model an object based on the 
  <a class="link" target="_blank" href="https://primevue.org/steps/#api.options.MenuItem"><strong>MenuItem</strong></a>
  object.
  <CodeBlock :code="modelCode" />
</template>

<script setup lang="ts">
import { ForgeStepper, ForgePageHeader } from "@3squared/forge-ui-3";
import { Playground, usePlayground, CodeBlock } from "@3squared/forge-playground-3";
import { computed } from "vue";
import { severities } from "../../composables/playgroundOptions";

const model = [
  { label: "Step 1" },
  { label: "Step 2", disabled: true },
  { label: "Step 3" }
]

const { options, propVals, config, reset } = usePlayground({
      severity: severities[0]
    },
    {
      severity: { type: 'select', options: severities }
    })

const code = computed(() => `<ForgeStepper${propVals.value.length > 0 ? " " + propVals.value.join(" ") : ""} />`)

const modelCode = computed(() => `
  const model = [
    { label: "Step 1" },
    { label: "Step 2", disabled: true },
    { label: "Step 3" }
  ]
`)
</script>