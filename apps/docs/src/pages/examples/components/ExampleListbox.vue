<template>
  <Listbox v-model="selectedCity" :options="cities" optionLabel="name" checkmark filter multiple />
</template>

<script setup lang="ts">
import Listbox from "primevue/listbox";
import { ref } from "vue";

const selectedCity = ref();
const cities = ref([
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' }
]);
</script>