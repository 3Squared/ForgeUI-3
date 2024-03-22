<template>
  <a :class="`
    link-${severity}
    link-opacity-${opacity} 
    link-opacity-${hoverOpacity}-hover 
    link-underline-${underlineSeverity}
    link-underline-${underlineOpacity}
    link-underline-${underlineHoverOpacity}-hover
    ${ underlineOffset ? `link-offset-${underlineOffset}` : '' }
    ${ animateIconOnHover ? `icon-link icon-link-hover` : '' }
    `
  ">
    <slot>{{ label }}</slot>
  </a>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
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
  opacity = '100',
  hoverOpacity = '100',
  underlineHoverOpacity = '3',
  underlineSeverity = 'primary',
  underlineOpacity = '100',
  animateIconOnHover = false,
  underlineOffset
} = defineProps<ForgeLinkProps>()

</script>