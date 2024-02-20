<template>
  <div class="py-4 px-3 d-flex">
    <div>
      <Image v-if="isImage(file.type)" image-class="image-file-thumbnail border"  :src="getThumbnailUrl(file)" :alt="file.name" width="75px" preview />
      <Icon v-else icon="file-earmark"/>
    </div>
    <div class="ms-3 d-flex flex-column">
      <div>
        <ForgeInlineEditor v-if="props.editableFileName" v-model="fileName" :rules="props.customFileNameRules" :name="file.name" :complete-action="updateFileName"/>
        <span v-else>{{ file.name }}</span>
      </div>
      <span class="text-black-50">File type: {{ fileType }}</span>
      <span class="text-black-50">File size: {{ formatFileSize(file.size) }}</span>
    </div>

    <div class="ms-auto my-auto">
      <UploadStatus
          :file-size="file.size"
          :upload-status="uploadStatus"
          :bytes-uploaded="bytesUploaded"
          v-bind="props"
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
import {isImage, getThumbnailUrl, formatFileSize, FileUploadStatus} from '../utilities/utilities'
import {TypedSchema} from "vee-validate";
import {computed, ref} from "vue";
import UploadStatus from "@/components/file-uploader/components/UploadStatus.vue";
import {BlockBlobClient, BlockBlobParallelUploadOptions} from "@azure/storage-blob";

interface FileInfoProps {
  editableFileName: boolean,
  duplicateWarning: boolean,
  acceptedFileTypes: string,
  maxFileSize: number,
  getFileUrlAction: Function,
  customFileNameRules?: TypedSchema,
}

const props = defineProps<FileInfoProps>()
const file = defineModel<File>('file', { required: true })
const fileBlobFileName = defineModel<string>('blobFileName', { required: true })

const emits = defineEmits(['deleted'])

const fileName = ref<string>(file.value.name)
const fileType = ref<string>(file.value.type.split('/').pop() ?? "")

const blobUploadUrl = ref<string>("")
const bytesUploaded = ref<number>(0)
const uploadStatus = ref<FileUploadStatus>('Not Uploaded')
const controller = ref();

const validFileType = computed<boolean>(() => props.acceptedFileTypes.includes(fileType.value ?? ""))
const validFileSize = computed<boolean>(() => file.value.size <= props.maxFileSize)

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
  const [uploadUrl, blobFileName] = await props.getFileUrlAction(file.value.name)
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
  if(uploadStatus.value === 'Uploaded') {
    if(blobUploadUrl.value !== null) {
      try {
        const blockBlobClient = new BlockBlobClient(blobUploadUrl.value)
        await blockBlobClient.delete()
      } catch (exception) {
        if(exception !== 'BlobNotFound') {
          uploadStatus.value = 'DeleteFileFailed'
          return;
        }
      }
    }
  }

  emits('deleted', file.value)
}
</script>