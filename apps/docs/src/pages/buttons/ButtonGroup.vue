<template>
  <div>
    <ForgePanel class="mb-3" header="Select Button" toggleable collapsed>
      This Forge Select button component will allow you to customise each button with a specific severity. An option not available in the
      <a class="link" target="_blank" href="https://primevue.org/selectbutton/"><strong>PrimeVue
        Select Button</strong></a>
    </ForgePanel>
    <playground :options="options" :config="config" :code="code" display-value @reset="reset">
      <template #component>
        <component :is="ForgeSelectButton" v-bind="options" v-model="value" :options="opts"  />
      </template>
      <template #value>
        {{ value }}
      </template>
    </playground>
  </div>
</template>

<script setup lang="ts">
import { ForgeSelectButton, ForgePanel } from "@3squared/forge-ui-3";
import type { ForgeSelectButtonOption } from "@3squared/forge-ui-3/src/types/forge-types";
import { Playground, usePlayground } from "@3squared/forge-playground-3";
import { computed, ref } from "vue";

const opts = ref<ForgeSelectButtonOption[]>([
  { label: "Maj", value: "1", severity: "danger", disabled: true, },
  { label: "Min", value: "2", severity: "warning"},
  { label: "Pro", value: "3", severity: "success" },
  { label: "Ex", value: "4", severity: "success-alternate" },
  { label: "N/A", value: "5", severity: "secondary" }
]);

const value = ref();

const { options, propVals, config, reset } = usePlayground(
    {
      multiple: false,
      allowEmpty: true,
    },
    {}
);

const code = computed(() => {
  return `
<template>
 <ForgeSelectButton ${propVals.value.join(" ")} v-model="value" :options="opts" />
</template>

<script setup lang="ts">
import { ForgeSelectButton } from "@3squared/forge-ui-3";
import type { ForgeSelectButtonOption } from "@3squared/forge-ui-3/src/types/forge-types";

const value = ref()
const opts = ref<ForgeSelectButtonOption[]>([
  { label: "Maj", value: "1", severity: "danger", disabled: true, },
  { label: "Min", value: "2", severity: "warning" },
  { label: "Pro", value: "3", severity: "success" },
  { label: "Ex", value: "4", severity: "success-dark" },
  { label: "N/A", value: "5", severity: "secondary" }
]);
<\/script>
`;
});
</script>