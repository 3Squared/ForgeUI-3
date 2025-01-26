<template>
  <div class="position-relative">
    <span data-cy="above-table-slot" ><slot name="above-table" /></span>
    <DataTable
v-bind="{...props, ...$attrs }" ref="forgeTable"
               class="w-100" :class="`${props.severity ? `forge-table-${props.severity}` : ''}`"  :pt="pt" :rows="perPage" :total-records="total" :filter-display="props.filters ? 'row' : undefined" data-cy="table"
               show-headers @update:filters="emitUpdateFilter" @sort="emitSort" @page="emitPage">
      <template v-for="(_, name) in $slots as unknown as DataTableSlots" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps || {}"></slot>
      </template>
      <template #empty>
        <div class="d-flex w-100">
          <h5 class="mx-auto" data-cy="empty-message">{{ emptyMessage ?? 'No items Found.'}}</h5>
        </div>
      </template>
      <template #header>
        <div :class="props.loading ? 'opacity-50' : ''">
          <div class="d-flex">
            <div class="d-flex align-items-end mb-2">
              <span v-if="paginator && !legacyPaginationFooter">
                <forge-pagination-header v-model:per-page="perPage" :total="total" :page-sizes="pageSizes"  @update:per-page="emitPageSize" />
              </span>
            </div>
            <div class="ms-auto">
              <Button v-if="showClearButton" outlined :class="showExporterButton ? 'me-2' : ''" data-cy="clear-all" @click="clearAllFilters">
                <Icon icon="bi:funnel-fill" width="24" height="24" />
                Clear
              </Button>
              <Button v-if="showExporterButton" outlined data-cy="exporter" @click="exportData">
                <Icon icon="typcn:export" width="24" height="24" />
                Export
              </Button>
              <slot name="column-customiser" />
            </div>
          </div>
        </div>
      </template>
      <slot />
      <template v-if="legacyPaginationFooter" #paginatorstart>
        <span class="d-flex" :class="props.loading ? 'opacity-50' : ''" data-cy="legacy-page-size">
          <span class="me-2 my-auto text-nowrap">Page Size:</span>
          <Select v-model="perPage" :options="pageSizes" class="ms-2" @click="emitPageSize"/>
        </span>
      </template>
      <template v-if="legacyPaginationFooter" #paginatorend >
        <span data-cy="legacy-total" :class="props.loading ? 'opacity-50' : ''">
        {{ total }} {{ pluralise(total, "result") }} across {{ pageText }}
        </span>
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import DataTable, {
  DataTableFilterMeta, DataTableFilterMetaData, DataTablePageEvent,
  DataTablePassThroughOptions,
  DataTableProps,
  DataTableSlots, DataTableSortEvent
} from "primevue/datatable";
import Button from 'primevue/button'
import ForgePaginationHeader from "@/components/table/ForgePaginationHeader.vue";
import { computed, onMounted, ref, watch } from "vue";
import Select from "primevue/select";
import { pluralise } from "@3squared/forge-ui-3/src/components/table/table-helpers";
import { Icon } from '@iconify/vue'
import { ForgeTableContext, Severity } from "../../types/forge-types";

export interface ForgeTableProps extends DataTableProps {
  value: any[],
  legacyPaginationFooter?: boolean,
  showClearButton?: boolean,
  showExporterButton?: boolean,
  stickyHeader?: boolean,
  severity?: Severity,
  clearAll?: () => void,
  emptyMessage?: string
}

const emits = defineEmits(['update:filters', 'update:tableContext', 'sort', 'page'])

const props = withDefaults(defineProps<ForgeTableProps>(), {
  legacyPaginationFooter: false,
  paginator: true,
  alwaysShowPaginator: true,
  showClearButton: false,
  showExporterButton: false,
  stickyHeader: true
})

const forgeTable = ref()
const pageSizes = ref<Array<number>>([5, 10, 20, 50, 100])
const perPage = ref<number>(10)

const tableContext = ref<ForgeTableContext>({
  filters: props.filters,
  perPage: perPage.value,
  page: 0,
  sortDirection: 'None',
  sortField: '',
  total: props.totalRecords ?? props.value.length
})

const total = computed<number>(() => props.totalRecords ?? props.value.length)
const pageText = computed<string>(() => {
  const pages = Math.ceil(total.value / perPage.value)
  return `${pages} ${pluralise(pages, 'page')}`
})
const pt = computed<DataTablePassThroughOptions>(() => ({
  thead: () => ({
    class: [
      {
        'sticky-header': props.stickyHeader
      }
    ],
    style: "position: "
  }),
  loadingIcon: () => {
    return {
      class: [
        'spinner-border border-0',
        {
          'text-brand': props.severity === "brand",
          'text-primary': props.severity === "primary",
          'text-success': props.severity === "success",
          'text-warning': props.severity === "warning",
          'text-danger': props.severity === "danger",
          'text-info': props.severity === "info"
        }]
    }
  }
}))

const clearAllFilters = () => {
  if(props.clearAll) {
    props.clearAll()
  } else {
    for (const key in props.filters){
      if(typeof props.filters[key] === "string") {
        props.filters[key] = ""
      } else {
        (props.filters[key] as DataTableFilterMetaData).value = null
      }
    }
  }

  emitUpdateFilter(props.filters)
}
const exportData = () => {
  forgeTable.value.exportCSV()
}

const emitSort = (sort: DataTableSortEvent) => {
  tableContext.value.sortDirection = sort.sortOrder === 1 ? 'Asc' : sort.sortOrder === -1 ? 'Desc' : 'None'
  tableContext.value.sortField = sort.sortField?.toString() ?? ''
  
  emits("update:tableContext", tableContext.value)
  emits('sort', sort)
}
const emitUpdateFilter = (filters: DataTableFilterMeta | undefined) => {
  tableContext.value.filters = filters

  emits("update:tableContext", tableContext.value)
  emits('update:filters', filters)
}
const emitPage = (page : DataTablePageEvent) => {
  tableContext.value.page = page.page

  emits("update:tableContext", tableContext.value)
  emits('page', page)
}
const emitPageSize = () => {
  tableContext.value.perPage = perPage.value
  
  emits("update:tableContext", tableContext.value)
}

watch(() => props.filters, (newValue) => {
  tableContext.value.filters = newValue
  
  emits("update:tableContext", tableContext.value)
}, {deep: true})

onMounted(() => emits("update:tableContext", tableContext.value))
</script>