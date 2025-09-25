<template>
  <div class="py-4 px-3 d-flex" :data-cy="`file-info-${file.name}`">
    <div>
      <Image v-if="isImage(file.type)" id="thumbnail-image" image-class="image-file-thumbnail border"
             :src="getThumbnailUrl(file)" :alt="file.name" width="75px" preview />
      <Icon v-else id="file-earmark" icon="bi:file-earmark" color="black" width="75px" />
    </div>
    <div class="ms-3 d-flex flex-column">
      <div>
        <ForgeInlineEditor v-if="editableFileName" id="edit-file-name" v-model="fileName" :rules="customFileNameRules"
                           :name="file.name" :complete-action="updateFileName" />
        <span v-else id="file-name">{{ fileName }}</span>
      </div>
      <span class="text-black-50" id="file-type">File type: {{ file.type.split('/').pop() }}</span>
      <span class="text-black-50" id="file-size">File size: {{ formatFileSize(file.size) }}</span>
    </div>

    <div class="ms-auto my-auto d-flex align-items-center gap-1">
      <UploadStatus
          :key="uploadStatus"
          :file-size="file.size"
          :upload-status="uploadStatus"
          :bytes-uploaded="bytesUploaded"
          :max-file-size="maxFileSize"
      />
      <Button link @click="uploadBlob" v-if="uploadStatus === 'Not Uploaded' || uploadStatus === 'Failed' || uploadStatus === 'Duplicate' || uploadStatus === 'Aborted'">
        <Icon :icon="uploadStatus === 'Not Uploaded' || uploadStatus === 'Duplicate' ? 'bi:upload' : 'bi:arrow-clockwise'" />
      </Button>
      <Button link @click="controller.abort()" v-if="uploadStatus === 'Uploading'">
        <Icon :icon="'bi:x-circle-fill'" />
      </Button>
      <Button link @click="deleteFileFromBlob" v-else id="delete-button">
        <Icon icon="bi:trash" />
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
import { BlockBlobClient, BlockBlobParallelUploadOptions, newPipeline, StoragePipelineOptions } from "@azure/storage-blob";
import { PipelinePolicy } from "@azure/core-rest-pipeline";

import { ForgeFileType } from "@/types/forge-types.ts";

interface FileInfoProps {
  editableFileName: boolean,
  acceptedFileTypes: ForgeFileType[],
  maxFileSize: number,
  getFileUrlAction: (fileName: string) => Promise<[string, string]>,
  customFileNameRules?: TypedSchema,
  autoUploadToBlob?: boolean,
  storageServiceVersionOverride?: string
}

const { autoUploadToBlob, maxFileSize, getFileUrlAction, customFileNameRules, editableFileName, acceptedFileTypes, storageServiceVersionOverride } = defineProps<FileInfoProps>()
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
  let fileNameSections = fileName.value.split('.');
  let fileExtensionFromMime = mime.getExtension(fileMimeType.value!);
  let lastWordInFileName = fileName.value.split('.').pop();
  // add missing file extension
  if (fileNameSections.length === 1) {
    if (lastWordInFileName && lastWordInFileName.length > 0) {
      fileName.value = [fileName.value, fileExtensionFromMime].join('.');
    }
  }
  //correct wrong file extension
  else if (fileNameSections.length > 1) {
    if (lastWordInFileName !== fileExtensionFromMime) {
      fileName.value = fileName.value.replace(lastWordInFileName!, fileExtensionFromMime!);
    }
  }
}

const createBlockBlobClient = (uploadUrl: string, versionOverride?: string): BlockBlobClient => {
  let pipelineOptions = {};

  if (versionOverride) {
    const forceVersionPolicy: PipelinePolicy = {
      name: "forceVersionPolicy",
      sendRequest: async (req, next) => {
        req.headers.set("x-ms-version", versionOverride);
        return next(req);
      }
    };

    pipelineOptions = {
      // 👇 this is where additional policies go
      additionalPolicies: [
        { policy: forceVersionPolicy, position: "perRetry" }
      ]
    };

    // Build a pipeline with the policy
    const pipeline = newPipeline(undefined, pipelineOptions);
    return new BlockBlobClient(uploadUrl, pipeline);
  }

  return new BlockBlobClient(uploadUrl);
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
    const blockBlobClient = createBlockBlobClient(uploadUrl, storageServiceVersionOverride);
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
  if (autoUploadToBlob && uploadStatus.value != 'Uploaded') {
    uploadBlob();
  }
})
</script>