<template>
  <UploadButton v-bind="props" v-model="files" />
  <DragDropArea :max-file-input="props.maxFileInput" v-model="files">
    <span v-for="({ file }, index) in files">
      <FileInfo
          :key="file.name"
          :class="index === files.length - 1 || files.length == 1 ? '' : 'border-bottom'"
          v-model="files[index].file"
          v-bind="props"
      />
    </span>
  </DragDropArea>
  <MaxFileSize :max-file-size="props.maxFileSize"/>
</template>

<script setup lang="ts">
import UploadButton from "@/components/file-uploader/components/UploadButton.vue";
import DragDropArea from "@/components/file-uploader/components/DragDropArea.vue";
import FileInfo from "@/components/file-uploader/components/FileInfo.vue";
import MaxFileSize from "@/components/file-uploader/components/MaxFileSize.vue";
import { ForgeFileStatus } from "../../types/forge-types";
import { ref } from "vue";
import {TypedSchema} from "vee-validate";

const files = ref<ForgeFileStatus[]>([])
export interface ForgeFileUploaderProps {
  acceptedFileTypes: string,
  maxFileSize: number,
  placeholder?: string,
  customFileNameRules?: TypedSchema,
  maxFileInput?: number,
  multiple?: boolean,
  editableFileName?: boolean
}

const props = withDefaults(defineProps<ForgeFileUploaderProps>(), {
  maxFileInput: 3,
  multiple: true,
  editableFileName: false,
  placeholder: "Browse your computer"
})
</script>