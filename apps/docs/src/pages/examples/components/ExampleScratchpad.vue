<template>
  <ForgeScratchpad v-model:image="image" @save="onSave" />
</template>

<script setup lang="ts">
import { ForgeScratchpad } from "@3squared/forge-ui-3";
import { ref } from "vue";
import { useToast } from "primevue/usetoast";

const image = ref();
const toast = useToast();

const onSave = (isEmpty: boolean) => {
  if (isEmpty) {
    toast.add({ severity: "error", summary: "Scratchpad is empty", closable: true, life: undefined });
  } else {
    toast.add({ severity: "success", summary: "Saving your image..", closable: true, life: undefined });
  }
};
</script>
