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
import { linkOffsets, linkOpacities, linkTarget, severities } from "../../composables/playgroundOptions";
import { computed } from "vue";

const { options, propVals, config, reset } = usePlayground(
  {
    label: "Hello",
    url: "",
    target: "_target",
    severity: "primary",
    opacity: "",
    underlineSeverity: "",
    underlineOffset: "",
    underlineOpacity: "",
    hoverOpacity: "",
    underlineHoverOpacity: "",
    animateIconOnHover: false,
    iconName: "",
    positionIconEnd: false
  },
  {
    severity: { type: "select", options: severities },
    opacity: { type: "select", options: linkOpacities },
    underlineSeverity: { type: "select", options: severities },
    underlineOffset: { type: "select", options: linkOffsets },
    underlineOpacity: { type: "select", options: ["0", ...linkOpacities] },
    hoverOpacity: { type: "select", options: linkOpacities },
    underlineHoverOpacity: { type: "select", options: linkOpacities },
    target: { type: "select", options: linkTarget },
    positionIconEnd: { disabled: (): boolean => !(options.value.iconName !== "") }
  },
  () => {}
);

const code = computed(() => `<ForgeLink${propVals.value.length > 0 ? " " + propVals.value.join(" ") : ""} />`);
</script>
