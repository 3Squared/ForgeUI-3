<template>
  <ForgeFileUploader 
      v-model="files" 
      :max-file-size="52428800" 
      :accepted-file-types="['image/jpeg']" 
      :get-file-url-action="getFileUrlAction"
      editable-file-name 
  />
</template>

<script setup lang="ts">
import { ForgeFileUploader } from "@3squared/forge-ui-3";
import { ref } from "vue";

const getFileUrlAction = (fileName : string) => {
  console.log("hello")
}

const files = ref()
</script>
