<template>
  <div class="position-relative">
    <span data-cy="above-table-slot"><slot name="above-table" /></span>
    <TreeTable
        class="w-100" :class="`${props.severity ? `forge-table-${props.severity}` : ''}`" v-bind="{...props, ...$attrs }" :pt="treetablePT" :filter-display="props.filters ? 'row' : undefined"
        :rows="paginator ? perPage : undefined" data-cy="tree-table"
        show-headers :first="firstValueIndex" @update:filters="emitUpdateFilter" @sort="emitSort" @page="emitPage" @node-expand="(() => setExpanderColumns())">
      <template v-for="(_, name) in $slots as unknown as TreeTableSlots" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps || {}"></slot>
      </template>

      <template #header>
        <div :class="props.loading ? 'opacity-50' : ''">
          <div class="d-flex">
            <div class="d-flex align-items-end mb-2">
                <span v-if="paginator && !legacyPaginationFooter">
                  <ForgePaginationHeader v-model:per-page="perPage" :total="total" :page-sizes="pageSizes" @update:per-page="emitPageSize" />
                </span>
            </div>
            <div class="ms-auto">
              <Button v-if="showClearButton" outlined data-cy="clear-all" @click="clearAllFilters">
                <Icon icon="bi:funnel-fill" width="24" height="24" />
                Clear
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
            <Select v-model="perPage" :options="pageSizes" class="ms-2" @click="emitPageSize" />
          </span>
      </template>
      <template v-if="legacyPaginationFooter" #paginatorend>
          <span data-cy="legacy-total" :class="props.loading ? 'opacity-50' : ''">
          {{ total }} {{ pluralise(total, "result") }} across {{ pageText }}
          </span>
      </template>
    </TreeTable>
  </div>
</template>

<script setup lang="ts">
import TreeTable, {
  TreeTableFilterMeta, TreeTableFilterMetaData, TreeTablePageEvent,
  TreeTablePassThroughMethodOptions,
  TreeTableProps,
  TreeTableSlots, TreeTableSortEvent
} from "primevue/treetable";
import Button from 'primevue/button'
import ForgePaginationHeader from "@/components/table/ForgePaginationHeader.vue";
import { computed, onMounted, ref, watch } from 'vue';
import Select from "primevue/select";
import { pluralise } from "@3squared/forge-ui-3/src/components/table/table-helpers";
import { Icon } from '@iconify/vue'
import { ForgeTableContext, Severity } from "../types/forge-types";

export interface ForgeTreeTableProps extends TreeTableProps {
  stripedRows?: boolean,
  parentExpanderFullRow?: boolean,
  totalColumns?: number,
  severity?: Severity,
  value: any[],
  legacyPaginationFooter?: boolean,
  showClearButton?: boolean,
  clearAll?: () => void,
  emptyMessage?: string
}

const props = withDefaults(
    defineProps<ForgeTreeTableProps>(),
    {
      parentExpanderFullRow: false,
      totalColumns: 1,
      legacyPaginationFooter: false,
      paginator: true,
      alwaysShowPaginator: true,
      showClearButton: false,
      stripedRows: false
    })


const emits = defineEmits(['update:filters', 'update:tableContext', 'sort', 'page'])

const pageSizes = ref<number[]>([5, 10, 20, 50, 100])
const perPage = ref<number>(10)
const firstValueIndex = ref<number>(0);
const pageNumber = ref<number>(0);

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

const treetablePT = computed(() => ({
      root: 'position-relative',
      table: (options: TreeTablePassThroughMethodOptions) => {
        return {
          class: [
            'table position-relative',
            {
              'table-striped': options.attrs.stripedRows,
              'table-hover': options.props.rowHover,
              'table-bordered': options.props.showGridlines,
              'table-sm': options.props.size === 'small',
              'table-lg': options.props.size === 'large',
              'opacity-50': options.props.loading
            }
          ]
        }
      },
      loadingIcon: () => {
        return {
          class: [
            'spinner-border border-0',
            {
              'text-brand': props.severity === "brand",
              'text-primary': props.severity === "primary",
              'text-success': props.severity === "success",
              'text-success-alternate': props.severity === "success-alternate",
              'text-warning': props.severity === "warning",
              'text-danger': props.severity === "danger",
              'text-info': props.severity === "info"
            }]
        }
      },
      row: ({ instance }: TreeTablePassThroughMethodOptions) => [
        {
          'parent-node': instance.node.hasOwnProperty("children")
        }
      ]
    }
));

watch(() => props.parentExpanderFullRow, (newValue) => {
  if (newValue) {
    setExpanderColumns();
  } else {
    removeExpanderColumns();
  }
})

const setExpanderColumns = () => {
  if (props.parentExpanderFullRow) {
    setTimeout(() => {
          const rowExpanderCells = Array.from(
              document.querySelectorAll(".parent-node td.expander-cell")
          );
          const rowExpanderOtherCells = Array.from(
              document.querySelectorAll(".parent-node td")
          );

          rowExpanderOtherCells.forEach((rowExpanderCell) => {
            rowExpanderCell.classList.add("d-none")
          });
          rowExpanderCells.forEach((rowExpanderCell) => {
            rowExpanderCell.setAttribute("colspan", props.totalColumns.toString());
            rowExpanderCell.classList.remove("d-none")
          });
        },
        0
    );
  }
}

const removeExpanderColumns = () => {
  setTimeout(() => {
        const rowExpanderCells = Array.from(
            document.querySelectorAll(".parent-node td.expander-cell")
        );
        const rowExpanderOtherCells = Array.from(
            document.querySelectorAll(".parent-node td")
        );

        rowExpanderCells.forEach((rowExpanderCell) => {
          rowExpanderCell.removeAttribute("colspan");
        });

        rowExpanderOtherCells.forEach((rowExpanderCell) => {
          rowExpanderCell.classList.remove("d-none")
        });
      },
      0
  );
}

const clearAllFilters = () => {
  if (props.clearAll) {
    props.clearAll()
  } else {
    for (const key in props.filters) {
      if (typeof props.filters[key] === "string") {
        props.filters[key] = ""
      } else {
        (props.filters[key] as TreeTableFilterMetaData).value = null
      }
    }
  }

  emitUpdateFilter(props.filters)
}

const emitSort = (sort: TreeTableSortEvent) => {
  tableContext.value.sortDirection = sort.sortOrder === 1 ? 'Asc' : sort.sortOrder === -1 ? 'Desc' : 'None'
  tableContext.value.sortField = sort.sortField?.toString() ?? ''

  emits("update:tableContext", tableContext.value)
  emits('sort', sort)
  setExpanderColumns();
}
const emitUpdateFilter = (filters: TreeTableFilterMeta | undefined) => {
  tableContext.value.filters = filters

  emits("update:tableContext", tableContext.value)
  emits('update:filters', filters)
  setExpanderColumns();
}
const emitPage = (page: TreeTablePageEvent) => {
  tableContext.value.page = pageNumber.value = page.page

  setFirstIndex();
  emits("update:tableContext", tableContext.value)
  emits('page', page)
  setExpanderColumns();
}

const emitPageSize = () => {
  tableContext.value.perPage = perPage.value
  pageNumber.value = 0;

  tableContext.value.page = pageNumber.value = Math.floor(firstValueIndex.value / perPage.value)
  setFirstIndex();
  emits("update:tableContext", tableContext.value)
  setExpanderColumns();
}

watch(() => props.filters, (newValue) => {
  tableContext.value.filters = newValue

  emits("update:tableContext", tableContext.value)
}, { deep: true })


watch(() => props.value, () => {
  setExpanderColumns();
})

onMounted(() => {
  setExpanderColumns();
  emits("update:tableContext", tableContext.value);
})

const setFirstIndex = () => {
  firstValueIndex.value = pageNumber.value * perPage.value;
}


</script>