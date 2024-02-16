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
      <span v-for="({ file }, index) in files">
        <FileInfo
            :key="file.name"
            :file="file"
            :class="index === files.length - 1 || files.length == 1 ? '' : 'border-bottom'"
        />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { addFiles } from '../utilities/utilities'
import { computed, ref } from "vue";
import { ForgeFileStatus } from "../../../types/forge-types";

interface DragDropAreaProps {
  maxFileInput: number,
  files: ForgeFileStatus[]
}

const { maxFileInput, files } = defineProps<DragDropAreaProps>()

const uploadDisabled = computed<boolean>(() => maxFileInput <= files.length)

const dragInput = ref<boolean>(false)

const dropFiles = (event: any) => {
  dragInput.value = false
  if (event.dataTransfer.files.length > maxFileInput || uploadDisabled.value) {
    event.preventDefault()
  } else {
    addFiles([...event.dataTransfer.files], files)
  }
}
</script>