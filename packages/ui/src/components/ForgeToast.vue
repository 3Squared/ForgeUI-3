<template>
  <Toast>
    <template #message="{ message }">
      <Icon v-if="message.severity === 'success'" icon="bi:check-circle-fill" class="text-success" :height="35" />
      <Icon v-if="message.severity === 'error'" icon="bi:x-circle-fill" class="text-danger" :height="35" />
      {{ message.summary }}
    </template>
  </Toast>
</template>

<script setup lang="ts">
import Toast from 'primevue/toast';
import { Icon } from '@iconify/vue'
</script>
