<template>
  <div>
    <ForgePageHeader title="Stat Widget" />
    <Playground :options="options" :code="code" :config="config" @reset="reset">
      <template #component>
        <component :is="ForgeStatWidget" v-bind="options" class="w-100">Stat</component>
      </template>
    </Playground>
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader, ForgeStatWidget } from "@3squared/forge-ui-3";
import { Playground, usePlayground } from "@3squared/forge-playground-3";
import { computed } from "vue";
import { severities, shorthandSizes } from "../../composables/playgroundOptions";

const { options, propVals, config, reset } = usePlayground(
  {
    severity: severities[0],
    size: shorthandSizes[1]
  },
  {
    severity: { type: "select", options: severities },
    size: { type: "select", options: shorthandSizes }
  }
);

const code = computed(() => `<ForgeStatWidget${propVals.value.length > 0 ? " " + propVals.value.join(" ") : ""} />`);
</script>
