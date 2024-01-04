<template>
  <Button v-bind="{...props, ...$attrs}" :loading="isLoading" :disabled="isLoading" @click="performAction"/>
  <!--  TODO: Add toast back in when 'Fix Toasts' branch is merged. -->
  <!--  <ForgeToast />-->
</template>

<script setup lang="ts">
  import { ButtonProps } from "primevue/button";
  import { computed, ref } from "vue";
  //TODO: Add toast back in when 'Fix Toasts' branch is merged.
  //import { useToast } from "primevue/usetoast";

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
  
  //TODO: Add toast back in when 'Fix Toasts' branch is merged.
  //const toasts = useToast()
  
  const isLoading = computed(() => loading.value)
  
  const performAction = async () => {
    loading.value = true
    try {
      await props.action.apply(this, props.params)
    } catch(e : any) {
      //TODO: Add toast back in when 'Fix Toasts' branch is merged.
      //toasts.add({ severity: "error", summary: typeof e === "string" ? e : props.errorMessage})
    }
    loading.value = false
  }
</script>