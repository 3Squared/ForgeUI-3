<template>
  <div class="py-4 px-3 d-flex" :data-cy="`file-info-${file.name}`">
    <div>
      <Image
        v-if="isImage(file.type)" id="thumbnail-image" image-class="image-file-thumbnail border"
        :src="getThumbnailUrl(file)" :alt="file.name" width="75px" preview />
      <Icon v-else id="file-earmark" icon="bi:file-earmark" color="black" width="75px" />
    </div>
    <div class="ms-3 d-flex flex-column">
      <div>
        <ForgeInlineEditor
          v-if="editableFileName" id="edit-file-name" v-model="fileName" :rules="customFileNameRules"
          :name="file.name" :complete-action="updateFileName" />
        <span v-else id="file-name">{{ fileName }}</span>
      </div>
      <span id="file-type" class="text-black-50">File type: {{ file.type.split('/').pop() }}</span>
      <span id="file-size" class="text-black-50">File size: {{ formatFileSize(file.size) }}</span>
    </div>

    <div class="ms-auto my-auto d-flex">
      <UploadStatus
        :key="uploadStatus" :file-size="file.size" :upload-status="uploadStatus"
        :bytes-uploaded="bytesUploaded" :max-file-size="maxFileSize" />
      <Button
        v-if="uploadStatus === 'Not Uploaded' || uploadStatus === 'Failed' || uploadStatus === 'Duplicate' || uploadStatus === 'Aborted'" link
        @click="uploadBlob">
        <Icon
          :icon="uploadStatus === 'Not Uploaded' || uploadStatus === 'Duplicate' ? 'bi:upload' : 'bi:arrow-clockwise'" />
      </Button>
      <Button v-if="uploadStatus === 'Uploading'" link @click="controller.value.abort()">
        <Icon :icon="'bi:x-circle-fill'" />
      </Button>
      <Button v-else id="delete-button" link @click="deleteFileFromBlob">
        <Icon :icon="'bi:trash'" />
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import ForgeInlineEditor from "@/components/ForgeInlineEditor.vue";
import { Icon } from "@iconify/vue";
import Image from 'primevue/image';
import mime from "mime";
import {
  isImage,
  getThumbnailUrl,
  formatFileSize,
  FileUploadStatus,
  deleteFile,
  forgeMime
} from '../utilities/utilities'
import { TypedSchema } from "vee-validate";
import { computed, ref, onMounted } from "vue";
import UploadStatus from "@/components/file-uploader/components/UploadStatus.vue";
import { BlockBlobClient, BlockBlobParallelUploadOptions } from "@azure/storage-blob";
import { ForgeFileType } from "../../../types/forge-types";

interface FileInfoProps {
  editableFileName: boolean,
  acceptedFileTypes: ForgeFileType[],
  maxFileSize: number,
  getFileUrlAction: (fileName: string) => Promise<[string, string]>,
  customFileNameRules?: TypedSchema,
  autoUploadToBlob?: boolean
}

const { autoUploadToBlob, maxFileSize, getFileUrlAction, customFileNameRules, editableFileName, acceptedFileTypes } = defineProps<FileInfoProps>()
const file = defineModel<File>('file', { required: true })
const fileBlobFileName = defineModel<string>('blobFileName', { required: true })
const uploadStatus = defineModel<FileUploadStatus>('uploadStatus', { required: true })

const emits = defineEmits(['deleted'])

const fileName = ref<string>(file.value.name)
const blobUploadUrl = ref<string>("")
const bytesUploaded = ref<number>(0)
const controller = ref();

const validFileType = computed<boolean>(() => acceptedFileTypes.some(({ fileType }) => fileType === file.value.type))
const validFileSize = computed<boolean>(() => file.value.size <= maxFileSize)
const fileMimeType = computed<string | null>(() => {
  if (file.value.type) {
    return file.value.type;
  }
  return forgeMime().getType(file.value.name);
});

const updateFileName = () => {
  if (fileName.value != null) {
    ensureFileNameHasCorrectExtension();
    file.value = new File([file.value], fileName.value, { type: file.value.type, lastModified: (new Date()).valueOf() })
  }
}

const ensureFileNameHasCorrectExtension = () => {
  const fileNameSections = fileName.value.split('.');
  const fileExtensionFromMime = mime.getExtension(fileMimeType.value!);
  const lastWordInFileName = fileName.value.split('.').pop();
  // add missing file extension
  if (fileNameSections.length === 1) {
    if (lastWordInFileName && lastWordInFileName.length > 0) {
      fileName.value = [fileName.value, fileExtensionFromMime].join('.');
    }
  }
  //correct wrong file extension
  else if (fileNameSections.length > 1) {
    if (lastWordInFileName !== fileExtensionFromMime) {
      fileName.value =  fileName.value.replace(lastWordInFileName!, fileExtensionFromMime!);
    }
  }
}

const uploadBlob = async () => {
  if (!validFileType.value || !validFileSize.value) {
    uploadStatus.value = !validFileType.value ? 'InvalidFileType' : 'InvalidFileSize'
    return;
  }
  uploadStatus.value = 'Preparing'

  controller.value = new AbortController();
  const [uploadUrl, blobFileName] = await getFileUrlAction(file.value.name)
  if (!uploadUrl) {
    uploadStatus.value = 'Failed'
    return;
  }

  try {
    uploadStatus.value = 'Uploading'
    const blockBlobClient = new BlockBlobClient(uploadUrl);
    const options = {
      abortSignal: controller.value.signal,
      onProgress: (progress) => bytesUploaded.value = progress.loadedBytes,
      blobHTTPHeaders: {
        blobContentType: fileMimeType!.value,
        blobContentDisposition: `attachment; filename="${file.value.name}"`
      },
      tags: { temp: "true" },
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
  await deleteFile(uploadStatus.value, blobUploadUrl.value);
  emits('deleted', file.value);
}

onMounted(() => {
  if (autoUploadToBlob) {
    uploadBlob();
  }
})
</script>