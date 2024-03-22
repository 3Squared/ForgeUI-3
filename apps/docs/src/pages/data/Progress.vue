<template>
  <div>
    <ForgePageHeader title="Progress Bar" />
    <Playground :options="options" :code="code" :config="config" @reset="reset">
      <template #component>
        <component :is="ForgeProgressBar" v-bind="options" class="w-100" />
      </template>
    </Playground>
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader, ForgeProgressBar } from "@3squared/forge-ui-3";
import { Playground, usePlayground } from "@3squared/forge-playground-3";
import { computed, ref } from "vue";
import { severities } from "../../composables/playgroundOptions";

const mode = ref(["determinate", "indeterminate"]);

const { options, propVals, config, reset } = usePlayground(
  {
    severity: severities[0],
    value: 50,
    mode: mode.value[0],
    striped: false,
    animate: false,
    showValue: true
  },
  {
    value: { disabled: (): boolean => !options.value.showValue },
    mode: { type: "select", options: mode.value },
    severity: { type: "select", options: severities }
  }
);

const code = computed(() => `<ForgeProgressBar${propVals.value.length > 0 ? " " + propVals.value.join(" ") : ""} />`);
</script>
