<template>
  <div class="btn-group">
    <ForgeToggleButton v-for="(option, index) in options" :onLabel="option.label" :offLabel="option.label" :severity="option.severity" :key="index"
      @change="onOptionSelected($event, option, index)" :defaultValue="option.selected" :disabled="option.disabled"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { Severity } from "@/types/forge-types.ts";
import { ToggleButtonPassThroughMethodOptions } from "primevue";
import ForgeToggleButton from "@/components/ForgeToggleButton.vue";

export interface ForgeSelectButtonProps {
  multiple?: boolean
  allowEmpty?: boolean
}
const props = withDefaults(defineProps<ForgeSelectButtonProps>(), {
  multiple: false,
  allowEmpty: true
})

const emit = defineEmits(['change']);
const options = defineModel<ToggleButtonOption[]>({required: true});

interface ToggleButtonOption {
  label: string,
  value: string,
  severity?: Severity
  disabled?: boolean,
  selected?: boolean,
}

const onOptionSelected = (event: Event, option: ToggleButtonOption, index: number) => {
  console.log(event, option, index)
  if(option.disabled) return;
  if(!props.allowEmpty){
    if(option.selected && (options.value.filter((op) => option.value != op.value && op.selected).length < 1)){
      return;
    }
  }
  
  if(!props.multiple){
    options.value.forEach((opt) => {
      if(opt.value != option.value) opt.selected = false
    })
  }
  
  option.selected = !option.selected;
  emit('change', option)
}
</script>