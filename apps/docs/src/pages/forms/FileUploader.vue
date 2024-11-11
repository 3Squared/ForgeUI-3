<template>
  <div>
    <forge-page-header title="File Uploader" />
    <p>
      Each file which is uploaded is checked against the accepted file types array, this
      <strong>should</strong>
      be made up of a list of
      <a class="link" target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types">
        <strong>MIME Types</strong>
      </a>
      that you wish to accept in your application.
    </p>
    <Playground :options="options" :config="config" :code="code" @reset="reset">
      <template #component>
        <component :is="ForgeFileUploader" v-bind="options" :accepted-file-types="acceptedTypes" class="w-100 mx-2" />
      </template>
    </Playground>
  </div>
</template>

<script setup lang="ts">
import { ForgeFileType, ForgeFileUploader, ForgePageHeader } from "@3squared/forge-ui-3";
import { Playground, usePlayground } from "@3squared/forge-playground-3";
import { computed } from "vue";

const { options, propVals, config, reset } = usePlayground({
  maxFileSize: 52428800,
  maxFileInput: 3,
  showDragDropArea: true,
  editableFileName: false,
  autoUploadToBlob: true
});

const acceptedTypes = [
  { fileType: "image/jpeg" },
  { fileType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", label: "docx" },
  { fileType: "image/gif", label: "GIF" },
  { fileType: "image/csv", label: "CSV" }
] as ForgeFileType[];

const code = computed(
  () =>
    `    <template>
      <ForgeFileUploader :accepted-file-types="acceptedTypes" get-file-url-action="yourFunctionThatGetsContainerUrlForFile"${propVals.value.length > 0 ? " " + propVals.value.join(" ") : ""} />
    </template>
    
    <script setup lang="ts">
      import { ForgeFileType } from "@3squared/forge-ui-3/src/types/forge-types.ts"
      
      // Add custom labels to file types using the 'label' prop.
      const acceptedTypes = [
        { fileType: 'image/jpeg' },
        { fileType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", label: "docx" }
        { fileType: 'image/gif', label: 'GIF' },
        { fileType: 'image/csv', label: 'CSV' }
      ] as ForgeFileType[]
    </\script>`
);
</script>
