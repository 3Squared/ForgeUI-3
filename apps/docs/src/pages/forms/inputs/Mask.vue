<template>
  <div>
    <ForgePageHeader title="Input Mask" />
    <p>
      Further documentation and examples can be found in the
      <a class="link" target="_blank" href="https://primevue.org/inputmask/"><strong>PrimeVue documentation</strong></a>
      .
    </p>
    <Panel class="mb-3" header="Mask definitions" toggleable>
      <div class="d-flex flex-column">
        <p>
          <strong>a</strong>
          - Alphabetic Characters
        </p>
        <p>
          <strong>9</strong>
          - Numeric Characters
        </p>
        <p>
          <strong>*</strong>
          - Alphanumeric Characters
        </p>
        <div class="d-flex flex-column">
          <h5>Formatting Characters</h5>
          <div>
            <strong>(</strong>
            <strong>)</strong>
            <strong>-</strong>
          </div>
        </div>
      </div>
    </Panel>
    <Playground :options="options" :code="code" :config="config" display-value @reset="reset">
      <template #component>
        <InputMask v-bind="options" v-model="value" />
      </template>
      <template #value>
        {{ value }}
      </template>
    </Playground>
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader } from "@3squared/forge-ui-3";
import InputMask from "primevue/inputmask";
import Panel from "primevue/panel";
import Accordion from "primevue/accordion";
import AccordionPanel from "primevue/accordionpanel";
import { Playground, usePlayground } from "@3squared/forge-playground-3";
import { computed, ref } from "vue";

const value = ref();

const { options, propVals, config, reset } = usePlayground(
  {
    slotChar: "_",
    mask: "",
    placeholder: "",
    autoClear: true,
    unmask: false,
    readonly: false
  },
  {}
);

const code = computed(() => `<InputMask${propVals.value.length > 0 ? " " + propVals.value.join(" ") : ""} />`);
</script>
