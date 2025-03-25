<template>
  <ToggleButton v-bind="{...$attrs, ...props}" :severity="props.severity" :pt="pt" />
</template>

<script setup lang="ts">
import { Severity } from "@/types/forge-types.ts";
import { computed } from "vue";
import { ToggleButton, ToggleButtonPassThroughMethodOptions } from "primevue";

export interface ForgeToggleButtonProps {
  severity?: Severity
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
            [`focus-ring focus-ring-${props.severity} btn-${props.severity}-subtle border border-2 border-${props.severity} fw-500 text-${props.severity} z-1`]: options.context.active,
            [`border text-${props.severity} select-btn-${props.severity} z-0`]: !options.context.active,
            ['btn-secondary-subtle']: options.context.disabled,
            ['border-danger']: options.props.invalid
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