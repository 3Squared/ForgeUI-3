<template>
  <div :id="props.name">
    <div v-if="!readonly">
      <div v-if="editing">
        <div class="d-flex justify-content-between align-items-center position-relative" v-on-click-outside="editFinished">
          <slot name="editor" :class="{ 'is-invalid': hasErrors }" :edit-finished="editFinished" :cancel="cancel" :val="value">
            <InputText
                data-cy="input"
                ref="input"
                v-model.trim="value"
                :class="{ 'is-invalid': hasErrors }"
                @keydown.enter="editFinished"
                @keydown.esc="cancel"
            />
          </slot>
          <Icon icon="bi:x-circle" class="mx-2 cursor-pointer" @click="reset" @keydown.enter="reset" data-cy="clear-icon"/>
        </div>
      </div>
      <div v-else class="d-flex text-muted" @click="beginEdit" @focus="beginEdit" >
        <slot>
          <div class="pt-2 pe-2 cursor-pointer" :class="{ 'text-invalid': hasErrors }" data-cy="value">{{ !value ? 'Click to edit' : value }}</div>
        </slot>
        <Button link class="p-0 m-0">
          <Icon icon="bi:pencil" :class="hasErrors ? 'text-invalid' : 'text-muted'" data-cy="edit-icon" @keydown.enter="beginEdit"/>
        </Button>
      </div>
    </div>
    <div v-else>
      <slot >
        <span data-cy="readonly-value">{{ value }}</span>
      </slot>
    </div>
    <small v-show="hasErrors" data-cy="error" class="text-invalid">{{ errorMessage }}</small>
  </div>
  <ForgeToast />
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed, ref } from "vue";
import { TypedSchema, useField } from "vee-validate";
import { useToast } from "primevue/usetoast";
import { vOnClickOutside } from '@vueuse/components'

export interface ForgeInlineEditorProps {
  name?: string,
  rules?: TypedSchema,
  value?: Object | string | number | Date,
  completeAction?: Function,
  params?: Array<any>,
  readonly?: boolean,
}

const props = withDefaults(defineProps<ForgeInlineEditorProps>(),{
  name: "",
  value: "",
  params: Array,
  readonly: false
})

const emits = defineEmits(['input'])

const editing = ref<boolean>(false)
const input = ref()

const beginEdit = () => {
  editing.value = !editing.value
  input.value?.focus()
}

const toasts = useToast()


const editFinished = async () => {
  if(hasErrors.value) {
    return false
  }
  emits('input', value.value)
  if (props.completeAction) {
    try {
      await props.completeAction.apply(this, props.params)
      editing.value = !editing.value
    } catch (completeActionError) {
      toasts.add({ severity: "error", summary: typeof completeActionError === "string" ? completeActionError : `Failed to update: ${completeActionError}` })
    }
  } else {
    editing.value = !editing.value
  }
}

const cancel = () => {
  editing.value = !editing.value
}

const reset = () => {
  value.value = null
}

const { errorMessage, errors, value } = useField(() => props.name, props.rules)

value.value = props.value

const hasErrors = computed(() => errors.value.length > 0)
</script>