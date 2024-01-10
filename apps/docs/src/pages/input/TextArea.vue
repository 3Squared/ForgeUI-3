<template>
  <div>
    <ForgePageHeader title="Text Area" />
    <p>
      Further documentation and examples can be found in the
      <a class="link" target="_blank" href="https://primevue.org/textarea/"><strong>PrimeVue documentation</strong></a>
      .
    </p>
    <Playground :options="options" :code="code" :config="config" @reset="reset">
      <template #component>
        <component :is="TextArea" v-bind="options" />
      </template>
    </Playground>
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader } from "@3squared/forge-ui-3";
import TextArea from "primevue/textarea";
import { Playground, usePlayground } from "@3squared/forge-playground-3";
import { computed } from "vue";

const { options, propVals, config, reset } = usePlayground({
  autoResize: false
});

const code = computed(() => `<TextArea${propVals.value.length > 0 ? " " + propVals.value.join(" ") : ""} />`);
</script>
