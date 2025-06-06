<template>
  <PickList v-model="model" v-bind="{...$attrs, ...props}"
            @move-all-to-source="allToSource"
            @move-all-to-target="allToTarget"
            @move-to-target="(values) => moveToTarget(values)"
            @move-to-source="(values) => moveToSource(values)"
            style="height: 14rem"
  >
    <template #sourceheader>
      <div v-if="sourceTitle" class="mb-1">{{ sourceTitle }}</div>
      <InputText v-model="sourceFilter" @update:modelValue="filterSource" class="mb-2" placeholder="Search" data-cy="source-search" />
    </template>

    <template #targetheader>
      <div v-if="targetTitle" class="mb-1">{{ targetTitle }}</div>
      <InputText v-model="targetFilter" @update:modelValue="filterTarget" class="mb-2" placeholder="Search" data-cy="target-search" />
    </template>
    <template #option="{ option }">
      {{ option[filterBy] }}
    </template>
  </PickList>
</template>

<script setup lang="ts">
import PickList, { PickListMoveToSourceEvent, PickListMoveToTargetEvent, PickListProps } from "primevue/picklist";
import InputText from "primevue/inputtext";
import { ref, watch } from "vue";

export interface ForgePickListProps extends PickListProps {
  filterBy: string,
  sourceTitle?: string,
  targetTitle?: string,
}

const props = defineProps<ForgePickListProps>();

const model = defineModel<any[][]>();
const targetList = ref<any[]>([]);
const sourceList = ref<any[]>([]);
const sourceFilter = ref<string | null>(null);
const targetFilter = ref<string | null>(null);

const moveToTarget = (event: PickListMoveToTargetEvent) => {
  const { items } = event;
  targetList.value = [...targetList.value, ...items];
  sourceList.value = sourceList.value.filter((option) => !items.includes(option));
};

const moveToSource = (event: PickListMoveToSourceEvent) => {
  const { items } = event;
  sourceList.value = [...sourceList.value, ...items];
  targetList.value = targetList.value.filter((option) => !items.includes(option));
};

const allToSource = () => {
  sourceList.value = targetList.value;
  targetList.value = [];
};

const allToTarget = () => {
  targetList.value = sourceList.value;
  sourceList.value = [];
};

const filterSource = () => {
  const field = props.filterBy;
  const filteredSource = sourceFilter.value
    ? model.value[0]?.filter((option: any) => option[field].toLowerCase().includes(sourceFilter.value?.toLowerCase()))
    : sourceList.value;
  model.value = [filteredSource, model.value[1] ?? []];
};

const filterTarget = () => {
  const field = props.filterBy;
  const filteredTarget = targetFilter.value
    ? model.value[1]?.filter((option: any) => option[field].toLowerCase().includes(targetFilter.value?.toLowerCase()))
    : targetList.value;

  model.value = [model.value[0] ?? [], filteredTarget];
};

watch(() => model.value,
  (initialModel) => {
    if (!initialModel) return;

    targetList.value = initialModel[1] ?? [];
    sourceList.value = initialModel[0] ?? [];

    model.value = [sourceList.value, targetList.value];
  }, { once: true });
</script>