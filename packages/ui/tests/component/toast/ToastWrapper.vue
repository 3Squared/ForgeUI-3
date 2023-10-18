<template>
  <div>
    <Button @click="showToast">Test Toast</Button>
    <ForgeToast />
  </div>
</template>

<script setup lang="ts">
import ForgeToast from '@/components/ForgeToast.vue';
import { useToast } from 'primevue/usetoast'

export interface ToastWrapperProps {
  message: string;
  severity: 'success' | 'error' | 'warn' | 'info';
}

const props = defineProps<ToastWrapperProps>();

const toast = useToast();

function showToast() {
  toast.add({ severity: props.severity, summary: props.message });
}
</script>
