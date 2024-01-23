<template>
  <div>
    <ForgePageHeader title="Tabs" />
    <p>
      Further documentation and examples can be found in the
      <a class="link" target="_blank" href="https://primevue.org/tabview/"><strong>PrimeVue documentation</strong></a>
      .
    </p>
    <Playground :options="options" :code="code" :config="config" @reset="reset">
      <template #component>
        <component
          :is="TabView"
          :active-index="options.activeIndex"
          :lazy="options.lazy"
          :scrollable="options.scrollable"
          :select-on-focus="options.selectOnFocus"
        >
          <component :is="TabPanel" :header="options.header" :disabled="options.disabled" />
          <component :is="TabPanel" header="Header 2" :disabled="options.disabled" />
        </component>
      </template>
    </Playground>
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader } from "@3squared/forge-ui-3";
import { Playground, usePlayground } from "@3squared/forge-playground-3";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import { computed } from "vue";

const { options, reset, config } = usePlayground({
  activeIndex: 0,
  lazy: false,
  scrollable: false,
  selectOnFocus: false,
  header: "Header",
  disabled: false
});

const code = computed(
  () => `
<TabView :activeIndex="${options.value.activeIndex}"${options.value.lazy ? " lazy" : ""}${options.value.scrollable ? " scrollable" : ""}${
    options.value.selectOnFocus ? " selectOnFocus" : ""
  }>
 <TabPanel :header="${options.value.header}"${options.value.disabled ? " disabled" : ""} />
</TabView>`
);
</script>
