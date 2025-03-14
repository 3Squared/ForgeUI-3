<template>
  <div
      id="drag-drop-area"
      :class="`${ dragInput ? 'border-2 border-primary bg-body-tertiary' : '' } mt-3 file-container border-dashed border-2`"
      @dragleave.prevent="dragInput = false"
      @dragover.prevent="dragInput = true"
      @drop.prevent="dropFiles"
  >
    <div v-if="files.length === 0" class="py-4 px-3" id="placeholder-message">
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
import { ForgeFileStatus, ForgeFileType } from "@/types/forge-types.ts";

interface DragDropAreaProps {
  maxFileInput: number,
  maxFileSize: number,
  acceptedFileTypes: ForgeFileType[]
}

const { acceptedFileTypes, maxFileInput, maxFileSize } = defineProps<DragDropAreaProps>()

const files = defineModel<ForgeFileStatus[]>({ required: true })

const dragInput = ref<boolean>(false)

const uploadDisabled = computed<boolean>(() => maxFileInput <= files.value.length)

const dropFiles = (event: any) => {
  dragInput.value = false
  if (event.dataTransfer.files.length > maxFileInput || uploadDisabled.value) {
    event.preventDefault()
  } else {
    files.value = addFiles([...event.dataTransfer.files], files.value, acceptedFileTypes.map(ft => ft.fileType), maxFileSize)
  }
}
</script>