<template>
  <a 
      id="link"
      class="cursor-pointer d-flex"
      :href="url"
      :class="linkClasses"
  >
    <slot>
      <Icon id="link-icon" :icon="iconName" class="bi my-auto" :class="iconClasses" v-if="iconName"/>
      {{ label }}
    </slot>
  </a>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed, defineProps } from "vue";
import { Severity } from "../types/forge-types";

export type LinkOpacity = '10' | '25' | '50' | '75' | '100'
export type UnderlineOffset = '1' | '2' | '3'

export interface ForgeLinkProps {
  url: string,
  opacity?: LinkOpacity,
  severity?: Severity,
  underlineSeverity?: Severity,
  underlineOffset?: UnderlineOffset,
  underlineOpacity?: '0' | LinkOpacity,
  hoverOpacity?: LinkOpacity,
  underlineHoverOpacity?: LinkOpacity,
  label?: string,
  animateIconOnHover?: boolean,
  positionIconEnd?: boolean,
  iconName?: string
}

const {
  severity = 'primary',
  opacity,
  hoverOpacity,
  underlineHoverOpacity,
  underlineOpacity,
  animateIconOnHover,
  underlineOffset,
  underlineSeverity,
  positionIconEnd,
  url
} = defineProps<ForgeLinkProps>()

const linkClasses = computed<Object>(() => ({
  [`link-${severity}`]: severity,
  [`link-underline-${underlineSeverity}`]: underlineSeverity,
  [`link-opacity-${opacity}`]: opacity,
  [`link-opacity-${hoverOpacity}-hover`]: hoverOpacity,
  [`link-underline-opacity-${underlineOpacity ?? opacity}`]: underlineOpacity || opacity,
  [`link-underline-opacity-${underlineHoverOpacity ?? hoverOpacity}-hover`]: underlineHoverOpacity || hoverOpacity,
  [`link-offset-${underlineOffset}`]: underlineOffset,
  'icon-link icon-link-hover': animateIconOnHover,
}))

const iconClasses = computed<Object>(() => ({
  'order-2': positionIconEnd,
  'me-1': !positionIconEnd && !animateIconOnHover,
  'ms-1': positionIconEnd && !animateIconOnHover,
  'ms-0': positionIconEnd && animateIconOnHover,
  'me-0': animateIconOnHover
}))

</script>