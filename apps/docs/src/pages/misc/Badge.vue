<template>
  <div>
    <ForgePageHeader title="Badge" />
    <p>
      Further documentation and examples can be found in the
      <a class="link" target="_blank" href="https://primevue.org/badge/"><strong>PrimeVue documentation</strong></a>
      .
    </p>
    <Playground :options="options" :code="code" :config="config" @reset="reset">
      <template #component>
        <component :is="Badge" v-bind="options" />
      </template>
    </Playground>
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader } from "@3squared/forge-ui-3";
import Badge from 'primevue/badge'
import { Playground, usePlayground } from "@3squared/forge-playground-3";
import { computed, ref } from "vue";
import { severities, sizes } from "../../composables/playgroundOptions";

const { options, propVals, config, reset } = usePlayground(
    {
      value: 'Forge.UI',
      severity: severities[0],
      size: sizes[0],
    },
    {
      severity: { type: "select", options: severities },
      size: { type: "select", options: sizes }
    }
);

const code = computed(() => `<Badge${propVals.value.length > 0 ? " " + propVals.value.join(" ") : ""} />`);
</script>
