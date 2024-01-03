<template>
  <ForgePageHeader title="Input Text" />
  <p>
    Further documentation and examples can be found in the <a class="link" target="_blank"
                                                              href="https://primevue.org/inputtext/"><strong>PrimeVue
    documentation</strong></a>.
  </p>
  <Playground :options="options" :code="code" :config="config" @reset="reset">
    <template #component>
      <component :is="InputText" v-bind="options" />
    </template>
  </Playground>
</template>

<script setup lang="ts">
import { ForgePageHeader } from "@3squared/forge-ui-3";
import InputText from 'primevue/inputtext'
import { Playground, usePlayground } from "@3squared/forge-playground-3";
import { computed, ref, watch } from "vue";
import { inputTextSizes } from "../../composables/playgroundOptions";

const size = ref()

const { options, propVals, config, reset } = usePlayground({
      size: ''
    },
    {
      size: { type: 'select', options: inputTextSizes }
    },
    () => {
      size.value = null
    })

watch(
    () => size.value,
    (size) => (options.value.size = size)
);


const code = computed(() => `<InputText${propVals.value.length > 0 ? " " + propVals.value.join(" ") : ""} />`)
</script>