<template>
  <ForgePickList v-model="list" dataKey="code" filterBy="name" />
</template>

<script setup lang="ts">
import { notSelectedCountries, selectedCountries } from "../data/exampleCountries";
import { onMounted, ref } from "vue";
import { ForgePickList } from "@3squared/forge-ui-3";

const list = ref([]);

onMounted(() => {
  list.value = [notSelectedCountries, selectedCountries];
});
</script>