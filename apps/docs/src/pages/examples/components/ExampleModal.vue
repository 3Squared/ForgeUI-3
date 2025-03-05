<template>
  <ForgeModal ref="modalRef" v-model:visible="visible" :error="error" :showFooter="false">
    I'm a modal

    <template #footer>
      <Button @click="cancel" outlined class="me-auto">Cancel</Button>
      <Button @click="save">Save</Button>
    </template>
  </ForgeModal>

  <Button @click="visible = true">Show Modal</Button>
</template>

<script setup lang="ts">
import Button from "primevue/button"
import { ref } from "vue";
import { ForgeModalError } from "@3squared/forge-ui-3/dist/src/components/ForgeModal.vue";
import { ForgeModal } from "@3squared/forge-ui-3";

const visible = ref(false)
const error = ref<ForgeModalError>()
const modalRef = ref();

const cancel = () => {
  modalRef.value?.resetError();
  visible.value = false
}

const save = async () => {
  error.value = {
    hasError: true,
    header: 'I am an error',
    message: []
  };
};
</script>
