<template>
  <div>
    <ForgePageHeader title="Toggle Button" />
    <playground :options="options" :config="config" :code="code" display-value @reset="reset">
      <template #component>
        <component :is="ForgeToggleButton" v-bind="options" v-model="checked" />
      </template>
      <template #value>
        {{ checked }}
      </template>
    </playground>
  </div>
</template>

<script setup lang="ts">
import { ForgeToggleButton, ForgePageHeader } from "@3squared/forge-ui-3";
import { Playground, usePlayground } from "@3squared/forge-playground-3";
import { computed, ref } from "vue";
import { severities } from "../../composables/playgroundOptions";

const checked = ref(false);

const { options, propVals, config, reset } = usePlayground(
    {
      severity: severities[0],
    },
    { severity: { type: "select", options: severities },}
);

const code = computed(() => {
  return `
<template>
 <ForgeToggleButton ${propVals.value.join(" ")} v-model="opts"/>
</template>

<script setup lang="ts">
import { ForgeToggleButton } from "@3squared/forge-ui-3";

const checked = ref(false);
<\/script>
`;
});
</script>