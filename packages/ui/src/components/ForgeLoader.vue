<template>
  <div :class="inLine ? '': 'forge-loader'">
    <progress-spinner animation-duration=".75" :class="`text-${props.severity === undefined ? 'primary': props.severity }`" :pt="pt"/>
  </div>
</template>

<script setup lang="ts">
import { Severity } from "../types/forge-types";
import { computed } from "vue";
import { ProgressSpinnerPassThroughOptions } from "primevue";

export interface ForgeLoaderProps {
  severity?: Severity,
  inLine?: boolean,
}

const props = withDefaults(defineProps<ForgeLoaderProps>(), {
  severity: 'primary',
  inLine: false
})


const pt = computed<ProgressSpinnerPassThroughOptions>(() => ({
  spin: () => ({
    class: [
      'spinner-border',
      {
        'spinner-border-sm': props.inLine
      }
    ]
  })
}))

</script>