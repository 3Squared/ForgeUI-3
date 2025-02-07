<template>
  <div>
    <ForgePageHeader title="Accordion" />
    <p>
      Further documentation and examples can be found in the
      <a class="link" target="_blank" href="https://primevue.org/accordion/"><strong>PrimeVue documentation</strong></a>
      .
    </p>
    <Playground :options="options" :code="code" :config="config" @reset="reset" :value="value">
      <template #component>
        <component :is="Accordion" v-bind="options">{{ content }}</component>
      </template>
    </Playground>
  </div>
</template>

<script setup lang="ts">
import {ForgePageHeader} from "@3squared/forge-ui-3";
import { Playground, usePlayground } from "@3squared/forge-playground-3";
import { computed, ref } from "vue";
import Accordion from "primevue/accordion";

const content = ref("I am some panel content");

const tabs = ref([
  { title: 'Title 1', content: 'Content 1', value: '0' },
  { title: 'Title 2', content: 'Content 2', value: '1' },
  { title: 'Title 3', content: 'Content 3', value: '2' }
]);

const { options, propVals, config, reset } = usePlayground(
  {
    toggleable: true,
    header: "Header"
  },
  {}
);

const code = computed(() => `<ForgePanel${propVals.value.length > 0 ? " " + propVals.value.join(" ") : ""}> <ForgePanel />`);
</script>
