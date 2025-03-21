<template>
  <Button v-if="props.clickable" class="d-flex w-100 p-0 text-body" :severity="props.severity" :class="buttonClass" unstyled data-cy="button-tile">
    <div class="p-4 text-wrap w-100">
      <!-- 
        @slot Allows for content to be inserted into the Tile.
      -->
      <slot>Tile Content</slot>
    </div>
  </Button>
  <div v-else class="d-flex w-100" :class="tileClass" data-cy="tile">
    <div class="p-4 text-wrap w-100">
      <!-- 
        @slot Allows for content to be inserted into the Tile.
      -->
      <slot>Tile Content</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Severity, BarPosition } from "../types/forge-types";
import { computed } from "vue";

export interface ForgeTileProps {
  severity?: Severity,
  barPosition: BarPosition,
  clickable: boolean,
  selected?: boolean
}

const props = withDefaults(defineProps<ForgeTileProps>(), {
  severity: 'primary',
  barPosition: 'none',
  clickable: false,
  selected: false
})

const buttonClass = computed(() => {
  return `${props.severity === undefined ? `tile-primary` : `tile-${props.severity}`} ${props.barPosition === 'none' ? '' : `tile-bar-${props.barPosition}`} ${props.selected ? 'selected' : ''}`
})

const tileClass = computed(() => {
  return `${props.severity === undefined ? `tile-primary border-primary` : `tile-${props.severity} border-${props.severity}`} ${props.barPosition === 'none' ? '' : `tile-bar-${props.barPosition}`} ${props.selected ? 'selected' : ''}`
})
</script>