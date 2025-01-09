<template>
  <AutoComplete v-bind="{ ...$attrs, ...$props }" inputClass="form-control border-0">
    <slot v-for="(_, name) in $slots" :slot="name" :name="name" />
  </AutoComplete>
</template>

<script setup lang="ts">
import AutoComplete from "primevue/autocomplete";
</script>
