<template>
  <ForgeMultiSelectPreview v-model="localSelectedOptions" v-bind="{...$attrs, ...props}" />
</template>

<script setup lang="ts">
import { ForgeMultiSelectPreviewProps } from "@/components/ForgeMultiSelectPreview.vue";
import { MultiSelectOption } from "@/types/forge-types.ts";
import { ref } from "vue";


export interface MultiselectPreviewWrapperProps extends /* @vue-ignore */ ForgeMultiSelectPreviewProps {
  selectedOptions: MultiSelectOption<any>[]
}

const props = defineProps<MultiselectPreviewWrapperProps>()
const localSelectedOptions = ref(props.selectedOptions)

</script>