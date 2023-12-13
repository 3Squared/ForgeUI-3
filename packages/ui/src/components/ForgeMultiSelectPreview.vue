<template>
  <div :class="orientation === 'column' ? 'row' : ''" data-cy="multiselect-preview">
    <div :class="orientation === 'row' ? 'col-12 mb-1' : 'col'" data-cy="multiselect-container">
      <forge-multi-select @update:modelValue="(items) => update(items)" v-model="$attrs.modelValue" :limit-text="limitText" :options="props.options" >
        <template #tag>{{ "" }}</template>
        <template #selection>
          <span v-if="$attrs.modelValue.length > 0" class="pl-1">{{ $attrs.modelValue.length }} items selected</span>
        </template>
        <slot v-for="(_, name) in $slots" :slot="name" :name="name" />
      </forge-multi-select>
      <!-- @slot If you need to display some content below the multi select such as validation content-->
      <slot name="after-multi-select" />
    </div>
    <div :class="orientation === 'row' ? 'col-12' : 'col'" data-cy="options-preview">
      <div :style="{ height: height }" class="overflow-auto">
        <div class="border alternating-item-list">
          <div v-if="title" class="p-2 border-top border-bottom" data-cy="title">{{ title }}</div>
          <div v-for="item in $attrs.modelValue as MultiSelectOption<any>[]" :key="item.id"
               class="p-2 item d-flex justify-content-between align-items-center">
            <!-- @slot Use this slot if the default labels is not enough, maybe for a b-link to redirect the user to the item -->
            <slot name="list-item" :item="item">
              <span class="d-inline-block">{{ item.shortLabel ? item.shortLabel : item.label }}</span>
            </slot>
            <Button v-if="canRemoveItemFromPreview" link class="m-0 p-0 d-flex align-items-center" @click="removeSelectedItem(item.id)">
              <Icon icon="bi:x" class="close-icon" :data-cy="`close-icon-${item.id}`"/>
            </Button>
          </div>
          <div v-if="$attrs.modelValue.length === 0" class="p-2 item d-flex justify-content-between align-items-center">No Items Selected.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ForgeMultiSelectOrientation, MultiSelectOption } from "../types/forge-types";
import { computed, useAttrs } from "vue";
import ForgeMultiSelect from "@/components/ForgeMultiSelect.vue";

export interface ForgeMultiSelectPreviewProps {
  title?: string,
  orientation: ForgeMultiSelectOrientation,
  height: string,
  options: MultiSelectOption<unknown>[],
  canRemoveItemFromPreview?: boolean
}

const props = withDefaults(defineProps<ForgeMultiSelectPreviewProps>(), {
  orientation: "row",
  canRemoveItemFromPreview: false,
  height: "200px",
  title: "Selected Items"
})
const attrs = useAttrs();
const emits = defineEmits(['update:modelValue'])

const limitText = computed((count : number) => `${count} selected`);

const update = (items : MultiSelectOption<unknown>[]) => {
  emits('update:modelValue', items)
}

const removeSelectedItem = (id : unknown) => {
  update((attrs.modelValue as MultiSelectOption<any>[]).filter((x) => x.id !== id))
}

</script>