<template>
  <ForgeMultiSelect v-bind="$attrs" v-model="selected" />
</template>

<script setup lang="ts">

import { ref } from "vue";

const selected = ref<Array<{label: string, value: string}>>([])
</script>