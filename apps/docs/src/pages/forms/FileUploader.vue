<template>
  <div>
    <forge-page-header title="File Uploader" />
    <p>
      Each file which is uploaded is checked against the accepted file types array, this <strong>should</strong> be made up of a list of
      <a class="link" target="_blank"
         href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types">
        <strong>MIME Types</strong>
      </a> that you wish to accept in your application.
    </p>
    <Playground :options="options" :config="config" :code="code" @reset="reset">
      <template #component>
        <component :is="ForgeFileUploader" v-bind="options" :accepted-file-types="['image/jpeg', 'application/pdf', 'text/csv']" class="w-100 mx-2"/>
      </template>
    </Playground>
  </div>
</template>

<script setup lang="ts">
import { ForgeFileUploader, ForgePageHeader } from "@3squared/forge-ui-3";
import { Playground, usePlayground } from "@3squared/forge-playground-3";
import { computed } from "vue";

const { options, propVals, config, reset } = usePlayground({
  maxFileSize: 52428800,
  maxFileInput: 3,
  showDragDropArea: true,
  editableFileName: false,
  autoUploadToBlob: true
})

const code = computed(() => `<ForgeFileUploader :accepted-file-types="['image/jpeg', 'application/pdf', 'text/csv']" get-file-url-action="yourFunction"${propVals.value.length > 0 ? " " + propVals.value.join(" ") : ""} />`);

</script>
