<template>
  <Button @click="toggle">
    <div class="d-flex">
      <div class="me-3">
        <Icon icon="bi:layout-three-columns" />
      </div>
      Columns ({{ columns.length ?? 0 }}/{{ originalColumns.length ?? 0}})
      <div class="ms-2">
        <Icon :icon="panelVisible ? 'bi:chevron-up' : 'bi:chevron-down'" />
      </div>
    </div>

  </Button>
  <OverlayPanel ref="columnCustomiserPanel" class="column-customiser" @hide="() =>  panelVisible = false" @show="() => panelVisible = true">
    <div class="d-flex flex-column w-100">
      <div v-for="(column, index) in originalColumns" class="d-flex cursor-pointer" :class="{
        'border-top': index !== 0,
        'py-1': index !== 0 && originalColumns.length - 1 !== index,
        'pt-1': originalColumns.length - 1 === index,
        'pb-1': index === 0
      }" @click="toggleColumn(column.field)">
        <Checkbox :id="column.field" :model-value="selectedColumns.find(s => s.field === column.field).selected" binary class="cursor-pointer" />
        <label :for="column.field" class="cursor-pointer">{{ column.header }}</label>
      </div>

    </div>
  </OverlayPanel>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import Checkbox from "primevue/checkbox";
import OverlayPanel from "primevue/overlaypanel";
import { Icon } from '@iconify/vue'
import { onMounted, ref } from "vue";
import { ForgeColumn } from "@/types/forge-types.ts";

const columns = defineModel<ForgeColumn[]>({ required: true })

const columnCustomiserPanel = ref()
const panelVisible = ref<boolean>(false)
const originalColumns = ref<any[]>([])
const selectedColumns = ref<any[]>([])

const toggle = (event : Event) => {
  columnCustomiserPanel.value.toggle(event)
}

const toggleColumn = (field : string) => {
  const column = selectedColumns.value.find(s => s.field === field)

  column.selected = !column.selected;

  columns.value = selectedColumns.value.filter(col => col.selected)
}

onMounted(() => {
  originalColumns.value = [...columns.value]
  selectedColumns.value = [...columns.value].map((s) => ({ ...s, selected: true }))
})
</script>