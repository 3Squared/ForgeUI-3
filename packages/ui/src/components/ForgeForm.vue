<template>
  <form v-bind="$attrs" novalidate class="position-relative shadow-sm border p-4 bg-white" @submit.prevent="submit">
    <template v-if="!hideTitle">
      <slot name="title">
        <h3 :class="titleClass" data-cy="form-title">{{ title }}</h3>
      </slot>
      <hr />
    </template>

    <forge-alert v-if="error.hasError" severity="danger" data-cy="error">
      <slot name="error" :error="error.message">
        {{ error.message }}
      </slot>
    </forge-alert>

    <slot />

    <div class="d-flex justify-content-between">
      <slot name="cancel">
        <!--
        Triggered when the cancel button is clicked
        @event cancel
        -->
        <Button
v-if="!hideCancel" data-cy="cancel-btn" type="reset" severity="secondary" outlined
                  @click="$emit('cancel')">{{ cancelText }}
        </Button>
      </slot>
      <slot name="submit" :submit="submit">
        <Button data-cy="submit-btn" type="submit" severity="primary" class="ms-auto">
          {{ submitText }}
        </Button>
      </slot>
    </div>
    <forge-loader v-if="loading" data-cy="loading-spinner"/>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ForgeAlert from "./ForgeAlert.vue";
import ForgeLoader from "./ForgeLoader.vue";

export interface ForgeFormProps {
  onSubmit: () => Promise<void>,
  title?: string,
  hideTitle?: boolean,
  titleClass?: string,
  submitText?: string,
  cancelText?: string,
  hideCancel?: boolean
}

const props = withDefaults(defineProps<ForgeFormProps>(), {
  title: "Forge Form Title",
  hideTitle: false,
  titleClass: "",
  submitText: "Submit",
  cancelText: "Cancel",
  hideCancel: false
})

const loading = ref(false);
const error = ref({
  hasError: false,
  message: ""
});

async function submit() {
  loading.value = true;
  error.value.hasError = false;
  try {
    await props.onSubmit();
  } catch (e: Error | any) {
    error.value.hasError = true;
    if (e.message) {
      error.value.message = e.message;
    }
  }
  loading.value = false;
}

</script>