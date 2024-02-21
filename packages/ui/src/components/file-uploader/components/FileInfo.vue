<template>
  <div class="py-4 px-3 d-flex">
    <div>
      <Image v-if="isImage(file.type)" image-class="image-file-thumbnail border"  :src="getThumbnailUrl(file)" :alt="file.name" width="75px" preview />
      <Icon v-else icon="file-earmark"/>
    </div>
    <div class="ms-3 d-flex flex-column">
      <div>
        <ForgeInlineEditor v-if="editableFileName" v-model="fileName" :rules="customFileNameRules" :name="file.name" :complete-action="updateFileName"/>
        <span v-else>{{ file.name }}</span>
      </div>
      <span class="text-black-50">File type: {{ fileType }}</span>
      <span class="text-black-50">File size: {{ formatFileSize(file.size) }}</span>
    </div>

    <div class="ms-auto my-auto d-flex">
      <UploadStatus
          :key="uploadStatus"
          :file-size="file.size"
          :upload-status="uploadStatus"
          :bytes-uploaded="bytesUploaded"
          :max-file-size="maxFileSize"
      />
      <Button link @click="uploadBlob" v-if="uploadStatus === 'Not Uploaded' || uploadStatus === 'Failed' || uploadStatus === 'Aborted'">
        <Icon :icon="uploadStatus === 'Not Uploaded' ? 'bi:upload' : 'bi:arrow-clockwise'" />
      </Button>
      <Button link @click="controller.value.abort()" v-if="uploadStatus === 'Uploading'">
        <Icon :icon="'bi:x-circle-fill'" />
      </Button>
      <Button link @click="deleteFileFromBlob" v-else>
        <Icon :icon="'bi:trash'" />
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import ForgeInlineEditor from "@/components/ForgeInlineEditor.vue";
import { Icon } from "@iconify/vue";
import Image from 'primevue/image'
import {
  isImage,
  getThumbnailUrl,
  formatFileSize,
  FileUploadStatus,
  deleteFile
} from '../utilities/utilities'
import {TypedSchema} from "vee-validate";
import {computed, ref, onMounted} from "vue";
import UploadStatus from "@/components/file-uploader/components/UploadStatus.vue";
import {BlockBlobClient, BlockBlobParallelUploadOptions} from "@azure/storage-blob";

interface FileInfoProps {
  editableFileName: boolean,
  acceptedFileTypes: string,
  maxFileSize: number,
  getFileUrlAction: Function,
  customFileNameRules?: TypedSchema,
  autoUploadToBlob?: boolean
}

const { autoUploadToBlob, maxFileSize, getFileUrlAction, customFileNameRules, editableFileName, acceptedFileTypes } = defineProps<FileInfoProps>()
const file = defineModel<File>('file', { required: true })
const fileBlobFileName = defineModel<string>('blobFileName', { required: true })
const uploadStatus = defineModel<FileUploadStatus>('uploadStatus', { required: true })

const emits = defineEmits(['deleted'])

const fileName = ref<string>(file.value.name)
const fileType = ref<string>(file.value.type.split('/').pop() ?? "")

const blobUploadUrl = ref<string>("")
const bytesUploaded = ref<number>(0)
const controller = ref();

const validFileType = computed<boolean>(() => acceptedFileTypes.includes(fileType.value ?? ""))
const validFileSize = computed<boolean>(() => file.value.size <= maxFileSize)

const updateFileName = () => {
  file.value = new File([file.value], fileName.value, { type: file.value.type, lastModified: (new Date()).valueOf()})
}

const uploadBlob = async () => {
  if(!validFileType || !validFileSize){
    uploadStatus.value = !validFileType ? 'InvalidFileType' : 'InvalidFileSize'
    return;
  }
  uploadStatus.value = 'Preparing'

  controller.value = new AbortController();
  const [uploadUrl, blobFileName] = await getFileUrlAction(file.value.name)
  if(!uploadUrl) {
    uploadStatus.value = 'Failed'
    return;
  }

  try {
    uploadStatus.value = 'Uploading'
    const blockBlobClient = new BlockBlobClient(uploadUrl)
    const options = {
      abortSignal: controller.value.signal,
      onProgress: (progress) => bytesUploaded.value = progress.loadedBytes,
      tags: { temp: "true" }
    } as BlockBlobParallelUploadOptions;

    // Upload directly to Azure Blob Storage
    await blockBlobClient.uploadData(file.value, options);
    blobUploadUrl.value = uploadUrl;

    uploadStatus.value = "Uploaded";
    fileBlobFileName.value = blobFileName
  } catch (ex: Error | any) {
    if (ex.name === "AbortError") {
      uploadStatus.value = "Aborted";
      return;
    }
    uploadStatus.value = "Failed";
  }
}

const deleteFileFromBlob = async () => {
  await deleteFile(uploadStatus.value, blobUploadUrl.value)
  emits('deleted', file.value)
}

onMounted(() => {
  if(autoUploadToBlob) {
    uploadBlob()
  }
})
</script>