<template>
  <div class="d-flex justify-content-between">
    <slot name="message" />
    <div>
      <input
          id="file-input"
          ref="fileUpload"
          type="file"
          class="d-none"
          :accept="acceptedFileTypes.join(', ')"
          :disabled="uploadDisabled"
          :multiple="multiple"
          @input="(event) => addUploadedFiles([...(event.target as any).files])"
      />
      <label :class="{ disabled: uploadDisabled }" class="btn btn-primary" for="file-input">
        {{ placeholder }}
      </label>
    </div>
    <div class="ms-auto">Accepted File Types: {{acceptedFileTypes.join(", ")}}</div>
  </div>
</template>

<script setup lang="ts">
import { addFiles } from '../utilities/utilities'
import { computed } from "vue";
import { ForgeFileStatus } from "../../../types/forge-types";

interface FileUploaderButtonProps {
  acceptedFileTypes: string[],
  multiple: boolean,
  placeholder: string,
  maxFileInput: number
}

const files = defineModel<ForgeFileStatus[]>({ required: true })

const { acceptedFileTypes, multiple, placeholder, maxFileInput } = defineProps<FileUploaderButtonProps>()

const uploadDisabled = computed<boolean>(() => maxFileInput <= files.value.length)

const addUploadedFiles = (filesToUpload : File[]) => {
  files.value = addFiles(filesToUpload, files.value)
}
</script>