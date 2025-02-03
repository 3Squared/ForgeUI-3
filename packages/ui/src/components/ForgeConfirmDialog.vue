<template>
  <ConfirmPopup group="templating" :pt="pt" v-bind="{ ...$attrs, ...$props }">
    <slot v-for="(_, name) in $slots" :slot="name" :name="name" />
  </ConfirmPopup>
</template>

<script setup lang="ts">

import ConfirmPopup, { ConfirmPopupPassThroughOptions } from "primevue/confirmpopup";
import { computed } from "vue";

const pt = computed<ConfirmPopupPassThroughOptions>(() => ({
  root: [
    'card w-fit-content position-absolute',
  ],
  footer: () => ({
    class: ["modal-footer gap-1 p-1"],
  }),
  content: 'p-3',
  pcRejectButton: {root: 'btn btn-outline-primary btn-sm'},
  pcAcceptButton: {root: 'btn btn-primary btn-sm'}
}))
</script>