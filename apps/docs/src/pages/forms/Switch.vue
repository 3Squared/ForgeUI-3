<template>
  <div>
    <ForgePageHeader title="Switch" />
    <p>
      Further documentation and examples can be found in the
      <a class="link" target="_blank" href="https://primevue.org/inputswitch/"><strong>PrimeVue documentation</strong></a>
      .
    </p>
    <Playground :options="options" :code="code" :config="config" @reset="reset">
      <template #component>
        <component :is="InputSwitch" v-bind="options" v-model="value" />
      </template>
    </Playground>
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader } from "@3squared/forge-ui-3";
import InputSwitch from "primevue/inputswitch";
import { Playground, usePlayground } from "@3squared/forge-playground-3";
import { computed, ref } from "vue";

const { options, propVals, config, reset } = usePlayground({
  trueValue: "true",
  falseValue: "false",
  disabled: false,
  readonly: false,
  tabindex: 0
});

const value = ref<boolean>(false);

const code = computed(() => {
  return `<InputSwitch${propVals.value.length > 0 ? " " + propVals.value.join(" ") : ""} />`;
});
</script>
