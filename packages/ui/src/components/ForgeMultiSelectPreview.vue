<template>
  <div :class="orientation === 'column' ? 'row' : 'flex-1'" data-cy="multiselect-preview">
    <div :class="orientation === 'row' ? 'col-12 mb-1' : 'col'" data-cy="multiselect-container">
      <MultiSelect v-model="model" v-bind="{...$attrs}" :options="props.options ?? []" optionLabel="label" :placeholder="multiselectPlaceholder" data-cy="multiselect">
        <slot v-for="(_, name) in $slots" :slot="name" :name="name" />
      </MultiSelect>
      <!-- @slot If you need to display some content below the multi select such as validation content-->
      <slot name="after-multi-select" />
    </div>
    <div :class="orientation === 'row' ? 'col-12' : 'col'" data-cy="options-preview">
      <div :style="{ height: height }" class="overflow-auto">
        <div class="border alternating-item-list">
          <div v-if="title" class="p-2 border-top border-bottom" data-cy="title">{{ title }}</div>
          <div v-for="item in model" :key="item.id"
               class="p-2 item d-flex justify-content-between align-items-center">
            <!-- @slot Use this slot if the default labels is not enough, maybe for a b-link to redirect the user to the item -->
            <slot name="list-item" :item="item">
              <span class="d-inline-block">{{ item.shortLabel ? item.shortLabel : item.label }}</span>
            </slot>
            <Button v-if="canRemoveItemFromPreview" link class="m-0 p-0 d-flex align-items-center" @click="removeSelectedItem(item.id)">
              <Icon icon="bi:x" class="close-icon" :data-cy="`close-icon-${item.id}`"/>
            </Button>
          </div>
          <div v-if="model == null || model.length == 0" class="p-2 item d-flex justify-content-between align-items-center">{{ props.optionsPreviewEmptyText }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ForgeMultiSelectOrientation, MultiSelectOption } from "../types/forge-types"; 

export interface ForgeMultiSelectPreviewProps {
  title?: string,
  orientation?: ForgeMultiSelectOrientation,
  height?: string,
  options: MultiSelectOption<any>[],
  canRemoveItemFromPreview?: boolean,
  optionsPreviewEmptyText?: string,
  multiselectPlaceholder?: string
}

const props = withDefaults(defineProps<ForgeMultiSelectPreviewProps>(), {
  orientation: "row",
  canRemoveItemFromPreview: false,
  height: "200px",
  title: "Selected Items",
  optionsPreviewEmptyText: 'No Items Selected.',
  multiselectPlaceholder: "Select"
})

const model = defineModel<MultiSelectOption<unknown>[]>({ default: []})

const removeSelectedItem = (id : unknown) => {
  model.value = model.value.filter((x) => x.id !== id)
}

</script>