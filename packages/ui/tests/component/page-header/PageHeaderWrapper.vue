<template>
  <div>
    <ForgePageHeader :title="props.title">
      <template #default>
        I'm in the slot!
      </template>
    </ForgePageHeader>
  </div>
</template>

<script setup lang="ts">
import ForgePageHeader from "@/components/ForgePageHeader.vue";
import { ref } from "vue";
import { ForgePageHeaderProps } from "../../../src/components/ForgePageHeader.vue";

const props = defineProps<ForgePageHeaderProps>()

let string = ref("")
</script>