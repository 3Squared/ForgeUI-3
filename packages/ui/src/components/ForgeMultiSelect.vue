<template>
  <VueMultiselect v-bind="multiselectProps" :class="[theme, hasErrors ? 'is-invalid' : '']" data-cy="multiselect" @update:modelValue="select" v-model="value" >
    <template #caret="{ toggle }">
      <Icon icon="bi:x" class="my-auto multiselect__clear-icon" @mousedown.prevent.stop="clearSelected()" data-cy="clear" height="18px" width="18px" v-if="shouldShowClearSelection"/>
      <Icon icon="bi:chevron-down" @click="toggle" class="multiselect__select" />
    </template>
    <template v-if="multiselectProps.multiple && showSelectAll && !multiselectProps.async" #beforeList>
      <li class="multiselect__element" @click="selectAll" @mouseover="onMouseOver" @mouseleave="onMouseLeave" data-cy="toggle-all">
        <span :class="`${optionHighlight}`">
          <ForgeCheckbox :value="isAllSelected" class="w-100 p-1">
            <div class="ps-1">Select all</div>
          </ForgeCheckbox>
        </span>
      </li>
    </template>
    <template v-if="multiselectProps.multiple" #option="{option}" >
      <div :data-cy="option.label">
        <ForgeCheckbox :value="isChecked(option)" class="w-100 p-1">
          <div class="ps-1 w-100">{{ option[multiselectProps.label] }}</div>
        </ForgeCheckbox>
      </div>
    </template>
    <template #tag="{option, remove}">
      <div class="multiselect__tag d-inline-flex">
        <div class="my-auto">{{ option.label }}</div>
        <Icon icon="bi:x" class="my-auto multiselect__tag-icon" @mousedown.prevent.stop="removeElement(remove, option)"
              height="18px" width="18px"  />
      </div>
    </template>
    <slot v-for="(_, name) in $slots" :slot="name" :name="name" />
  </VueMultiselect>
  <small v-show="hasErrors" data-cy="error" class="invalid-feedback">{{ errorMessage }}</small>
</template>

<script setup lang="ts">
import VueMultiselect from "vue-multiselect";
import { Severity } from "../types/forge-types";
import { useField } from "vee-validate";
import { Icon } from "@iconify/vue";
import { computed, ref, useAttrs } from "vue";

export interface ForgeMultiSelectProps {
  severity?: Severity,
  showSelectAll?: boolean,
  showClearSelection?: boolean,
  expandLeft?: boolean,
  selectValue?: string,
  name?: string
}

interface VueMultiSelectDefaults extends /* vue-ignore */ ForgeMultiSelectProps {
  multiple: boolean,
  label: string,
  trackBy: string,
  showPointer: boolean,
  placeholder: string,
  allowEmpty: boolean,
  closeOnSelect: boolean,
  clearOnSelect: boolean,
  searchable: boolean,
  async: boolean
}

const props = withDefaults(defineProps<ForgeMultiSelectProps>(), {
  severity: 'primary',
  expandLeft: false,
  showClearSelection: false,
  showSelectAll: false,
  closeOnSelect: false,
  selectValue: "",
  name: ""
})

const removeElement = (remove : Function, element : any) => {
  const elementToRemove = {
    ...element,
    $isDisabled: element.$isDisabled ?? false
  }
  
  remove(elementToRemove);
}

const attrs = useAttrs()
const emits = defineEmits(['update:modelValue'])

const { errors, value, errorMessage } = useField(() => props.name, undefined, {
  initialValue: attrs.modelValue
})

const selectAllHighlighted = ref<boolean>(false)

const multiselectProps = computed<VueMultiSelectDefaults>(() => {
  return {
    multiple: true,
    label: "label",
    trackBy: "id",
    showPointer: !selectAllHighlighted.value,
    placeholder: !!((attrs.searchable === null || attrs.searchable)) ? "Search" : "Select",
    allowEmpty: true,
    selectValue: '',
    closeOnSelect: !!(attrs.multiple === null || attrs.multiple),
    clearOnSelect: !!(attrs.multiple === null || attrs.multiple),
    searchable: !!((attrs.searchable === null || attrs.searchable)) && (attrs.modelValue as Array<any>).length === (attrs.options as Array<any>).length,
    async: false,
    ...attrs
  }
})

const theme = computed<string>(() => `forge-multiselect-${props.severity}`)

const optionHighlight = computed<string>(() => `multiselect__option ${selectAllHighlighted.value ? ' multiselect__option--highlight' : ''} ${isAllSelected.value ? ' multiselect__option--selected' : ''}`)

const isAllSelected = computed<boolean>(() => {
  if (multiselectProps.value && !(multiselectProps.value.multiple || !props.showSelectAll || multiselectProps.value.async)) {
    return false;
  }
  return (attrs.modelValue as Array<any>).length === (attrs.options as Array<any>).length
})

const hasErrors = computed<boolean>(() => errors.value.length > 0)

const shouldShowClearSelection = computed<boolean>(() => {
  return !!(
      (attrs.allowEmpty == null || attrs.allowEmpty) &&
      props.showClearSelection &&
      (multiselectProps.value.multiple ? (attrs.modelValue as Array<any>).length > 0 : attrs.modelValue)
  )
})

const onMouseOver = () => selectAllHighlighted.value = true;

const onMouseLeave = () => selectAllHighlighted.value = false;

const clearSelected = () => {
  value.value = multiselectProps.value.multiple ? [] : null
  emits('update:modelValue', value.value)
}

const select = (value: Array<any>) => {
  emits("update:modelValue", props.selectValue ? value.map(s => s[props.selectValue!]) : value);
}

const isChecked = (option : any) => {
  if(attrs.modelValue !== null){
    return (attrs.modelValue as Array<any>)
        .some(item => multiselectProps.value.selectValue ? option[props.selectValue] === item : option.id === item.id && option.label === item.label)
  }
  return false
}

const selectAll = () => {
  if (isAllSelected.value) {
    clearSelected()
  } else {
    value.value = [...(attrs.options as Array<any>)]
    emits("update:modelValue", [...(attrs.options as Array<any>)])
  }
}
</script>
