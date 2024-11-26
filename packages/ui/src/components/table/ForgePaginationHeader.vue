<template>
  <div class="d-flex justify-content-start align-items-baseline" data-cy="pagination-header">
    Number of results per page
    <div class="ms-2">
      <Select :options="props.pageSizes" :model-value="props.perPage" class="page-size"
                @change="(event : SelectChangeEvent) => update(event)" />
    </div>
    <div v-if="props.total">
      <span class="mx-2">|</span>
      <span class="w-auto" data-cy="total">{{ props.total }} {{ pluralise(props.total, 'result') }} across {{ pageText }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
//import Dropdown, { DropdownChangeEvent } from "primevue/dropdown";
import Select, { SelectChangeEvent } from "primevue/select";
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

const update = (event : SelectChangeEvent) => {
  emits('update:perPage', event.value)
}

const pageText = computed<string>(() => {
  const pages = Math.ceil(props.total / props.perPage)
  return `${pages} ${pluralise(pages, 'page')}`
})
</script>