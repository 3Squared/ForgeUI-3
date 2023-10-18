<template>
  <div :class="remainingCount < 0 ? 'text-danger' : ''">Remaining characters: {{ remainingCount }}</div>
</template>

<script setup lang="ts">
import { computed } from "vue"

export interface RemainingCharactersProps {
  maxCount: number,
  currentCount: number
}

const props = defineProps<RemainingCharactersProps>()

const remainingCount = computed(() => props.maxCount - props.currentCount);
</script>