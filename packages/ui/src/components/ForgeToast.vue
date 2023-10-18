<template>
  <Toast>
    <template #message="{ message }">
      <Icon v-if="message.severity === 'success'" icon="bi:check-circle-fill" class="text-success" :height="35" />
      <Icon v-if="message.severity === 'error'" icon="bi:x-circle-fill" class="text-danger" :height="35" />
      <Icon v-if="message.severity === 'warn'" icon="bi:exclamation-triangle-fill" class="text-warning" :height="35" />
      <Icon v-if="message.severity === 'info'" icon="bi:info-circle-fill" class="text-info" :height="35" />
      {{ message.summary }}
    </template>
  </Toast>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>
