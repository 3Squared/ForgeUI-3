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
  const fileWriteUrl =
    "http://127.0.0.1:10000/devstoreaccount1/forgefileuploader?sv=2018-03-28&st=2025-01-08T13%3A53%3A16Z&se=2025-01-09T13%3A53%3A16Z&sr=c&sp=rcwl&sig=f9CgC0CVUe0TMyDnbtJF5q0kZGH7D%2FarkJF2iiKM0Pg%3D";
  const blobFileName = fileName;
  return Promise.resolve([fileWriteUrl, blobFileName]);
};
</script>
