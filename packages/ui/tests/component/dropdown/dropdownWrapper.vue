<template>
  <Select :options="options" class="w-25" id="dropdown"/>
</template>

<script setup lang="ts">
import Select from "primevue/select";

const options = [
  'Option 1',
  'Option 2',
  'Option 3'
]
</script>