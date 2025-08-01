<template>
  <div class="d-flex justify-content-between">
    <slot name="message" />
    <div>
      <input
          id="file-input"
          type="file"
          class="d-none"
          :accept="acceptedFileTypes.join(', ')"
          :disabled="uploadDisabled"
          :multiple="maxFileInput > 1"
          @input="(event) => addUploadedFiles([...(event.target as any).files])"
      />
      <label :class="{ disabled: uploadDisabled }" class="btn btn-primary" id="file-input-button" for="file-input">
        <slot name="button-content">
          <Icon icon="bi:upload" class="me-2" height="20px" width="20px" />
          Browse your computer
        </slot>
      </label>
    </div>
    <Button link class="ms-auto" v-if="showDragDropArea" :key="acceptedFileTypes.length" id="accepted-file-types" @click="toggleAcceptedFileTypesOverlay">Accepted File Types</Button>
    <Popover ref="acceptedFilesOverlay">
      <div class="text-break accepted-file-types-container" id="accepted-file-types-overlay">
        {{acceptedFileTypes.map((type) => (type.label ?? type.fileType.split('/').pop())).join(", ")}}
      </div>
    </Popover>
<!--    : {{acceptedFileTypes.map((type) => type.split('/').pop()).join(", ")}}-->
  </div>
</template>

<script setup lang="ts">
import { addFiles } from '../utilities/utilities'
import { computed, ref } from "vue";
import { ForgeFileStatus, ForgeFileType } from "../../../types/forge-types";
import Popover from "primevue/popover"
import { Icon } from "@iconify/vue";

interface FileUploaderButtonProps {
  acceptedFileTypes: ForgeFileType[],
  maxFileInput: number,
  maxFileSize: number,
  showDragDropArea: boolean
}

const files = defineModel<ForgeFileStatus[]>({ required: true })
const acceptedFilesOverlay = ref()

const toggleAcceptedFileTypesOverlay = (event: Event) => acceptedFilesOverlay.value.toggle(event)

const { acceptedFileTypes, maxFileInput, maxFileSize, showDragDropArea } = defineProps<FileUploaderButtonProps>()

const uploadDisabled = computed<boolean>(() => maxFileInput <= files.value.length)

const addUploadedFiles = (filesToUpload : File[]) => {
  files.value = addFiles(filesToUpload, files.value, acceptedFileTypes.map(ft => ft.fileType), maxFileSize)
}
</script>