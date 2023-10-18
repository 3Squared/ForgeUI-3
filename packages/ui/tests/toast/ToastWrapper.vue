<template>
  <div>
    <Button @click="showToast">Test Toast</Button>
    <ForgeToast />
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import ForgeToast from '@/components/ForgeToast.vue';
import { useToast } from 'primevue/usetoast'
import { PropType } from 'vue';

const props = defineProps({
  message: {
    type: String,
    required: true
  },
  severity: {
    type: String as PropType<'success' | 'error'>,
    required: true
  }
})


const toast = useToast();
function showToast() {
  toast.add({ severity: props.severity, summary: props.message });
}


</script>
