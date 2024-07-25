<template>
    <InputNumber v-if="dataType === 'numeric'" v-bind="$attrs" />
    <ForgeDatepicker v-else-if="dataType === 'date'" v-bind="$attrs" :show-icon="false" :show-on-focus="true"/>
    <Dropdown v-else-if="dataType === 'select'" v-bind="$attrs" :options="dropdownOptions" />
    <MultiSelect v-else-if="dataType === 'multiselect'" v-bind="$attrs" :options="dropdownOptions" :showToggleAll="false" placeholder=" " filter />
    <InputText v-else v-bind="$attrs"/>
</template>

<script setup lang="ts"> 
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import ForgeDatepicker from "@/components/ForgeDatepicker.vue";
import MultiSelect from "primevue/multiselect";

export interface ForgeFilterHeaderProps {
  dataType: 'numeric' | 'date' | 'multiselect' | 'select' | undefined,
  dropdownOptions?: any[]
}

const { dataType, dropdownOptions } = defineProps<ForgeFilterHeaderProps>()

</script>