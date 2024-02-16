<template>
  <div class="d-flex justify-content-end mt-1">
    <div>Max file size: {{ formatFileSize(maxFileSize) }}</div>
  </div>
</template>

<script setup lang="ts">
import { formatFileSize } from '../utilities/utilities'

interface MaxFileSizeProps {
  maxFileSize: number
}

const { maxFileSize } = defineProps<MaxFileSizeProps>()
</script>