<template>
  <div data-cy="file-uploader">
    <UploadButton v-bind="props" v-model="files" />
    <div v-if="showDragDropArea">
      <DragDropArea v-model="files" :max-file-input="props.maxFileInput" :max-file-size="props.maxFileSize" :accepted-file-types="props.acceptedFileTypes">
        <div v-for="({ file }, index) in files">
          <FileInfo
              :key="file.name"
              v-model:file="files[index].file"
              v-model:blob-file-name="files[index].blobFileName"
              v-model:upload-status="files[index].status"
              :class="index === files.length - 1 || files.length == 1 ? '' : 'border-bottom'"
              v-bind="props"
              @deleted="deleteFiles"
          />
        </div>
      </DragDropArea>
      <FileInputInfo :max-file-size="props.maxFileSize" :max-file-input="maxFileInput" />
    </div>
  </div>
</template>

<script setup lang="ts">
import UploadButton from "@/components/file-uploader/components/UploadButton.vue";
import DragDropArea from "@/components/file-uploader/components/DragDropArea.vue";
import FileInfo from "@/components/file-uploader/components/FileInfo.vue";
import { ForgeFileStatus, ForgeFileType } from "@/types/forge-types.ts";
import { TypedSchema } from "vee-validate";
import FileInputInfo from "@/components/file-uploader/components/FileInputInfo.vue";

const files = defineModel<ForgeFileStatus[]>({ default: [] })

export interface ForgeFileUploaderProps {
  acceptedFileTypes: ForgeFileType[],
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

const deleteFiles = (fileInfo: File) => {
  files.value = files.value.filter((f) => f.file != fileInfo)
}
</script>