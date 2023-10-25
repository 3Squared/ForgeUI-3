<template>
  <Message v-bind="{...$attrs, ...props}" unstyled>
    <template #messageicon>
      <div class="me-2 pe-1" v-if="props.icon !== undefined">
        <Icon data-cy="message-icon" :icon="props.icon" :class="`text-${props.severity}`" :height="35" />
      </div>
    </template>
    <slot/>
    <template #closeicon>
      <Icon icon="bi:x-lg" />
    </template>
  </Message>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { MessageProps } from "primevue/message";
const props = withDefaults(
    defineProps<MessageProps>(), 
    {
      sticky: true,
      severity: 'primary'
    })
</script>