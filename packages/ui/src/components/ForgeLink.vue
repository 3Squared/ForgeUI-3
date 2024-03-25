<template>
  <a 
      id="link"
      class="cursor-pointer"
      :class="classes"
  >
  <slot>{{ label }}</slot>
</a>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";
import { Severity } from "../types/forge-types";

type LinkOpacity = '10' | '25' | '50' | '75' | '100'
type UnderlineOffset = '1' | '2' | '3'

export interface ForgeLinkProps {
  opacity?: LinkOpacity,
  severity?: Severity,
  underlineSeverity?: Severity,
  underlineOffset?: UnderlineOffset,
  underlineOpacity?: '0' | LinkOpacity,
  hoverOpacity?: LinkOpacity,
  underlineHoverOpacity?: LinkOpacity,
  animateIconOnHover?: boolean,
  label?: string
}

const {
  severity = 'primary',
  opacity,
  hoverOpacity,
  underlineHoverOpacity,
  underlineOpacity,
  animateIconOnHover,
  underlineOffset,
  underlineSeverity
} = defineProps<ForgeLinkProps>()

const classes = computed<Object>(() => ({
  [`link-${severity}`]: severity,
  [`link-opacity-${opacity}`]: opacity,
  [`link-opacity-${hoverOpacity}-hover`]: hoverOpacity,
  [`link-underline-${underlineSeverity}`]: underlineSeverity,
  [`link-underline-opacity-${underlineOpacity}`]: underlineOpacity,
  [`link-underline-opacity-${underlineHoverOpacity}-hover`]: underlineHoverOpacity,
  [`link-offset-${underlineOffset}`]: underlineOffset,
  'icon-link icon-link-hover': animateIconOnHover  
}))

</script>