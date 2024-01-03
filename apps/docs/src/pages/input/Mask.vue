<template>
  <ForgePageHeader title="Input Mask" />
  <p>
    Further documentation and examples can be found in the <a class="link" target="_blank" href="https://primevue.org/inputmask/"><strong>PrimeVue documentation</strong></a>.
  </p>
  <Accordion class="mb-3">
    <AccordionTab header="Mask definitions">
      <div class="d-flex flex-column">
        <p><strong>a</strong> - Alphabetic Characters</p>
        <p><strong>9</strong> - Numeric Characters</p>
        <p><strong>*</strong> - Alphanumeric Characters</p>
        <div class="d-flex flex-column">
          <h5>Formatting Characters</h5>
          <div>
            <strong>(</strong>
            <strong>)</strong>
            <strong>-</strong>
          </div>
        </div>
      </div>
    </AccordionTab>
  </Accordion>
  <Playground :options="options" :code="code" :config="config" @reset="reset">
    <template #component>
      <component :is="InputMask" v-bind="options"/>
    </template>
  </Playground>
</template>

<script setup lang="ts">
import { ForgePageHeader } from "@3squared/forge-ui-3";
import InputMask from 'primevue/inputmask'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import { Playground, usePlayground } from "@3squared/forge-playground-3";
import { computed, ref } from "vue";

const { options, propVals, config, reset } = usePlayground({
      slotChar: '_',
      mask: '', 
      placeholder: '',
      autoClear: true,
      unmask: false,
      readonly: false
    },
    {})

const code = computed(() => `<InputMask${propVals.value.length > 0 ? " " + propVals.value.join(" ") : ""} />`)
</script>