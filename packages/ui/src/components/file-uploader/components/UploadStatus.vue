<template>
  <div class="d-flex align-items-center me-2">
    <ForgeLoader v-if="props.uploadStatus === 'Uploading'" />
    <ForgeAlert
        v-if="props.uploadStatus !== 'Uploading' && props.uploadStatus !== 'Not Uploaded' && props.uploadStatus !== 'Uploaded' && props.uploadStatus !== 'Preparing'" id="upload-status-alert"
        :severity="alertSeverity" class="mb-0 w-75 ms-auto">{{ alertMessage }}
    </ForgeAlert>
  </div>
</template>

<script setup lang="ts">
import ForgeAlert from "@/components/ForgeAlert.vue";
import { computed } from 'vue'
import { FileUploadStatus, formatFileSize } from "../utilities/utilities";

interface UploadStatusProps {
  fileSize: number,
  maxFileSize: number,
  bytesUploaded: number,
  uploadStatus: FileUploadStatus
}

const props = defineProps<UploadStatusProps>()

const alertSeverity = computed<string>(() => props.uploadStatus === 'Failed' || props.uploadStatus === 'InvalidFileType' || props.uploadStatus === 'InvalidFileSize' ? 'danger' : 'warning');
const alertMessage = computed<string>(() => {
  switch (props.uploadStatus) {
    case 'InvalidFileType':
      return 'Upload Failed: File type is not accepted.'
    case 'InvalidFileSize':
      return `Upload Failed: File size exceeds the ${formatFileSize(props.maxFileSize)} limit.`
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