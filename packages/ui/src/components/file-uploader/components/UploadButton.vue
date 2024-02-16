<template>
  <div class="d-flex justify-content-between">
    <slot name="message" />
    <div>
      <input
          id="file-input"
          ref="fileUpload"
          type="file"
          class="d-none"
          :accept="acceptedFileTypes"
          :disabled="uploadDisabled"
          :multiple="multiple"
          @input="(event) => addFiles([...(event.target as any).files], files)"
      />
      <label :class="{ disabled: uploadDisabled }" class="btn btn-primary" for="file-input">
        {{ placeholder }}
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { addFiles } from '../utilities/utilities'
import { computed } from "vue";
import { ForgeFileStatus } from "../../../types/forge-types";

interface FileUploaderButtonProps {
  acceptedFileTypes: string,
  multiple: boolean,
  placeholder: string,
  maxFileInput: number,
  files: ForgeFileStatus[]
}

const { acceptedFileTypes, multiple, placeholder, maxFileInput, files } = defineProps<FileUploaderButtonProps>()

const uploadDisabled = computed<boolean>(() => maxFileInput <= files.length)

</script>