<template>
  <div>
    <ForgePageHeader title="Panel" />
    <p>
      Further documentation and examples can be found in the
      <a class="link" target="_blank" href="https://primevue.org/panel/"><strong>PrimeVue documentation</strong></a>
      .
    </p>
    <Playground :options="options" :code="code" :config="config" @reset="reset">
      <template #component>
        <component :is="ForgePanel" v-bind="options">{{ content }}</component>
      </template>
    </Playground>
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader, ForgePanel } from "@3squared/forge-ui-3";
import { Playground, usePlayground } from "@3squared/forge-playground-3";
import { computed, ref } from "vue";

const content = ref("I am some panel content");

const { options, propVals, config, reset } = usePlayground(
  {
    toggleable: true,
    header: "Header"
  },
  {}
);

const code = computed(() => `<ForgePanel${propVals.value.length > 0 ? " " + propVals.value.join(" ") : ""}> <ForgePanel />`);
</script>
