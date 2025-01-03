<template>
  <div>
    <Button label="Click Me!" data-cy="overlay-toggle" @click="toggle"/>
    <Popover ref="overlayPanel" data-cy="overlay" v-bind="props">
      {{ props.overlayPanelContent }}
    </Popover>
  </div>
</template>

<script setup lang="ts">

import { ref } from "vue";
import { PopoverProps } from "primevue/popover";

export interface OverlayPanelWrapperProps extends /* vue-ignore */ PopoverProps {
  overlayPanelContent: string
}

const props = defineProps<OverlayPanelWrapperProps>()

const overlayPanel = ref()

const toggle = (event : Event) => {
  overlayPanel.value.toggle(event)
}

</script>