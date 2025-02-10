<template>
  <div>
    <ForgePageHeader title="Accordion" />
    <p>
      Further documentation and examples can be found in the
      <a class="link" target="_blank" href="https://primevue.org/accordion/"><strong>PrimeVue documentation</strong></a>
      .
    </p>

    <p>To enable <strong>multiple</strong> mode to work, <strong>value</strong> must be an array e.g. <code>:value="['0']"</code>. 
      By default (i.e. in single mode), it is a string.
    </p>
    <Playground :options="options" :code="code" :config="config" :value="tabs" @reset="reset">
      <template #component>
        <Accordion :value="['0']" class="w-75 m-0" :multiple="multiple">
          <AccordionPanel v-for="tab in tabs" :key="tab.title" :value="tab.value">
            <AccordionHeader>{{ tab.title }}</AccordionHeader>
            <AccordionContent>
              <p class="m-0">{{ tab.content }}</p>
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
      </template>
    </Playground>
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader } from "@3squared/forge-ui-3";
import { Playground, usePlayground } from "@3squared/forge-playground-3";
import { computed, ref } from "vue";
import AccordionPanel from "primevue/accordionpanel";
import AccordionHeader from "primevue/accordionheader";
import AccordionContent from "primevue/accordioncontent";
import Accordion from "primevue/accordion";


const tabs = ref([
  { title: 'Title 1', content: 'Content 1', value: '0' },
  { title: 'Title 2', content: 'Content 2', value: '1' },
  { title: 'Title 3', content: 'Content 3', value: '2' }
]);
const multiple = ref(false)

const { options, propVals, config, reset } = usePlayground(
    {
      multiple: multiple,
      lazy: true
    },
    {}
);

const code = computed(() => `<ForgePanel${propVals.value.length > 0 ? " " + propVals.value.join(" ") : ""}> <ForgePanel />`);
</script>
