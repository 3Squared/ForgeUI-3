<template>
  <div v-bind="$attrs" :class='`d-flex shadow m-2 align-items-center widget--${props.size} bg-${props.variant}`'>
    <span class="value text-light w-100 text-center">
      <slot />
    </span>
  </div>
</template>

<script setup lang="ts">
import { Size, Variant } from "../../forge-types";

export interface ForgeStatWidgetProps {
  size?: Size,
  variant?: Variant
}

const props = withDefaults(defineProps<ForgeStatWidgetProps>(), {
  size: 'md',
  variant: 'primary'
})
</script>