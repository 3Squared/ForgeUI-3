<template>
  <Panel v-bind="{...$attrs}">
    <template #toggleicon="{collapsed}">
      <Icon v-if="collapsed" data-cy="message-icon" icon="bi:chevron-down" />
      <Icon v-if="!collapsed" data-cy="message-icon" icon="bi:chevron-up" />
    </template>
    <template v-for="(_, slot) of $slots as unknown as PanelSlots" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </Panel>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { PanelSlots } from "primevue";
</script>