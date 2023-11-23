<template>
  <div class="d-flex flex-wrap vh-100 justify-content-center align-items-center">
    <InputText :id="props.id" v-tooltip.focus="'I am a tooltip'" class="w-25" v-if="props.position === undefined"/>
    <InputText :id="props.id" v-tooltip.focus.left="'I am a tooltip'" class="w-25" v-else-if="props.position === 'left'" />
    <InputText :id="props.id" v-tooltip.focus.ight="'I am a tooltip'" class="w-25" v-else-if="props.position === 'right'" />
    <InputText :id="props.id" v-tooltip.focus.bottom="'I am a tooltip'" class="w-25" v-else-if="props.position === 'bottom'" />
    <InputText :id="props.id" v-tooltip.focus.top="'I am a tooltip'" class="w-25" v-else-if="props.position === 'top'" />

  </div>
</template>

<script setup lang="ts">

export type Position = 'top' | 'bottom' | 'left' | 'right' | undefined

export interface TooltipWrapperProps {
  position: Position,
  id?: string
}

const props = defineProps<TooltipWrapperProps>();
</script>
