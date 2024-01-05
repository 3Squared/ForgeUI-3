<template>
  <Button v-bind="{...props, ...$attrs}" :loading="loading" :disabled="loading || props.disabled" @click="performAction"  />
  <Toast />
</template>

<script setup lang="ts">
  import { ButtonProps } from "primevue/button";
  import Toast from 'primevue/toast'
  import { ref } from "vue";
  import { useToast } from "primevue/usetoast";

  const loading = ref<boolean>(false)

  export interface ForgeActionButtonProps extends /* @vue-ignore */ ButtonProps {
    errorMessage?: string,
    action: Function,
    params?: Array<any>
  }
  
  const props = withDefaults(defineProps<ForgeActionButtonProps>(), {
    errorMessage: "This action failed",
    params: Array
  })
  
  const toasts = useToast()
  
  const performAction = async () => {
    loading.value = true
    try {
      await props.action.apply(this, props.params)
    } catch(e : any) {
      toasts.add({ severity: "error", summary: typeof e === "string" ? e : props.errorMessage})
    }
    loading.value = false
  }
</script>