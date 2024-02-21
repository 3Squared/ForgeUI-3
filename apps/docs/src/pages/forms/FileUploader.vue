<template>
  <ForgeFileUploader :max-file-size="52428800" :accepted-file-types="['jpg']" :get-file-url-action="getFileUrlAction" editable-file-name />
</template>

<script setup lang="ts">
import { ForgeFileUploader } from "@3squared/forge-ui-3";

const getFileUrlAction = () => {
  console.log("hello")
}
</script>
