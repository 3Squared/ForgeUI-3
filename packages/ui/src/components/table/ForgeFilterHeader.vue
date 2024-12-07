<template>
  <div class="d-flex position-relative">
    <InputNumber v-if="dataType === 'numeric'" v-model="modelValue" v-bind="$attrs" />
    <ForgeDatepicker v-else-if="dataType === 'date'" v-model="modelValue" v-bind="$attrs" :show-icon="false"
                     :show-on-focus="true" />
    <Select v-else-if="dataType === 'select'" v-model="modelValue" v-bind="$attrs" :options="dropdownOptions"
              :option-value="optionValue" :option-label="optionLabel"
    >
      <template #value="{ value, placeholder }">
        <div class="d-flex w-100">
          <span :class="{ 'filter-placeholder': value === null }">{{ label(value, placeholder) }}</span>
          <Button v-if="showClearButton && modelValue !== null"
                  @click.prevent="clear" size="small"
                  class="bg-transparent border-0 ms-auto p-0 pe-1">
            <Icon icon="bi:x" width="1rem" height="1rem" class="text-black" />
          </Button>
        </div>
      </template>
    </Select>
    <MultiSelect v-else-if="dataType === 'multiselect'" v-model="modelValue" v-bind="$attrs" :options="dropdownOptions"
                 :showToggleAll="false" :option-label="optionLabel" :option-value="optionValue" filter display="chip">
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
import Select from "primevue/select";
import ForgeDatepicker from "@/components/ForgeDatepicker.vue";
import MultiSelect from "primevue/multiselect";
import { Icon } from '@iconify/vue';

export interface ForgeFilterHeaderProps {
  dataType: 'numeric' | 'date' | 'multiselect' | 'select' | undefined,
  dropdownOptions?: any[],
  showClearButton?: boolean
  clearFilter?: Function,
  optionLabel?: string,
  optionValue?: string
}

const {
  dataType,
  dropdownOptions,
  clearFilter,
  optionValue,
  optionLabel,
  showClearButton = false
} = defineProps<ForgeFilterHeaderProps>()

const modelValue = defineModel({ required: true })

const label = (values: string[] | string | object, placeholder: string): string => {
  if (!values || (Array.isArray(values) && values.length === 0)) {
    return placeholder;
  }

  const getLabel = (value: any): string => {
    const option = dropdownOptions?.find(opt =>
        optionValue ? opt[optionValue as string] === value : Object.keys(opt).every(key => value.hasOwnProperty(key) && opt[key] === value[key])
    );
    
    return optionLabel ? option[optionLabel] : option;
  };

  if (Array.isArray(values)) {
    return values.map(getLabel).join(', ');
  } else {
    return getLabel(values);
  }
};

const clear = () => {
  if(clearFilter) {
    clearFilter()
  } else {
    modelValue.value = null
  }
}
</script>