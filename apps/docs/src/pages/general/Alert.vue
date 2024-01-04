<template>
  <ForgePageHeader title="Alert" />
  <p>
    Further documentation and examples can be found in the <a class="link" target="_blank"
                                                              href="https://primevue.org/message/"><strong>PrimeVue
    documentation</strong></a>.
  </p>
  <Playground :options="options" :code="code" :config="config" @reset="reset">
    <template #component>
      <component :is="ForgeAlert" v-bind="options">{{ content }}</component>
    </template>
  </Playground>
</template>

<script setup lang="ts">
import { ForgeAlert, ForgePageHeader } from "@3squared/forge-ui-3";
import { Playground, usePlayground } from "@3squared/forge-playground-3";
import { computed, ref } from "vue";
import { severities } from "../../composables/playgroundOptions";

const content = ref("Alert");

const { options, propVals, config, reset } = usePlayground({
    sticky: true,
    severity: severities[0],
    closable: false,
    icon: ''
  },
    {
      severity: { type: 'select', options: severities}
    })

const code = computed(() => `<ForgeAlert${propVals.value.length > 0 ? " " + propVals.value.join(" ") : ""} />`)
</script>