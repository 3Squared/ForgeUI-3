<template>
  <div
      :class="`${dragInput ? 'drag-border' : ''} mt-3 file-container border-dashed`"
      @dragleave.prevent="dragInput = false"
      @dragover.prevent="dragInput = true"
      @drop.prevent="dropFiles"
  >
    <div v-if="files.length === 0" class="py-4 px-3">
      <Icon icon="bi:upload" class="me-2" height="20px" width="20px" />
      Drag and drop files here
    </div>
    <div v-else class="d-flex flex-column">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { addFiles } from '../utilities/utilities'
import { computed, ref, defineModel } from "vue";
import { ForgeFileStatus } from "../../../types/forge-types";

interface DragDropAreaProps {
  maxFileInput: number
}

const { maxFileInput } = defineProps<DragDropAreaProps>()

const files = defineModel<ForgeFileStatus[]>({ required: true })

const dragInput = ref<boolean>(false)

const uploadDisabled = computed<boolean>(() => maxFileInput <= files.value.length)

const dropFiles = (event: any) => {
  dragInput.value = false
  if (event.dataTransfer.files.length > maxFileInput || uploadDisabled.value) {
    event.preventDefault()
  } else {
    files.value = addFiles([...event.dataTransfer.files], files.value)
  }
}
</script>