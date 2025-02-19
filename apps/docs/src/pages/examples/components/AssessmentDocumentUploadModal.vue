<template>
  <ForgeModal v-model:visible="visible" :header="i18n.t('UploadDocument')" :onConfirm="uploadDocument"
             :submitText="i18n.t('Save')" :cancelText="i18n.t('Cancel')" size="lg" @show="file = []">
    <ForgeFileUploader :max-file-size="50000000" :accepted-file-types="AllowedMimeTypes"
                       v-model="file" :get-file-url-action="(filename) => getSasToken(filename)" :maxFileInput="25"
    />
  </ForgeModal>

  <Toast />
</template>

<script setup lang="ts">
import { ForgeFileUploader, ForgeModal } from '@3squared/forge-ui-3'
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast"
import { computed, ref } from "vue";
import { useI18n } from 'vue-i18n';
import { PostAssessmentDocumentFileDto, PostMultipleAssessmentDocumentFilesDto } from "@/models/api-dto.ts";
import { assessmentService } from "@/services/services.ts";
import { ForgeFileStatus } from "@3squared/forge-ui-3/src/types/forge-types.ts";
import { handleError } from "@/utilities/errorUtility.ts";
import { AllowedMimeTypes } from "@/constants/FileTypes.ts";

interface AssessmentDocumentUploadModalProps {
  assessmentId: string
}

const i18n = useI18n();
const props = defineProps<AssessmentDocumentUploadModalProps>();

const toast = useToast();
const visible = defineModel<boolean>({ required: true, default: false });

const emit = defineEmits(['documentSaved'])
const file = ref<ForgeFileStatus[]>();

const validFiles = computed(() => {
  return !file.value?.length ? [] : file.value.filter((file) => file.status == 'Uploaded')
})

const invalidFiles = computed(() => {
  return !file.value?.length ? [] : file.value.some((file) => file.status != 'Uploaded')
})

const uploadDocument = async () => {
  if (invalidFiles.value) throw Error(i18n.t('InvalidFiles'));
  if (!validFiles.value.length) throw Error(i18n.t('NoValidFilesToUpload'));

  const fileList = [] as PostAssessmentDocumentFileDto[];
  
  validFiles.value.forEach((file) => {
    const assessmentDocument = {
      fileMimeType: file.file.type,
      fileSizeBytes: file.file.size,
      fileUploadName: file.blobFileName,
      originalFilename: file.file.name,
    } as PostAssessmentDocumentFileDto
    fileList.push(assessmentDocument);
  })
  
  const assessmentFiles = {
    assessmentFiles: fileList,
    assessmentId: props.assessmentId
  } as PostMultipleAssessmentDocumentFilesDto
  
  try {
    await assessmentService.insertAssessmentDocuments(assessmentFiles);

    emit("documentSaved");
    toast.add({ severity: "success", summary: i18n.t('Document(s)Uploaded'), closable: false, life: 3000 })
  } catch (ex: any) {
    handleError(ex)
  }
}

const getSasToken = async (filename: string) => {
  const response = await assessmentService.createAssessmentDocumentSasToken(filename);
  return [response.fileWriteUrl, response.blobFileName];
}
</script>