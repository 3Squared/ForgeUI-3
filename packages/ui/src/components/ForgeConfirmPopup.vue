<template>
  <ConfirmPopup :pt="pt" v-bind="{ ...$attrs, ...$props }">
    <template v-for="(_, name) in $slots" #[name]>
      <slot :name="name" />
    </template>
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
    class: ["modal-footer gap-1 p-2"],
  }),
  content: 'pt-2 px-2',
  pcRejectButton: { root: 'btn btn-outline-primary btn-sm' },
  pcAcceptButton: { root: 'btn btn-primary btn-sm' }
}))
</script>