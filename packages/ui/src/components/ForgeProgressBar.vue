<template>
  <ProgressBar v-bind="{...$attrs, ...props}" :pt="pt" />

</template>

<script setup lang="ts">

import { ProgressBarProps } from "primevue/progressbar";
import { Severity } from "../types/forge-types";
import { computed } from "vue";

export interface ForgeProgressBarProps extends /* vue-ignore */ ProgressBarProps {
  severity: Severity,
  striped: boolean,
  animate: boolean
}

const props = withDefaults(defineProps<ForgeProgressBarProps>(), {
  severity: "primary",
  striped: false,
  animate: false
})

const striped = computed(() => props.striped ? 'progress-bar-striped' : null)
const animate = computed(() => props.animate ? 'progress-bar-animated' : null)

const severity = computed(() => {
  switch (props.severity) {
    case 'secondary':
      return 'bg-secondary'
    case 'success':
      return 'bg-success'
    case 'warning':
      return 'bg-warning'
    case 'danger': 
      return 'bg-danger'
    case 'info':
      return 'bg-info'
    case undefined:
    case 'primary':
    default:
      return 'bg-primary'
  }
})

const pt = computed(() => ({
  value: {
    class: [severity.value, striped.value, animate.value]
  },
}))


</script>