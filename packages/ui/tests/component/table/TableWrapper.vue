<template>
  <ForgeTable>
    <template #header(column(test))="data"> {{ data }}</template>
    <template #header(column(id))>vibes</template>
    <template #header(table)>Gello</template>
  </ForgeTable>
</template>

<script setup lang="ts">
import ForgeTable from '@/components/table/ForgeTable.js'
</script>