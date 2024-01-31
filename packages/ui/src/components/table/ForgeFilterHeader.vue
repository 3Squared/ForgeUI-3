<template>
    <InputNumber v-if="column.dataType === 'numeric'" v-bind="$attrs" />
    <ForgeDatepicker v-else-if="column.dataType === 'date'" v-bind="$attrs" :show-icon="false" :show-on-focus="true"/>
    <Dropdown v-else-if="column.dataType === 'select'" v-bind="$attrs" :options="dropdownOptions" class="dropdown-input" />
    <MultiSelect v-else-if="column.dataType === 'multiselect'" v-bind="$attrs" :options="dropdownOptions" :showToggleAll="false" placeholder=" " filter class="dropdown-input" />
    <InputText v-else v-bind="$attrs" />
</template>

<script setup lang="ts">
import MultiSelect from "primevue/multiselect";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import { ForgeColumn } from "../../types/forge-types";
import ForgeDatepicker from "@/components/ForgeDatepicker.vue";

export interface ForgeFilterHeaderProps {
  column: ForgeColumn,
  dropdownOptions?: any[]
}

const { column, dropdownOptions } = defineProps<ForgeFilterHeaderProps>()

</script>