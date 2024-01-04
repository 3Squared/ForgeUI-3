<template>
  <ForgePageHeader title="Chips" />
  <p>
    Further documentation and examples can be found in the <a class="link" target="_blank"
                                                              href="https://primevue.org/chips/"><strong>PrimeVue
    documentation</strong></a>.
  </p>
  <Playground :options="options" :code="code" :config="config" @reset="reset">
    <template #component>
      <component :is="ForgeChips" v-bind="options" />
    </template>
  </Playground>
</template>

<script setup lang="ts">
import { ForgePageHeader, ForgeChips } from "@3squared/forge-ui-3";
import { Playground, usePlayground } from "@3squared/forge-playground-3";
import { computed } from "vue";
import { severities } from "../../composables/playgroundOptions";

const { options, propVals, config, reset } = usePlayground({
  name: '',
  chipSeverity: severities[0],
  separator: ',',
  pill: false,
  max: 9999,
  addOnBlur: false,
  allowDuplicate: true,
  disabled: false,
  placeholder: ""
})

const code = computed(() => `<TextArea${propVals.value.length > 0 ? " " + propVals.value.join(" ") : ""} />`)
</script>