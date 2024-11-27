<template>
  <div>
    <ForgePageHeader title="Fieldset" />
    <p>
      Further documentation and examples can be found in the
      <a class="link" target="_blank" href="https://v3.primevue.org/fieldset/"><strong>PrimeVue documentation</strong></a>
      .
    </p>
    <Playground :options="options" :code="code" :config="config" @reset="reset">
      <template #component>
        <component :is="Fieldset" v-bind="options">{{ content }}</component>
      </template>
    </Playground>
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader } from "@3squared/forge-ui-3";
import { Playground, usePlayground } from "@3squared/forge-playground-3";
import { computed, ref } from "vue";
import Fieldset from "primevue/fieldset";

const content = ref("Here is some example content!");

const { options, propVals, config, reset } = usePlayground({
  legend: "Header",
  toggleable: false
});
const code = computed(
  () => `
<template>
   <Fieldset ${propVals.value.length > 0 ? " " + propVals.value.join(" ") : ""} >{{content}}</Fieldset> 
</template>

<script setup lang="ts">
import Fieldset from "primevue/fieldset"; 

const content = ref("Here is some example content!");
</\script>
`
);
</script>
