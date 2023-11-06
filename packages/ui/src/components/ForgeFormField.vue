<template>
  <div class="d-flex flex-column">
    <label :for="props.name" v-if="props.type !== 'checkbox'">{{ props.label }}</label>
    <forge-checkbox :id="props.name" v-if="props.type === 'checkbox'" :rules="rules" :label="props.label" v-bind="$attrs" />
    <input-number :id="props.name" v-else-if="props.type === 'number'" :placeholder="props.placeholder" v-model="value" :input-class="{'is-invalid': hasErrors }" :class="{'is-invalid': hasErrors }" v-bind="$attrs" />
    <Textarea :id="props.name" v-else-if="props.type === 'textarea'" :placeholder="props.placeholder" v-model="value" :class="{'is-invalid': hasErrors }" v-bind="$attrs" />
    <InputMask :id="props.name" v-else-if="props.type === 'mask'" :placeholder="props.placeholder" v-model="value" :mask="props.mask" :class="{'is-invalid': hasErrors }" v-bind="$attrs"/>
    <InputText :id="props.name" v-else-if="props.type === 'text'" placeholder="text" v-model="value" :class="{'is-invalid': hasErrors }" v-bind="$attrs" />
    <small v-if="props.type !== 'checkbox'" data-cy="error" class="invalid-feedback">{{ errorMessage || '&nbsp;'}}</small>
  </div>
</template>

<script setup lang="ts">
import InputNumber from 'primevue/inputnumber'
import { TypedSchema, useField } from 'vee-validate'
import ForgeCheckbox from "./ForgeCheckbox.vue";
import { computed } from "vue";

export interface ForgeFormFieldProps {
  name: string,
  label: string,
  type: string,
  rules?: TypedSchema,
  mask?: string,
  placeholder?: string,
}

const props = withDefaults(defineProps<ForgeFormFieldProps>(), {
  mask: "",
  placeholder: "",
  type: "text" 
})

const { errors, value, errorMessage } = useField(() => props.name, props.rules)

const hasErrors = computed(() => errors.value.length > 0)
</script>