<template>
  <Button v-bind="{...props, ...$attrs}" :loading="loading" :disabled="loading || props.disabled" @click="performAction" />
  <Toast />
</template>

<script setup lang="ts">
import { ButtonProps } from "primevue/button";
import Toast from 'primevue/toast'
import { ref } from "vue";

const loading = ref<boolean>(false)

export interface ForgeActionButtonProps extends /* @vue-ignore */ ButtonProps {
  action: (...param: any[]) => Promise<void>,
  errorAction: (...param: any[]) => Promise<void>,
  errorParams?: Array<any>,
  params?: Array<any>
}

const props = withDefaults(defineProps<ForgeActionButtonProps>(), {
  errorMessage: "This action failed",
  params: Array
})

const performAction = async () => {
  loading.value = true
  try {
    await props.action.apply(this, props.params)
  } catch (e: any) {
    await props.errorAction.apply(this, props.errorParams ? [...props.errorParams, e] : [e])
  }
  loading.value = false
}
</script>