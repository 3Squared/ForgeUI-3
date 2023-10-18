<template>
  <div>
    <ForgeRemainingCharacters data-cy="remaining-characters" :maxCount="props.maxCount" :currentCount="string.length"/>
    <InputText data-cy="input-field" v-model="string"/>
  </div>
</template>

<script setup lang="ts">
import ForgeRemainingCharacters from "@/components/ForgeRemainingCharacters.vue";
import { ref } from "vue";
import { RemainingCharactersProps } from "../../../src/components/ForgeRemainingCharacters.vue";

const props = defineProps<RemainingCharactersProps>()


let string = ref("")

</script>