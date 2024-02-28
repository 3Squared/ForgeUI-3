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
    <div class="ms-auto" v-if="showDragDropArea" :key="acceptedFileTypes.length" id="accepted-file-types">Accepted File Types: {{acceptedFileTypes.map((type) => type.split('/').pop()).join(", ")}}</div>
  </div>
</template>

<script setup lang="ts">
import { addFiles } from '../utilities/utilities'
import { computed } from "vue";
import { ForgeFileStatus } from "../../../types/forge-types";
import { Icon } from "@iconify/vue";

interface FileUploaderButtonProps {
  acceptedFileTypes: string[],
  maxFileInput: number,
  showDragDropArea: boolean
}

const files = defineModel<ForgeFileStatus[]>({ required: true })

const { acceptedFileTypes, maxFileInput, showDragDropArea } = defineProps<FileUploaderButtonProps>()

const uploadDisabled = computed<boolean>(() => maxFileInput <= files.value.length)

const addUploadedFiles = (filesToUpload : File[]) => {
  files.value = addFiles(filesToUpload, files.value, acceptedFileTypes, maxFileInput)
}
</script>