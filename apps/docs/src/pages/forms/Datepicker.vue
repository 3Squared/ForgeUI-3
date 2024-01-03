<template>
  <ForgePageHeader title="Datepicker" />
  <p>
    Further documentation and examples can be found in the <a class="link" target="_blank"
                                                              href="https://primevue.org/calendar/"><strong>PrimeVue
    documentation</strong></a>.
  </p>
  <Playground :options="options" :code="code" :config="config" @reset="reset">
    <template #component>
      <component :is="ForgeDatepicker" v-bind="options" v-model="value" />
    </template>
  </Playground>
</template>

<script setup lang="ts">
import { ForgeDatepicker, ForgePageHeader } from '@3squared/forge-ui-3'
import { Playground, usePlayground } from "@3squared/forge-playground-3";
import { computed, ref } from "vue";
import { severities } from "../../composables/playgroundOptions";

const { options, propVals, config, reset } = usePlayground({
      selectionMode: "single",
      view: "date",
      dateFormat: "dd/mm/yy",
      severity: "primary",
      showOtherMonths: true,
      showIcon: true,
      numberOfMonths: 1,
      showButtonBar: true,
      showOnFocus: true, // Crucial prop for Calendar, overlay won't show without this.
      autoZIndex: true,
      inline: false,
      baseZIndex: 0
    },
    {
      selectionMode: { type: "select", options: ['single', 'multiple', 'range'], required: false },
      view: { type: "select", options: ['month', 'year', 'date'], required: false },
      severity: { type: "select", options: severities, required: false }
    })

const value = ref()

const code = computed(() => `<ForgeDatepicker${propVals.value.length > 0 ? " " + propVals.value.join(" ") : ""} />`);
</script>