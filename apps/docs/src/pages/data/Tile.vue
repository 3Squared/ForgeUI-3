<template>
  <div>
    <ForgePageHeader title="Tile" />
    <Playground :options="options" :code="code" :config="config" @reset="reset">
      <template #component>
        <component :is="ForgeTile" v-bind="options" class="w-100" @button-click="console.log('registered click')">Content</component>
      </template>
    </Playground>
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader, ForgeTile } from "@3squared/forge-ui-3";
import { Playground, usePlayground } from "@3squared/forge-playground-3";
import { computed } from "vue";
import { severities } from "../../composables/playgroundOptions";

const barPositions = ["top", "left", "none"];

const { options, propVals, config, reset } = usePlayground(
  {
    severity: severities[0],
    barPosition: "none",
    clickable: false,
    selected: false
  },
  {
    severity: { type: "select", options: severities },
    barPosition: { type: "select", options: barPositions }
  }
);

const code = computed(() => `<ForgeTile${propVals.value.length > 0 ? " " + propVals.value.join(" ") : ""} @button-click="console.log('registered click')">Content</ForgeTile>`);
</script>
