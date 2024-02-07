<template>
  <div class="d-flex justify-content-start align-items-baseline">
    Number of results per page
    <div class="ms-2">
      <Dropdown :options="props.pageSizes" :model-value="props.perPage"
                @change="(event : DropdownChangeEvent) => update(event)" />
    </div>
    <div v-if="props.total">
      <span class="mx-2">|</span>
      <span class="w-auto">{{ props.total }} {{ pluralise(props.total, 'result') }} across {{ pageText }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import Dropdown, { DropdownChangeEvent } from "primevue/dropdown";
import { computed } from "vue";
import { pluralise } from "./table-helpers";

export interface ForgePaginationHeaderProps {
  total: number,
  pageSizes?: Array<number>,
  perPage?: number
}

const emits = defineEmits(['update:perPage'])

const props = withDefaults(defineProps<ForgePaginationHeaderProps>(), {
  pageSizes: () => [5, 10, 25, 50, 100],
  perPage: 10
})

const update = (event : DropdownChangeEvent) => {
  emits('update:perPage', event.value)
}

const pageText = computed<string>(() => {
  const pages = Math.ceil(props.total / props.perPage)
  return `${pages} ${pluralise(pages, 'page')}`
})
</script>