<template>
  <ForgePageHeader title="Tooltip" />
  <p>
    Further documentation and examples can be found in the <a class="link" target="_blank"
                                                              href="https://primevue.org/tooltip/"><strong>PrimeVue
    documentation</strong></a>.
  </p>
  <Playground :options="options" :code="code" :config="config" @reset="reset">
    <template #component>
      <component :is="InputText" v-tooltip="options" v-show="pos === 'right'"/>
      <component :is="InputText" v-tooltip.left="options" v-show="pos === 'left'" />
      <component :is="InputText" v-tooltip.top="options" v-show="pos === 'top'" />
      <component :is="InputText" v-tooltip.bottom="options" v-show="pos === 'bottom'" />
    </template>
    <template #additionalOptions>
      <div>
        <label>Position</label>
        <Dropdown :options="position" v-model="pos" />
      </div>
    </template>
  </Playground>
</template>

<script setup lang="ts">
import { ForgePageHeader } from "@3squared/forge-ui-3";
import { Playground, usePlayground } from "@3squared/forge-playground-3";
import { computed, ref } from "vue";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";

const position = ['right', 'top', 'bottom', 'left']
const pos = ref<'right' | 'top' | 'bottom' | 'left'>('right') 

const { options, propVals, config, reset } = usePlayground({
  value: '',
  disabled: false,
  escape: true,
  fitContent: true,
  showDelay: 0,
  hideDelay: 0,
  autoHide: true
})

const code = computed(() => `<InputText v-tooltip.${pos.value}="'${options.value.value}'" />`)
</script>