<template>
  <TabView v-bind="props.tabViewProps">
    <TabPanel v-for="tab in props.tabs" :key="tab.title" :header="tab.title" v-bind="props.tabPanelProps">
      <p class="m-0">
        {{ tab.content }}
      </p>
    </TabPanel>
  </TabView>
</template>

<script setup lang="ts">
import { TabViewProps } from "primevue/tabview";
import { TabPanelProps } from "primevue/tabpanel";

interface Tab {
  title: string,
  content: string
}

export interface TabViewWrapperProps {
  tabViewProps?: TabViewProps,
  tabPanelProps?: TabPanelProps,
  tabs: Tab[]
}

const props = defineProps<TabViewWrapperProps>()

</script>