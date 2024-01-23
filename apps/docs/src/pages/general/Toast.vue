<template>
  <div>
    <ForgePageHeader title="Toast" />
    <p>
      Further documentation and examples can be found in the
      <a class="link" target="_blank" href="https://primevue.org/toast/"><strong>PrimeVue documentation</strong></a>
      .
    </p>
    <Playground :options="options" :code="code" :config="config" @reset="reset">
      <template #component>
        <Button label="Show Toast!" @click="showToast" />
        <component :is="Toast" v-bind="options" class="w-100">Stat</component>
      </template>
      <template #additionalOptions>
        <h5 class="mt-4">Message Options</h5>
        <div>
          <label>Severity</label>
          <Dropdown v-model="severity" :options="severities" />
        </div>
        <ForgeFormField v-model="summary" label="Summary" type="text" class="my-2" />
        <ForgeFormField v-model="closable" label="Closable" type="checkbox" />
        <ForgeFormField v-model="life" label="Life" type="number" class="mt-2" />
      </template>
    </Playground>
    Make sure to include the ToastService plugin in your main.ts file.
    <CodeBlock :code="mainTsCode" />
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader, ForgeFormField } from "@3squared/forge-ui-3";
import { CodeBlock, Playground, usePlayground } from "@3squared/forge-playground-3";
import { computed, ref } from "vue";
import Toast from "primevue/toast";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import { useToast } from "primevue/usetoast";

const position = ["center", "top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right"];
const severities = ["info", "success", "warn", "error"];

const toast = useToast();
const severity = ref<"info" | "success" | "warn" | "error">("info");
const summary = ref<string>("Hello");
const closable = ref<boolean>(false);
const life = ref<number>();

const { options, config, reset } = usePlayground(
  {
    group: "",
    position: "top-right",
    autoZIndex: true,
    baseZIndex: 0
  },
  {
    position: { type: "select", options: position },
    baseZIndex: { disabled: (): boolean => options.value.autoZIndex }
  },
  () => {
    severity.value = "info";
    summary.value = "Hello";
    closable.value = false;
    life.value = undefined;
  }
);

const showToast = () => {
  toast.add({ severity: severity.value, summary: summary.value, closable: closable.value, group: options.value.group, life: life.value });
};

const code = computed(
  () => `
  <template>
    <Button label="Click me!" @click="showToast"/>
    <Toast />
  </template>
  
  <script setup lang="ts">
    import { useToast } from "primevue/usetoast";
    import Toast from "primevue/toast";  
    import Button from "primevue/button";
    
    const toast = useToast()
    
    const showToast = () => {
     toast.add({ severity: "${severity.value}", summary: "${summary.value}", closable: ${closable.value}, group: ${options.value.group}, life: ${life.value} })
    }
  <\/script>
`
);

const mainTsCode = `
  import ToastService from 'primevue/toastService'

  createApp(App)
    .use(PrimeVue, { unstyled: true, pt: Bootstrap_PT })
    .use(ToastService)
    .mount('#app')
`;
</script>
