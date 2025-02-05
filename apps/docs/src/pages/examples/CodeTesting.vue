<template>
  <div>
    <ForgeSelectButton  severity="secondary" v-model="opts" @change="(re) => console.log(re)" >
    </ForgeSelectButton>
  </div>
</template>

<script setup lang="ts">
import { ForgeSelectButton } from "@3squared/forge-ui-3";
import { ref } from "vue";

const opts = ref([
  { label: "Maj", value: 1, severity: "danger", disabled: true, selected: false },
  { label: "Min", value: 2, severity: "warning", disabled: false, selected: false},
  { label: "Pro", value: 3, severity: "success", disabled: false, selected: false },
  { label: "Ex", value: 4, severity: "success-dark", disabled: false, selected: false },
  { label: "N/A", value: 5, severity: "secondary", disabled: false, selected: false }
] );
</script>
