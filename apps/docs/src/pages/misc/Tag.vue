<template>
  <div>
    <ForgePageHeader title="Tag" />
    <p>
      Further documentation and examples can be found in the
      <a class="link" target="_blank" href="https://primevue.org/badge/"><strong>PrimeVue documentation</strong></a>
      .
    </p>
    <Playground :options="options" :code="code" :config="config" @reset="reset">
      <template #component>
        <component :is="Tag" v-bind="options" />
      </template>
    </Playground>
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader } from "@3squared/forge-ui-3";
import Tag from "primevue/tag";
import { Playground, usePlayground } from "@3squared/forge-playground-3";
import { computed } from "vue";
import { severities } from "../../composables/playgroundOptions";

const { options, propVals, config, reset } = usePlayground(
  {
    value: "I am a tag",
    severity: severities[0],
    rounded: false
  },
  {
    severity: { type: "select", options: severities }
  }
);

const code = computed(() => `<Tag${propVals.value.length > 0 ? " " + propVals.value.join(" ") : ""} />`);
</script>
