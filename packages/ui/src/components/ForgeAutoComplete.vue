<template>
  <AutoComplete v-bind="{ ...$attrs, ...$props }" input-class="form-control border-0">
    <template v-for="(_, name) in $slots" #[name]>
      <slot :name="name" />
    </template>
  </AutoComplete>
</template>

<script setup lang="ts">
import AutoComplete from "primevue/autocomplete";
</script>
