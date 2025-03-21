<template>
  <Message v-bind="{...$attrs, ...props}">
    <template #icon>
      <div :class="props.icon ? 'me-2 pe-1' : ''">
        <Icon v-if="props.icon" data-cy="message-icon" :icon="props.icon" :class="`text-${props.severity}`" :height="35" />
      </div>
    </template>
    <slot />
    <template #closeicon>
      <Icon icon="bi:x" />
    </template>
  </Message>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { MessageProps } from "primevue/message";

const props = withDefaults(
    defineProps<MessageProps>(),
    {
      life: undefined,
      closable: false,
      severity: 'primary'
    })
</script>