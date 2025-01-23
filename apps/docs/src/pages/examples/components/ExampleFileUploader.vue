<template>
  <ForgeFileUploader
    v-model="file"
    :accepted-file-types="acceptedTypes"
    :get-file-url-action="(filename) => getSasToken(filename)"
    editable-file-name
    :max-file-size="50000000"
  />
</template>

<script setup lang="ts">
import { ForgeFileUploader } from "@3squared/forge-ui-3";
import { ForgeFileType, ForgeFileStatus } from "@3squared/forge-ui-3/src/types/forge-types.ts";
import { ref } from "vue";

const file = ref<ForgeFileStatus[]>();
// Add custom labels to file types using the 'label' prop.
const acceptedTypes = [
  { fileType: "image/jpeg" },
  { fileType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", label: "docx" },
  { fileType: "image/gif", label: "GIF" },
  { fileType: "image/csv", label: "CSV" },
  { fileType: "application/pdf" },
  { fileType: "application/msword", label: "doc" },
  { fileType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", label: "docx" },
  { fileType: "application/vnd.ms-excel", label: "xls" },
  { fileType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", label: "xlsx" }
] as ForgeFileType[];

const getSasToken = async (fileName: string) => {
  //to get the url you need to run azurite and (using storage explorer) create a blob contianer called forgefileuploader and get it's access signature.
  //you also need to include the filename in the url: http://127.0.0.1:10000/devstoreaccount1/forgefileuploader/${filename}...
  const fileWriteUrl = `http://127.0.0.1:10000/devstoreaccount1/forgefileuploader/${fileName}?sv=2018-03-28&si=forgefileuploader-1948E8286AB&sr=c&sig=AEEo7ornbXBufk4W9JHicGr2AzrUhbskTcme4Frr1q0%3D`;
  const blobFileName = fileName;
  return Promise.resolve([fileWriteUrl, blobFileName]);
};
</script>
