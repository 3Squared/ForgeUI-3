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
        <component :is="ForgeModal" v-bind="options" v-model:visible="visible" />
        <Button label="Click me!" @click="visible = true" />
      </template>
    </Playground>
    Make sure to include the DialogService plugin in your main.ts file.
    <CodeBlock :code="mainTsCode" />

    <Panel class="mb-3" header="Generic Confirmation Modal" toggleable collapsed>
      <p>
        If you only a small popup seeking confirmation from the user, theres a quick programmatic way to display one using the ConfirmService.
        <br />
        Make sure to add
        <code>.use(ConfirmationService)</code>
        to your main.ts file before using it.
      </p>
      <p>
        Further documentation and examples can be found in the
        <a class="link" target="_blank" href="https://primevue.org/confirmdialog/"><strong>PrimeVue documentation</strong></a>
        .
      </p>
      <ExampleConfirmDialogue class="mt-3" />
    </Panel>
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader, ForgeModal } from "@3squared/forge-ui-3";
import Button from "primevue/button";
import Panel from "primevue/panel";
import { Playground, usePlayground, CodeBlock } from "@3squared/forge-playground-3";
import { computed, ref } from "vue";
import { buttonTypes, position, shorthandSizes } from "../../composables/playgroundOptions";
import ExampleConfirmDialogue from "../examples/components/ExampleConfirmDialogue.vue";

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
    size: "md",
    keepInViewport: true,
    draggable: true,
    maximizable: false,
    position: position[0],
    autoZIndex: true,
    baseZIndex: 0,
    blockScroll: false,
    cancelButtonType: "button",
    submitButtonType: "button"
  },
  {
    size: { type: "select", options: [...shorthandSizes, "xl"] },
    position: { type: "select", options: position },
    baseZIndex: { disabled: (): boolean => options.value.autoZIndex },
    cancelButtonType: { type: "select", options: buttonTypes },
    submitButtonType: { type: "select", options: buttonTypes }
  }
);

const code = computed(() => `<ForgeModal v-model:visible="visible"${propVals.value.length > 0 ? " " + propVals.value.join(" ") : ""} />`);

const mainTsCode = `
  createApp(App)
    .use(PrimeVue, { unstyled: true, pt: Bootstrap_PT })
    .use(DialogService)
    .mount('#app')
`;
</script>
