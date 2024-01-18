<template>
  <Dropdown :options="options" class="w-25" append-to="self"/>
  sdf
</template>

<script setup lang="ts">
import Dropdown from 'primevue/dropdown'

const options = [
  'Option 1',
  'Option 2',
  'Option 3'
]
</script>