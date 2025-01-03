<template>
  <ForgeMultiSelectPreview v-model="localSelectedOptions" v-bind="{...$attrs, ...props}" />
</template>

<script setup lang="ts">
import { ForgeMultiSelectPreviewProps } from "../../../src/components/ForgeMultiSelectPreview.vue";
import { MultiSelectOption } from "../../../src/types/forge-types";
import { ref } from "vue";
import ForgeMultiSelectPreview from "@/components/ForgeMultiSelectPreview.vue";

export interface MultiselectPreviewWrapperProps extends /* @vue-ignore */ ForgeMultiSelectPreviewProps {
  selectedOptions: MultiSelectOption<any>[]
}

const props = defineProps<MultiselectPreviewWrapperProps>()
const localSelectedOptions = ref(props.selectedOptions)

</script>