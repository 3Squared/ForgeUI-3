<template>
  <div>
    <ForgePageHeader title="Link" />
    <p>
      Further documentation and examples can be found in the
      <a class="link" target="_blank" href="https://getbootstrap.com/docs/5.3/utilities/link/"><strong>Bootstrap Documentation</strong></a>
      .
    </p>
    <Playground :options="options" :code="code" :config="config" @reset="reset">
      <template #component>
        <component :is="ForgeLink" v-bind="options" />
      </template>
    </Playground>
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader, ForgeLink } from "@3squared/forge-ui-3";
import { Playground, usePlayground } from "@3squared/forge-playground-3";
import { linkOffsets, linkOpacities, severities } from "../../composables/playgroundOptions";
import { computed } from "vue";

const { options, propVals, config, reset } = usePlayground(
    {
      label: "Hello",
      severity: severities[0],
      underlineSeverity: severities[0],
      underlineOffset: '0',
      underlineOpacity: '100',
      hoverOpacity: '100',
      underlineHoverOpacity: '100'
    },
    {
      severity: { type: "select", options: severities },
      underlineSeverity: { type: "select", options: severities },
      underlineOffset: { type: "select", options: linkOffsets },
      underlineOpacity: { type: "select", options: linkOpacities },
      hoverOpacity: { type: "select", options: linkOpacities },
      underlineHoverOpacity: { type: "select", options: linkOpacities },
    },
    () => {
    }
);

const code = computed(() => `<ForgeLink${propVals.value.length > 0 ? " " + propVals.value.join(" ") : ""} />`);
</script>
