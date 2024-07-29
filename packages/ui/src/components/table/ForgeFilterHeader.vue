<template>
  <div class="d-flex position-relative">
    <InputNumber v-if="dataType === 'numeric'" v-model="modelValue" v-bind="$attrs" />
    <ForgeDatepicker v-else-if="dataType === 'date'" v-model="modelValue" v-bind="$attrs" :show-icon="false"
                     :show-on-focus="true" />
    <Dropdown v-else-if="dataType === 'select'" v-model="modelValue" v-bind="$attrs" :options="dropdownOptions">
      <template #value="{ value, placeholder }">
        <div class="d-flex w-100">
          <span :class="{ 'filter-placeholder': value === null }">{{ value !== null ? value : placeholder }}</span>
          <Button v-if="showClearButton && modelValue !== null"
                  @click.prevent="clear" size="small"
                  class="bg-transparent border-0 ms-auto p-0 pe-1">
            <Icon icon="bi:x" width="1rem" height="1rem" class="text-black" />
          </Button>
        </div>
      </template>
    </Dropdown>
    <MultiSelect v-else-if="dataType === 'multiselect'" v-model="modelValue" v-bind="$attrs" :options="dropdownOptions"
                 :showToggleAll="false" filter>
      <template #value="{ value, placeholder }">
        <div class="d-flex w-100">
          <span :class="{ 'filter-placeholder': (value as string[])?.length === 0 }">{{ value !== null && (value as string[])?.length > 0 ? (value as string[]).join(', ') : placeholder }}</span>
          <Button v-if="showClearButton && (value as [])?.length > 0" @click.prevent="clear" size="small"
                  class="bg-transparent border-0 ms-auto p-0 pe-1">
            <Icon icon="bi:x" width="1rem" height="1rem" class="text-black" />
          </Button>
        </div>
      </template>
    </MultiSelect>
    <InputText v-else v-model="modelValue" v-bind="$attrs" />
    <Button v-if="showClearButton && modelValue !== null && dataType !== 'select' && dataType !== 'multiselect' && dataType !== 'date'"
            @click.prevent="clear" size="small"
            class="bg-transparent border-0 ms-auto p-0 pe-1 position-absolute end-0 top-0 bottom-0">
      <Icon icon="bi:x" width="1rem" height="1rem" class="text-black bg-white" />
    </Button>
  </div>

</template>

<script setup lang="ts"> 
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import ForgeDatepicker from "@/components/ForgeDatepicker.vue";
import MultiSelect from "primevue/multiselect";
import { Icon } from '@iconify/vue'

export interface ForgeFilterHeaderProps {
  dataType: 'numeric' | 'date' | 'multiselect' | 'select' | undefined,
  dropdownOptions?: any[],
  showClearButton?: boolean
  clearFilter?: Function
}

const { dataType, dropdownOptions, clearFilter, showClearButton = false } = defineProps<ForgeFilterHeaderProps>()

const modelValue = defineModel({ required: true })

const clear = () => {
  if(clearFilter) {
    clearFilter()
  } else {
    modelValue.value = null
  }
}
</script>