<template>
  <div class="d-flex align-items-center me-2">
    <ForgeProgressBar v-if="uploadStatus === 'Uploading'" :pixelWidth="200" animate striped >{{ ((bytesUploaded / fileSize) * 100).toFixed(0)}}%</ForgeProgressBar>
    <ForgeAlert v-if="uploadStatus !== 'Uploading' && uploadStatus !== 'Not Uploaded' && uploadStatus !== 'Uploaded'" :severity="alertSeverity" class="mb-0 w-75 ms-auto">{{ alertMessage }}</ForgeAlert>
  </div>
</template>

<script setup lang="ts">
import ForgeAlert from "@/components/ForgeAlert.vue";
import ForgeProgressBar from "@/components/ForgeProgressBar.vue";
import {computed} from 'vue'
import {FileUploadStatus, formatFileSize} from "../utilities/utilities";

interface UploadStatusProps {
  fileSize: number,
  maxFileSize: number,
  bytesUploaded: number,
  uploadStatus: FileUploadStatus
}

const { fileSize, uploadStatus, bytesUploaded, maxFileSize} = defineProps<UploadStatusProps>()

const alertSeverity = computed<string>(() => uploadStatus === 'Failed' || uploadStatus === 'InvalidFileType' || uploadStatus === 'InvalidFileSize' || uploadStatus === 'Duplicate' ? 'danger' : 'warning');
const alertMessage = computed<string>(() => {
  switch (uploadStatus) {
    case 'InvalidFileType':
      return 'Upload Failed: File type is not accepted.'
    case 'InvalidFileSize':
      return `Upload Failed: File size exceeds the ${formatFileSize(maxFileSize)} limit.`
    case 'Aborted':
      return 'Upload Failed: User cancelled.'
    case 'DeleteFileFailed': 
      return 'Failed to delete: connection error, please try again';
    case 'Duplicate':
      return 'Upload Failed: A file with the same name has already been uploaded.';
    default:
      return 'Upload Failed: Connection error, please try again.'
  }
})
</script>