<template>
  <ForgeProgressBar v-if="uploadStatus === 'Not Uploaded'" animate striped>{{ ((bytesUploaded / fileSize) * 100).toFixed(0)}}%</ForgeProgressBar>
  <ForgeAlert v-else :severity="alertSeverity">{{ alertMessage }}</ForgeAlert>
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
  uploadStatus: FileUploadStatus,
  duplicateWarning: boolean,
}

const { fileSize, duplicateWarning, uploadStatus, bytesUploaded, maxFileSize} = defineProps<UploadStatusProps>()

const alertSeverity = computed<string>(() => uploadStatus === 'Failed' || uploadStatus === 'InvalidFileType' || uploadStatus === 'InvalidFileSize' || duplicateWarning ? 'danger' : 'warning');
const alertMessage = computed<string>(() => {
  switch (uploadStatus) {
    case 'InvalidFileType':
      return 'Upload Failed: File type is not accepted.'
    case 'InvalidFileSize':
      return `Upload Failed: File size exceeds the ${formatFileSize(maxFileSize)} limit.`
    case 'Aborted':
      return 'Upload Failed: User cancelled.'
    default:
      return 'Upload Failed: Connection error, please try again.'
  }
})
</script>