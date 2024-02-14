<template>
    <InputNumber v-if="dataType === 'numeric'" v-bind="$attrs" class="w-100"/>
    <ForgeDatepicker v-else-if="dataType === 'date'" v-bind="$attrs" :show-icon="false" :show-on-focus="true" class="w-100"/>
    <Dropdown v-else-if="dataType === 'select'" v-bind="$attrs" :options="dropdownOptions" class="dropdown-input w-100" />
    <MultiSelect v-else-if="dataType === 'multiselect'" v-bind="$attrs" :options="dropdownOptions" :showToggleAll="false" placeholder=" " filter class="w-100 dropdown-input" />
    <InputText v-else v-bind="$attrs" class="w-100"/>
</template>

<script setup lang="ts">
import MultiSelect from "primevue/multiselect";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import ForgeDatepicker from "@/components/ForgeDatepicker.vue";

export interface ForgeFilterHeaderProps {
  dataType: string | undefined,
  dropdownOptions?: any[]
}

const { dataType, dropdownOptions } = defineProps<ForgeFilterHeaderProps>()

</script>