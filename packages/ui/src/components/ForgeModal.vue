<template>
  <Dialog v-bind="props">
    <template #closeicon>
      <Icon data-cy="close-icon" icon="bi:x-lg" width="21" height="21" @click="closeModal"/>
    </template>
    <template #maximizeicon>
      <Icon data-cy="maximisable-icon" icon="bi:arrows-fullscreen" />
    </template>
    <template #default>
      <forge-alert v-if="error.hasError" severity="danger" data-cy="error">
        <p :class="error.message.length > 0 ? 'my-auto' : 'mb-0'">{{ error.header }}</p>
        <ul v-if="error.message.length > 0">
          <li v-for="detail in error.message" :key="detail">
            {{ detail }}
          </li>
        </ul>
      </forge-alert>
      <slot />
      <slot v-if="loading" name="loader">
        <forge-loader data-cy="loader" />
      </slot>
    </template>
    <template #footer v-if="showFooter">
      <div class="d-flex w-100" data-cy="footer">
        <Button :label="cancelText" outlined @click="closeModal" data-cy="cancel-button"/>
        <Button :label="submitText" class="ms-auto" @click="success" data-cy="submit-button"/>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { DialogProps } from "primevue/dialog";
import ForgeAlert from "./ForgeAlert.vue";
import ForgeLoader from "./ForgeLoader.vue";
import { ref } from "vue";
import { parseError } from "../helpers";

interface ModalError {
  hasError: boolean;
  header: string;
  message: string[];
}

export interface ForgeModalProps extends DialogProps {
  cancelText?: string,
  submitText?: string,
  showFooter?: boolean,
  onConfirm?: Function | null,
}

const emit = defineEmits(['update:visible'])

const props = withDefaults(defineProps<ForgeModalProps>(), {
  modal: true,
  closable: false,
  showHeader: true,
  header: "Header",
  cancelText: "Cancel",
  cancelClass: "",
  submitText: "Submit",
  submitClass: "",
  showFooter: true,
  onConfirm: null
})

const loading = ref(false)
const error = ref<ModalError>({
  hasError: false,
  header: "",
  message: []
})

const closeModal = () => {
  emit("update:visible", false)
}

const success = async () => {
  if(props.onConfirm) {
    loading.value = true;

    error.value.hasError = false;

    try {
      const result = await props.onConfirm();
      if (result || result == undefined) {
        closeModal()
      }
    } catch (e) {
      error.value.hasError = true;
      const result = parseError(e);
      error.value.header = result.errorMessage;
      error.value.message = result.errorDetails;
    }
    loading.value = false;
  }
}
</script>