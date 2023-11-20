<template>
  <div class="d-flex flex-wrap vh-100 justify-content-center align-items-center">
    <InputText v-tooltip.left="'I am a tooltip'" class="w-25"/>
  </div>
</template>

<script setup lang="ts">

export interface TooltipWrapperProps {
  position: 'top' | 'bottom' | 'left' | 'right'
}
</script>
