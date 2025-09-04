<template>
  <Dialog v-bind="props" @maximize="maximise" @unmaximize="minimise" :pt="pt">
    <template #closeicon>
      <Icon data-cy="close-icon" icon="bi:x-lg" width="18" height="18" @click="closeModal" />
    </template>
    <template #maximizeicon>
      <Icon data-cy="maximisable-icon" :icon="!fullscreen ? 'bi:arrows-angle-expand' : 'bi:arrows-angle-contract'" width="16" height="16" />
    </template>
    <template v-for="(_, name) in $slots as unknown as DialogSlots" #[name]="slotProps">
      <template v-if="name == 'default'">
        <div v-if="error.hasError && !hideErrorBanner" class="sticky-top py-3 error-bg" data-cy="error-wrapper">
          <forge-alert severity="danger" data-cy="error" class="mb-0">
            <p :class="error.message.length > 0 ? 'my-auto' : 'mb-0'">{{ error.header }}</p>
            <ul v-if="error.message.length > 0">
              <li v-for="detail in error.message" :key="detail">
                {{ detail }}
              </li>
            </ul>
          </forge-alert>
        </div>
      </template>
      <slot :name="name" v-bind="slotProps || {}" />
      <slot v-if="loading" name="loader">
        <ForgeLoader data-cy="loader" />
      </slot>
    </template>
    <template #footer v-if="showFooter">
      <div class="d-flex w-100" data-cy="footer">
        <Button :label="cancelText" :class="props.cancelClass" outlined @click="closeModal" id="cancel-button" :type="props.cancelButtonType" />
        <Button :label="submitText" :class="props.submitClass" class="ms-auto" @click="success" id="submit-button"
                :type="props.submitButtonType" />
      </div>
    </template>

  </Dialog>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { DialogPassThroughOptions, DialogProps, DialogSlots } from "primevue/dialog";
import ForgeAlert from "./ForgeAlert.vue";
import ForgeLoader from "./ForgeLoader.vue";
import { computed, ref } from "vue";
import { parseError } from "../helpers";
import { Size } from "../types/forge-types.ts";

export interface ForgeModalError {
  hasError: boolean;
  header: string;
  message: string[];
}

export interface ForgeModalProps extends DialogProps {
  cancelText?: string,
  submitText?: string,
  showFooter?: boolean,
  onConfirm?: Function | null,
  submitButtonType?: 'button' | 'reset' | 'submit',
  cancelButtonType?: 'button' | 'reset' | 'submit',
  size?: Size | 'xl'
  cancelClass?: string,
  submitClass?: string,
  resetErrorOnClose?: boolean,
  maxHeight?: string | null,
  minHeight?: string | null
  hideErrorBanner?: boolean
}

const visible = defineModel<boolean>('visible', { required: true })
const fullscreen = ref<boolean>(false)

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
  onConfirm: null,
  cancelButtonType: "button",
  submitButtonType: "button",
  size: "md",
  resetErrorOnClose: true,
  hideErrorBanner: false
})

const loading = ref(false)
const error = defineModel<ForgeModalError>('error', {
  required: false,
  default: {
    hasError: false,
    header: "",
    message: []
  }
})

const resetError = () => {
  error.value = {
    hasError: false,
    header: "",
    message: []
  };
};

//expose reset function so it can be called by the parent
defineExpose({
  resetError
});

const minimise = () => {
  fullscreen.value = false
}

const maximise = () => {
  fullscreen.value = true
}

const closeModal = () => {
  if (props.resetErrorOnClose) resetError();
  visible.value = false
}

const success = async () => {
  if (props.onConfirm) {
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

const pt = computed<DialogPassThroughOptions>(() => ({
  root: [
    'modal modal-dialog modal-content h-auto m-0',
    {
      'mw-100 vh-100 vw-100 top-0 start-0': fullscreen.value,
      'modal-sm': props.size === 'sm',
      'modal-lg': props.size === 'lg',
      'modal-xl': props.size === 'xl'
    }
  ],
  content: [
    'modal-body overflow-y-auto',
    {
      [`${props.maxHeight}`]: props.maxHeight && !fullscreen.value,
      [`${props.minHeight}`]: props.minHeight && !fullscreen.value,
      'pt-0': error.value.hasError
    }
  ]
}))
</script>