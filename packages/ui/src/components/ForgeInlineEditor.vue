<template>
  <div :id="props.name">
    <div v-if="!readonly">
      <div v-if="editing">
        <div v-on-click-outside="editFinished" class="d-flex justify-content-between align-items-center position-relative">
          <slot name="editor" :class="{ 'is-invalid': hasErrors }" :edit-finished="editFinished" :cancel="cancel" :val="value">
            <InputText
                ref="input"
                v-model.trim="value"
                data-cy="input"
                :class="{ 'is-invalid': hasErrors }"
                @keydown.enter="editFinished"
                @keydown.esc="cancel"
            />
          </slot>
          <Icon icon="bi:x-circle" class="mx-2 cursor-pointer" data-cy="clear-icon" @click="reset" @keydown.enter="reset" />
        </div>
      </div>
      <div v-else class="d-flex text-muted" @click="beginEdit" @focus="beginEdit">
        <slot>
          <div class="pe-2 cursor-pointer" :class="{ 'text-invalid': hasErrors }" data-cy="value">{{ !value ? 'Click to edit' : value }}</div>
        </slot>
        <Button link class="p-0 m-0">
          <Icon icon="bi:pencil" :class="hasErrors ? 'text-invalid' : 'text-muted'" data-cy="edit-icon" @keydown.enter="beginEdit" />
        </Button>
      </div>
    </div>
    <div v-else>
      <slot>
        <span data-cy="readonly-value">{{ value }}</span>
      </slot>
    </div>
    <small v-show="hasErrors" data-cy="error" class="text-invalid">{{ errorMessage }}</small>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed, ref, onMounted } from "vue";
import { useField } from "vee-validate";
import { vOnClickOutside } from '@vueuse/components'

export interface ForgeInlineEditorProps {
  name?: string,
  completeAction?: (...params: any[]) => Promise<void>,
  errorAction?: (...params: any[]) => Promise<void>,
  params?: Array<any>,
  errorParams?: Array<any>,
  readonly?: boolean,
}

const props = withDefaults(defineProps<ForgeInlineEditorProps>(), {
  name: "",
  params: Array,
  readonly: false
})

const modelValue = defineModel();
const editing = ref<boolean>(false);
const input = ref();

const beginEdit = () => {
  editing.value = !editing.value;
  input.value?.focus();
}

const editFinished = async () => {
  if (hasErrors.value) {
    return false;
  }
  modelValue.value = value.value
  if (props.completeAction) {
    try {
      await props.completeAction.apply(this, props.params);
      editing.value = !editing.value;
    } catch {
      if (props.errorAction) {
        await props.errorAction.apply(this, props.errorParams ?? []);
      }
    }
  } else {
    editing.value = !editing.value;
  }
}

const cancel = () => {
  editing.value = !editing.value;
}

const reset = () => {
  value.value = null;
}

const { errorMessage, errors, value } = useField(() => props.name, undefined, {
  initialValue: modelValue.value
})

onMounted(() => {
  value.value = modelValue.value;
})

const hasErrors = computed(() => errors.value.length > 0);
</script>