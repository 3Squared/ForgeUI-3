<template>
  <div class="py-4 px-3 d-flex">
    <div>
      <Image v-if="isImage(file.type)" image-class="image-file-thumbnail"  :src="getThumbnailUrl(file)" :alt="file.name" width="125px" preview />
      <Icon v-else icon="file-earmark"/>
    </div>
    <div>
      {{ file.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import Image from 'primevue/image'
import { isImage, getThumbnailUrl } from '../utilities/utilities'

interface FileInfoProps {
  file: File
}

const { file } = defineProps<FileInfoProps>()
</script>