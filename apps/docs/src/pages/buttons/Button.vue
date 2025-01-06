<template>
  <div>
    <ForgePageHeader title="Button" />
    <p>
      Further documentation and examples can be found in the
      <a class="link" target="_blank" href="https://primevue.org/button/"><strong>PrimeVue documentation</strong></a>
      .
    </p>
    <Playground :options="options" :code="code" :config="config" @reset="reset">
      <template #component>
        <component :is="Button" v-bind="options" />
      </template>
    </Playground>
    
    <ExampleButton />
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader } from "@3squared/forge-ui-3";
import Button from "primevue/button";
import { Playground, usePlayground } from "@3squared/forge-playground-3";
import { computed, ref } from "vue";
import { severities, sizes } from "../../composables/playgroundOptions";
import ExampleButton from "./examples/ExampleButton.vue";

const badge = ref("");

const { options, propVals, config, reset } = usePlayground(
  {
    label: "Button",
    severity: severities[0],
    raised: false,
    rounded: false,
    text: false,
    outlined: false,
    loading: false,
    link: false,
    badge: badge.value,
    badgeClass: "",
    badgeSeverity: "",
    size: ""
  },
  {
    label: { required: true },
    size: { type: "select", options: sizes },
    severity: { type: "select", options: severities },
    badgeSeverity: { type: "select", options: severities, disabled: (): boolean => options.value.badge === "" },
    badgeClass: { disabled: (): boolean => options.value.badge === "" }
  },
  () => {
    badge.value = "";
  }
);

const code = computed(() => `<Button${propVals.value.length > 0 ? " " + propVals.value.join(" ") : ""} />`);
</script>
