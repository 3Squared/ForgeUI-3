<template>
  <span data-cy="above-table-slot"><slot name="above-table" /></span>
  <DataTable class="w-100" v-bind="{...props, ...$attrs }" :rows="perPage" :total-records="total" :filter-display="props.filters ? 'row' : undefined" ref="forgeTable" @update:filters="updateFilter" :pt="pt" data-cy="table">
    <template v-for="(_, name) in $slots as unknown as DataTableSlots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps || {}"></slot>
    </template>
    <template #header>
      <div class="d-flex">
        <div class="d-flex align-items-end mb-2">
          <span v-if="paginator && !legacyPaginationFooter">
            <forge-pagination-header :total="total ?? value.length" :page-sizes="pageSizes" v-model:per-page="perPage" />
          </span>
        </div>
        <div class="ms-auto">
          <Button v-if="showClearButton" outlined :class="showExporterButton ? 'me-2' : ''" @click="clearAllFilters" data-cy="clear-all">
            <Icon icon="bi:funnel-fill" width="24" height="24" />
            Clear
          </Button>
          <Button v-if="showExporterButton" outlined @click="exportData" data-cy="exporter">
            <Icon icon="typcn:export" width="24" height="24" />
            Export
          </Button>
        </div>
      </div>
    </template>
    <slot />
    <template #paginatorstart v-if="legacyPaginationFooter">
      <span class="d-flex" data-cy="legacy-page-size">
        <span class="me-2 my-auto text-nowrap">Page Size:</span>
        <Dropdown :options="pageSizes" v-model="perPage" class="ms-2" />
      </span>
    </template>
    <template #paginatorend v-if="legacyPaginationFooter" >
      <span data-cy="legacy-total">
      {{ total ?? value.length }} {{ pluralise(total ?? value.length as number, "result") }} across {{ pageText }}
      </span>
    </template>
  </DataTable>
</template>

<script setup lang="ts">
import DataTable, {
  DataTableFilterMeta,
  DataTablePassThroughOptions,
  DataTableProps,
  DataTableSlots
} from "primevue/datatable";
import Button from 'primevue/button'
import ForgePaginationHeader from "@/components/table/ForgePaginationHeader.vue";
import { computed, ref } from "vue";
import Dropdown from "primevue/dropdown";
import { pluralise } from "@3squared/forge-ui-3/src/components/table/table-helpers";
import { Icon } from '@iconify/vue'
import { ForgeTableFilter } from "../../types/forge-types";
import { DefaultPassThrough } from "primevue/ts-helpers";

export interface ForgeTableProps extends DataTableProps {
  value: any[],
  legacyPaginationFooter?: boolean,
  total?: number,
  showClearButton?: boolean,
  showExporterButton?: boolean,
  stickyHeader?: boolean
}

const emits = defineEmits(['update:filters'])

const props = withDefaults(defineProps<ForgeTableProps>(), {
  legacyPaginationFooter: false,
  paginator: true,
  alwaysShowPaginator: true,
  showClearButton: false,
  showExporterButton: false,
  stickyHeader: true
})

const pageSizes = ref<Array<number>>([10, 20, 50, 100])
const perPage = ref<number>(20)
const forgeTable = ref()

const clearAllFilters = () => {
  for (const key in props.filters){
    (props.filters[key] as ForgeTableFilter).value = null;
  }
  updateFilter(props.filters)
}

const updateFilter = (filters : DataTableFilterMeta | undefined) => {
  emits('update:filters', filters)
}

const pageText = computed<string>(() => {
  const pages = Math.ceil((props.total ?? props.value.length) / perPage.value)
  return `${pages} ${pluralise(pages, 'page')}`
})

const exportData = () => {
  forgeTable.value.exportCSV()
}

const pt = computed<DefaultPassThrough<DataTablePassThroughOptions>>(() => ({
  thead: () => ({
    class: [
      {
        'sticky-header': props.stickyHeader
      }
    ],
    style: "position: "
  })
}))

</script>