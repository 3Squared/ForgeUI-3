<template>
  <div class="btn-group" data-cy="forge-select-button">
    <ForgeToggleButton v-for="(option, index) in options" :onLabel="option.label" :offLabel="option.label" :severity="option.severity" :key="index"
                       @change="onOptionSelected(option)" :defaultValue="option.selected" :disabled="option.disabled" :data-cy="`toggle-button-${option.value}`"
    />
  </div>
</template>

<script setup lang="ts">
import { ForgeSelectButtonOption } from "@/types/forge-types.ts";
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
const options = defineModel<ForgeSelectButtonOption[]>({ required: true });

const onOptionSelected = (option: ForgeSelectButtonOption) => {
  if (option.disabled) return;
  
  const isOptionLastOption = option.selected && (options.value.filter((op) => option.value != op.value && op.selected).length < 1)
  if (!props.allowEmpty && isOptionLastOption) return;

  if (!props.multiple) {
    options.value.forEach((opt) => {
      if (opt.value != option.value) opt.selected = false
    })
  }

  option.selected = !option.selected;
  emit('change', option)
}
</script>