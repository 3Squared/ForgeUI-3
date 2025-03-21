<template>
  <div class="d-flex justify-content-end mt-1 gap-1">
    <div id="max-file-size">Max file size: {{ formatFileSize(maxFileSize) }}</div>
    <div id="max-file-input">| Max file count: {{ maxFileInput }}</div>
  </div>
</template>

<script setup lang="ts">
import { formatFileSize } from '../utilities/utilities'

interface FileInputInfoProps {
  maxFileSize: number,
  maxFileInput: number
}

defineProps<FileInputInfoProps>()
</script>