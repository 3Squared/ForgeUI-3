<template>
  <ForgePageHeader title="Toast" />
  <Playground :options="options" :code="code" :config="config" @reset="reset">
    <template #component>
      <Button label="Show Toast!" @click="showToast"/>
      <component :is="Toast" v-bind="options" class="w-100">Stat</component>
    </template>
    <template #additionalOptions>
      <h5 class="mt-4">Message Options</h5>
      <div>
        <label>Severity</label>
        <Dropdown :options="severities" v-model="severity" />
      </div>
      <ForgeFormField label="Summary" type="text" v-model="summary" class="my-2" />
      <ForgeFormField label="Closable" type="checkbox" v-model="closable"/>
      <ForgeFormField label="Life" type="number" v-model="life" class="mt-2" />
    </template>
  </Playground>
  Make sure to include the ToastService plugin in your main.ts file.
  <CodeBlock :code="mainTsCode" />
</template>

<script setup lang="ts">
import { ForgePageHeader, ForgeFormField } from "@3squared/forge-ui-3";
import { CodeBlock, Playground, usePlayground } from "@3squared/forge-playground-3";
import { computed, ref } from "vue";
import Toast from "primevue/toast";
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import { useToast } from "primevue/usetoast";

const position = ['center', 'top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right']
const severities = ['info', 'success', 'warn', 'error'] 

const toast = useToast();
const severity = ref<'info' | 'success' | 'warn' | 'error'>('info') 
const summary = ref<string>("Hello")
const closable = ref<boolean>(false)
const life = ref<number>()

const { options, propVals, config, reset } = usePlayground({
  group: '',
  position: 'top-right',
  autoZIndex: true,
  baseZIndex: 0
}, {
  position: { type: 'select', options: position },
  baseZIndex: { disabled: (): boolean => options.value.autoZIndex }
}, () => {
  severity.value = 'info'
  summary.value = "Hello"
  closable.value = false
  life.value = undefined
})

const showToast = () => {
    toast.add({ severity: severity.value, summary: summary.value, closable: closable.value, group: options.value.group, life: life.value})
}

const code = computed(() => `
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
`)

const mainTsCode = `
  import ToastService from 'primevue/toastService'

  createApp(App)
    .use(PrimeVue, { unstyled: true, pt: Bootstrap_PT })
    .use(ToastService)
    .mount('#app')
`
</script>