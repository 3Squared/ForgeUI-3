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
        <component :is="ForgeModal" v-bind="options" v-model:visible="visible">
          I am a Modal component.
        </component>
        <Button label="Click me!" @click="visible = true" />
      </template>
    </Playground>
    Make sure to include the DialogService plugin in your main.ts file.
    <CodeBlock :code="mainTsCode" />
    
    <p>If you are using your own footer slot you will have to set you own error. You can pass this in through v-model.</p>
    <ExampleModal />
    <CodeBlock :code="customFooterModal" />

    <p>
      If you are looking for small, simple confirm prompts for user input, check out the
      <RouterLink to="/overlay/confirmmodal">Confirm Modal</RouterLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader, ForgeModal } from "@3squared/forge-ui-3";
import Button from "primevue/button";
import { Playground, usePlayground, CodeBlock } from "@3squared/forge-playground-3";
import { computed, ref } from "vue";
import { buttonTypes, position, shorthandSizes } from "../../composables/playgroundOptions";
import ExampleModal from "../examples/components/ExampleModal.vue";

const visible = ref<boolean>(false);

const { options, propVals, config, reset } = usePlayground(
  {
    showHeader: true,
    header: "Modal Example",
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
    submitButtonType: "button",
    resetErrorOnClose: true,
    maxHeight: 'mh-300px'
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

const customFooterModal = `
<template>
  <ForgeModal ref="modalRef" v-model:visible="visible" :error="error" :showFooter="false">
    I'm a modal

    <template #footer>
      <Button @click="cancel" outlined class="me-auto">Cancel</Button>
      <Button @click="save">Save</Button>
    </template>
  </ForgeModal>

  <Button @click="visible = true">Show</Button>
</template>

<script setup lang="ts">
import Button from "primevue/button"
import { ref } from "vue";
import { ForgeModalError } from "@3squared/forge-ui-3/dist/src/components/ForgeModal.vue";
import { ForgeModal } from "@3squared/forge-ui-3";

const visible = ref(false)
const error = ref<ForgeModalError>()
const modalRef = ref();

const cancel = () => {
  modalRef.value?.resetError();
  visible.value = false
}

const save = async () => {
  error.value = {
    hasError: true,
    header: 'I am an error',
    message: []
  };
};
</\script>

`;
</script>
