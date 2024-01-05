<template>
  <div class="forge-loader">
    <progress-spinner animation-duration=".75" :class="`text-${props.severity === undefined ? 'primary': props.severity }`"/>
  </div>
</template>

<script setup lang="ts">
import { Severity } from "../types/forge-types";

export interface ForgeLoaderProps {
  severity? : Severity
}

const props = withDefaults(defineProps<ForgeLoaderProps>(), {
  severity: 'primary'
})
</script>