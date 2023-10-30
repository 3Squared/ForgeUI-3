<template>
  <div class="forge-loader">
    <progress-spinner animation-duration=".75" :class="`text-${props.variant === undefined ? 'primary': props.variant }`"/>
  </div>
</template>

<script setup lang="ts">
import { Variant } from "../types/forge-types";

export interface ForgeLoaderProps {
  variant? : Variant
}

const props = withDefaults(defineProps<ForgeLoaderProps>(), {
  variant: 'primary'
})
</script>