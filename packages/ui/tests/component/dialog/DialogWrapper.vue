<template>
  <Button id="show-modal" @click="visible = true">Show Modal</Button>
  <ForgeModal id="modal" v-bind="$attrs" v-model:visible="visible">Content</ForgeModal>
</template>

<script lang="ts" setup>
import ForgeModal from "@/components/ForgeModal.vue";
import { ref } from "vue";

let visible = ref(false)
</script>