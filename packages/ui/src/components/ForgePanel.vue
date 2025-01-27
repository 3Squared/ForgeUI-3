<template>
  <Panel v-bind="{...$attrs}">
    <template #toggleicon="{collapsed}">
      <Icon v-if="collapsed" data-cy="message-icon"  icon="bi:chevron-down"  />
      <Icon v-if="!collapsed" data-cy="message-icon"  icon="bi:chevron-up"  />
    </template>
    <slot />
  </Panel>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>