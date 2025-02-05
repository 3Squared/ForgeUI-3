<template>
  <ToggleButton v-bind="{...$attrs, ...props}" :severity="props.severity" :pt="pt" />
</template>

<script setup lang="ts">
import { Severity } from "@/types/forge-types.ts";
import { computed, ref } from "vue";
import { ToggleButton, ToggleButtonPassThroughMethodOptions } from "primevue";

export interface ForgeToggleButtonProps {
  severity?: Severity,
}

const props = withDefaults(defineProps<ForgeToggleButtonProps>(), {
  severity: 'primary'
})


const pt = computed(() => ({
  root: (options: ToggleButtonPassThroughMethodOptions) =>
      ({
        class: [
          'btn',
          {
            [`btn-${props.severity} focus-ring focus-ring-${props.severity} btn-${props.severity}-subtle border border-2 border-${props.severity} fw-500 text-${props.severity}`]: options.context.active,
            [`border text-${props.severity} select-btn-${props.severity}`]: !options.context.active,
            ['text-secondary btn-secondary-subtle']: options.context.disabled
          },
        ]
      }),
  label: (options: ToggleButtonPassThroughMethodOptions) =>
      ({
        class: [
          {
            [`fw-500`]: options.context.active,
            ['text-secondary']: options.context.disabled
          },
        ]
      }),
}));
</script>