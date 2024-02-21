<template>
  <div data-cy="file-uploader">
    <UploadButton v-bind="props" v-model="files" />
    <div v-if="showDragDropArea">
      <DragDropArea :max-file-input="props.maxFileInput" :max-file-size="props.maxFileSize" :accepted-file-types="props.acceptedFileTypes" v-model="files">
      <span v-for="({ file }, index) in files">
        <FileInfo
            :key="file.name"
            :class="index === files.length - 1 || files.length == 1 ? '' : 'border-bottom'"
            v-model:file="files[index].file"
            v-model:blob-file-name="files[index].blobFileName"
            v-model:upload-status="files[index].status"
            v-bind="props"
            @deleted="deleteFiles"
        />
      </span>
      </DragDropArea>
      <MaxFileSize :max-file-size="props.maxFileSize"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import UploadButton from "@/components/file-uploader/components/UploadButton.vue";
import DragDropArea from "@/components/file-uploader/components/DragDropArea.vue";
import FileInfo from "@/components/file-uploader/components/FileInfo.vue";
import MaxFileSize from "@/components/file-uploader/components/MaxFileSize.vue";
import { ForgeFileStatus } from "../../types/forge-types";
import {TypedSchema} from "vee-validate";

const files = defineModel<ForgeFileStatus[]>({ default: []})

export interface ForgeFileUploaderProps {
  acceptedFileTypes: string[],
  maxFileSize: number,
  getFileUrlAction: (fileName: string) => Promise<[string, string]>,
  showDragDropArea?: boolean,
  customFileNameRules?: TypedSchema,
  maxFileInput?: number,
  editableFileName?: boolean,
  autoUploadToBlob?: boolean
}

const props = withDefaults(defineProps<ForgeFileUploaderProps>(), {
  maxFileInput: 3,
  editableFileName: false,
  autoUploadToBlob: true,
  showDragDropArea: true
})

const deleteFiles = (fileInfo : File) => {
  files.value = files.value.filter((f) => f.file != fileInfo)
}
</script>