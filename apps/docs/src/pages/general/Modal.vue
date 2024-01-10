<template>
  <div>
    <ForgePageHeader title="Modal" />
    <p>
      Further documentation and examples can be found in the
      <a class="link" target="_blank" href="https://primevue.org/dialog/"><strong>PrimeVue documentation</strong></a>
      .
    </p>
    <Playground :options="options" :code="code" :config="config" @reset="reset">
      <template #component>
        <component :is="ForgeModal" v-bind="options" v-model="visible" />
        <Button label="Click me!" @click="visible = true" />
      </template>
    </Playground>
    Make sure to include the DialogService plugin in your main.ts file.
    <CodeBlock :code="mainTsCode" />
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader, ForgeModal } from "@3squared/forge-ui-3";
import Button from "primevue/button";
import { Playground, usePlayground, CodeBlock } from "@3squared/forge-playground-3";
import { computed, ref } from "vue";
import { position } from "../../composables/playgroundOptions";

const visible = ref<boolean>(false);

const { options, propVals, config, reset } = usePlayground(
  {
    showHeader: true,
    header: "",
    showFooter: true,
    footer: "",
    closable: false,
    cancelText: "Cancel",
    cancelClass: "",
    submitText: "Submit",
    submitClass: "",
    keepInViewport: true,
    draggable: true,
    maximizable: false,
    position: position[0],
    autoZIndex: true,
    baseZIndex: 0,
    blockScroll: false
  },
  {
    position: { type: "select", options: position },
    baseZIndex: { disabled: (): boolean => options.value.autoZIndex }
  }
);

const code = computed(() => `<ForgeModal${propVals.value.length > 0 ? " " + propVals.value.join(" ") : ""} />`);

const mainTsCode = `
  createApp(App)
    .use(PrimeVue, { unstyled: true, pt: Bootstrap_PT })
    .use(DialogService)
    .mount('#app')
`;
</script>
