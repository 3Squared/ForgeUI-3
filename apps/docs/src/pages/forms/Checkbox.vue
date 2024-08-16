<template>
  <div>
    <ForgePageHeader title="Checkbox" />
    <p>
      Further documentation and examples can be found in the
      <a class="link" target="_blank" href="https://primevue.org/checkbox/"><strong>PrimeVue documentation</strong></a>
      .
    </p>
    <Playground :options="options" :code="code" :config="config" @reset="reset">
      <template #component>
        <ForgeCheckbox v-model="value" v-bind="options"/>
      </template>
    </Playground>
  </div>
</template>

<script setup lang="ts">
import { ForgeCheckbox, ForgePageHeader } from "@3squared/forge-ui-3";
import { usePlayground, Playground } from "@3squared/forge-playground-3";
import { computed, ref } from "vue";

const { options, propVals, config, reset } = usePlayground(
  {
    label: "",
    name: "test",
    disabled: false,
    readonly: false,
    tabindex: 0
  },
  {}
);

const value = ref<boolean>(false);

const code = computed(() => {
  return `<ForgeCheckbox${propVals.value.length > 0 ? " " + propVals.value.join(" ") : ""} />`;
});
</script>
