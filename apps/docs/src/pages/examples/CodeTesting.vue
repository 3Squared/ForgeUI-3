<template>
  <div class="">
    <Accordion value="0">
      <AccordionPanel v-for="tab in tabs" :key="tab.title" :value="tab.value">
        <AccordionHeader>{{ tab.title }}</AccordionHeader>
        <AccordionContent>
          <p class="m-0">{{ tab.content }}</p>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  </div>
</template>

<script setup lang="ts">
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import { ref } from 'vue';

const tabs = ref([
  { title: 'Title 1', content: 'Content 1', value: '0' },
  { title: 'Title 2', content: 'Content 2', value: '1' },
  { title: 'Title 3', content: 'Content 3', value: '2' }
]);
</script>
