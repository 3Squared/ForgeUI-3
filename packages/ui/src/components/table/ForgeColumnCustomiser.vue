<template>
  <Button @click="togglePanel" class="ms-2">
    <div class="d-flex">
      <div class="me-3">
        <Icon icon="bi:layout-three-columns" />
      </div>
      Columns ({{ columns.filter(s => s.selected).length ?? 0 }}/{{ columns.length ?? 0 }})
      <div class="ms-2">
        <Icon :icon="panelVisible ? 'bi:chevron-up' : 'bi:chevron-down'" />
      </div>
    </div>
  </Button>

  <Popover ref="columnCustomiserPanel" class="column-customiser" @hide="() =>  panelVisible = false" @show="() => panelVisible = true">
    <div class="d-flex flex-column w-100">
      <div v-for="(column, index) in columns" class="d-flex cursor-pointer"
           :class="{
            'border-top': index !== 0,
            'py-1': index !== 0 && columns.length - 1 !== index,
            'pt-1': columns.length - 1 === index,
            'pb-1': index === 0
           }"
      >
        <ForgeCheckbox :id="column.field" v-model="column.selected" binary class="cursor-pointer" :label="column.header" />
      </div>
    </div>
  </Popover>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Popover from "primevue/popover";
import { Icon } from '@iconify/vue'
import { onMounted, ref } from "vue";
import { ForgeColumn } from "@/types/forge-types.ts";
import ForgeCheckbox from "@/components/ForgeCheckbox.vue";

const columns = defineModel<ForgeColumn[]>({ required: true })

const columnCustomiserPanel = ref()
const panelVisible = ref<boolean>(false);

const togglePanel = (event: Event) => {
  columnCustomiserPanel.value.toggle(event)
}
</script>