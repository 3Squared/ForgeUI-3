<template>
  <div class="btn-group" data-cy="forge-select-button">
    <ForgeToggleButton
      v-for="(option, index) in options" :key="index"
                       :on-label="option.label" :off-label="option.label" 
                       :severity="option.severity"
                       :default-value="isSelected(option)" :disabled="option.disabled" :data-cy="`toggle-button-${option.value}`" :invalid="invalid"
                       @change="onOptionSelected(option)"
    />
  </div>
</template>

<script setup lang="ts">
import { ForgeSelectButtonOption } from "@/types/forge-types.ts";
import ForgeToggleButton from "@/components/ForgeToggleButton.vue";

export interface ForgeSelectButtonProps {
  options: ForgeSelectButtonOption[];
  multiple?: boolean
  allowEmpty?: boolean,
  invalid?: boolean
}

const props = withDefaults(defineProps<ForgeSelectButtonProps>(), {
  multiple: true,
  allowEmpty: false,
  invalid: false,
})

const model = defineModel<string | string[] | null>({ required: true });

const isSelected = (option: ForgeSelectButtonOption) => {
  return props.multiple ? model?.value?.includes(option.value) : model.value === option.value;
};

const onOptionSelected = (option: ForgeSelectButtonOption) => {
  if (option.disabled) return;
  if (props.multiple) {
    let selectedValues = model.value?.length ? [...(model.value as string[])] : [];
    
    const isValueSelected = selectedValues.length >= 1 && selectedValues.includes(option.value)
    
    if(isValueSelected){
      if (!props.allowEmpty && selectedValues.length === 1 ) return;
      selectedValues = selectedValues.length > 1 ? selectedValues.filter((val) => val !== option.value) : [];
    } else {
      selectedValues.push(option.value)
    }    
    model.value = selectedValues;
  
  } else {
    model.value = model.value === option.value && props.allowEmpty ? null : option.value;
  }  
}
</script>