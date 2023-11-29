<template>
  <div>
    <Button label="Click Me!" data-cy="overlay-toggle" @click="toggle"/>
    <OverlayPanel ref="overlayPanel" data-cy="overlay" v-bind="props">
      {{ props.overlayPanelContent }}
    </OverlayPanel>
  </div>
</template>

<script setup lang="ts">

import { ref } from "vue";
import { OverlayPanelProps } from "primevue/overlaypanel";

export interface OverlayPanelWrapperProps extends /* vue-ignore */ OverlayPanelProps {
  overlayPanelContent: string
}

const props = defineProps<OverlayPanelWrapperProps>()

const overlayPanel = ref()

const toggle = (event) => {
  overlayPanel.value.toggle(event)
}

</script>