<template>
  <div>
    <ForgePageHeader title="Chip" />
    <p>
      Further documentation and examples can be found in the
      <a class="link" target="_blank" href="https://primevue.org/chip/"><strong>PrimeVue documentation</strong></a>
      .
    </p>
    <Playground :options="options" :code="code" :config="config" @reset="reset">
      <template #component>
        <component :is="ForgeChip" v-bind="options" />
      </template>
    </Playground>
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader, ForgeChip } from "@3squared/forge-ui-3";
import { Playground, usePlayground } from "@3squared/forge-playground-3";
import { computed } from "vue";
import { severities } from "../../../composables/playgroundOptions";

const { options, propVals, config, reset } = usePlayground(
  {
   label: "Chip",
    removable: false,
    chipSeverity: severities[0],
    pill: false
  },
    {
      chipSeverity: { type: "select", options: severities }
    }
);

const code = computed(() => `<ForgeChip${propVals.value.length > 0 ? " " + propVals.value.join(" ") : ""} />`);
</script>
