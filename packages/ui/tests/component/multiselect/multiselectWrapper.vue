<template>
  <MultiSelect v-bind="$attrs" v-model="selected" option-label="label" placeholder="Select"/>
</template>

<script setup lang="ts">
import { ref } from "vue";
//@ts-ignore
import { MultiSelectOption } from "@/types/forge-types.ts";

const selected = ref<MultiSelectOption[]>([])
</script>