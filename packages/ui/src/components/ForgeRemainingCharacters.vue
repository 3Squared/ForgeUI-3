<template>
  <div :class="remainingCount < 0 ? 'text-danger' : ''">Remaining characters: {{ remainingCount }}</div>
</template>

<script setup lang="ts">
import { computed } from "vue"

const props = defineProps({
  maxCount: {
    type: Number,
    required: true
  },
  currentCount: {
    type: Number,
    required: true
  }
})

const remainingCount = computed(() => props.maxCount - props.currentCount);
</script>