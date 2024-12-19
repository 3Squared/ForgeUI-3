<template>
  <div>
    <ForgePageHeader title="Tooltip" />
    <p>
      Further documentation and examples can be found in the
      <a class="link" target="_blank" href="https://primevue.org/tooltip/"><strong>PrimeVue documentation</strong></a>
      .
    </p>
    <Playground :options="options" :code="code" :config="config" @reset="reset">
      <template #component>
        <component :is="InputText" v-show="pos === 'right'" v-tooltip="options" />
        <component :is="InputText" v-show="pos === 'left'" v-tooltip.left="options" />
        <component :is="InputText" v-show="pos === 'top'" v-tooltip.top="options" />
        <component :is="InputText" v-show="pos === 'bottom'" v-tooltip.bottom="options" />
      </template>
      <template #additionalOptions>
        <div>
          <label>Position</label>
          <Select v-model="pos" :options="position" />
        </div>
      </template>
    </Playground>
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader } from "@3squared/forge-ui-3";
import { Playground, usePlayground } from "@3squared/forge-playground-3";
import { computed, ref } from "vue";
import InputText from "primevue/inputtext";
import Select from "primevue/select";

const position = ["right", "top", "bottom", "left"];
const pos = ref<"right" | "top" | "bottom" | "left">("right");

const { options, config, reset } = usePlayground({
  value: "Hello I'm a tooltip!",
  escape: true,
  fitContent: true,
});

const code = computed(() => `<InputText v-tooltip.${pos.value}="'${options.value.value}'" />`);
</script>
