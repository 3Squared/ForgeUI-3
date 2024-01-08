<template>
  <ForgePageHeader title="Loader" />
  <p>
    Further documentation and examples can be found in the <a class="link" target="_blank"
                                                              href="https://primevue.org/button/"><strong>PrimeVue
    documentation</strong></a>.
  </p>
  <Playground :options="options" :code="code" :config="config" @reset="reset">
    <template #component>
      <component :is="ForgeLoader" v-bind="options" />
    </template>
  </Playground>
</template>

<script setup lang="ts">
import { ForgePageHeader, ForgeLoader } from "@3squared/forge-ui-3";
import { Playground, usePlayground } from "@3squared/forge-playground-3";
import { computed } from "vue";
import { severities } from "../../composables/playgroundOptions";

const { options, propVals, config, reset } = usePlayground({
  severity: severities[0]
}, {
  severity: { type: 'select', options: severities }
})

const code = computed(() => `<ForgeLoader${propVals.value.length > 0 ? " " + propVals.value.join(" ") : ""} />`)
</script>