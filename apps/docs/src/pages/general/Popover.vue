<template>
  <ForgePageHeader title="Overlay" />
  <Playground :options="options" :code="code" :config="config" @reset="reset">
    <template #component>
      <component :is="OverlayPanel" v-bind="options" ref="popover">
        Popover!
      </component>
      <Button label="Click me!" @click="toggle" />
    </template>
  </Playground>
</template>

<script setup lang="ts">
import { ForgePageHeader } from "@3squared/forge-ui-3";
import OverlayPanel from 'primevue/overlaypanel'
import Button from 'primevue/button'
import { Playground, usePlayground, CodeBlock } from "@3squared/forge-playground-3";
import { computed, ref } from "vue";

const popover = ref()

const toggle = (event : Event) => {
  popover.value.toggle(event);
}

const { options, propVals, config, reset } = usePlayground({
  dismissable: true,
  showCloseIcon: false,
  autoZIndex: true,
  baseZIndex: 0,
  ref: 'popover'
}, {
  ref: { required: true, disabled: () => true },
  baseZIndex: { disabled: (): boolean => options.value.autoZIndex }
})

const code = computed(() => `
  <template>
    <OverlayPanel${propVals.value.length > 0 ? " " + propVals.value.join(" ") : ""} />
    <Button label="Button" @click="toggle"/>
  </template>
 
  <script setup lang="ts">
   const popover = ref()
   
   const toggle = (event : Event) => {
     popover.value.toggle(event);
   }
  <\/script>
`)
</script>