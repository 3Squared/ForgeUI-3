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
      <span class="text-black-50">File type: {{ file.type.split('/').pop() }}</span>
      <span class="text-black-50">File size: {{ formatFileSize(file.size) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ForgeInlineEditor} from "@3squared/forge-ui-3";
import { Icon } from "@iconify/vue";
import Image from 'primevue/image'
import { isImage, getThumbnailUrl, formatFileSize } from '../utilities/utilities'
import {TypedSchema} from "vee-validate";
import {ref} from "vue";

interface FileInfoProps {
  editableFileName: boolean,
  customFileNameRules?: TypedSchema
}

const { editableFileName, customFileNameRules } = defineProps<FileInfoProps>()
const file = defineModel<File>( { required: true })
const fileName = ref(file.value.name)

const updateFileName = () => {
  file.value = new File([file.value], fileName.value, { type: file.value.type, lastModified: (new Date()).valueOf()})
}
</script>