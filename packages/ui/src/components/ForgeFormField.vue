<template>
  <forge-checkbox :id="props.name" v-if="props.type === 'checkbox'" :label="props.label" v-bind="$attrs"
                  :name="props.name" v-model="model"/>
  <div class="d-flex flex-column" v-else>
    <label :for="props.name">{{ props.label }}</label>
    <input-number :id="props.name" v-if="props.type === 'number'" v-bind="$attrs"
                  :placeholder="props.placeholder" :input-class="{'is-invalid': hasErrors }" :class="{'is-invalid': hasErrors }"
                  v-model="model"
                  @input="change"
    />
    <Textarea :id="props.name" v-else-if="props.type === 'textarea'" v-bind="$attrs"
              :placeholder="props.placeholder" :class="{'is-invalid': hasErrors }"
              v-model="model"
              @input="change" @blur="handleBlur"
    />
    <InputMask :id="props.name" v-else-if="props.type === 'mask'" v-bind="$attrs"
               :placeholder="props.placeholder" :mask="props.mask" :class="{'is-invalid': hasErrors }"
               v-model="model"
               @input="change" @blur="handleBlur"
    />
    <InputText :id="props.name" v-else-if="props.type === 'text'" v-bind="$attrs" 
               :placeholder="props.placeholder" :class="{'is-invalid': hasErrors }"
               v-model="model"
               @input="change" @blur="handleBlur"
    />
    <small v-show="hasErrors" data-cy="error" class="invalid-feedback">{{ errorMessage }}</small>
  </div>
</template>

<script setup lang="ts">
import InputNumber from 'primevue/inputnumber'
import { useField } from 'vee-validate'
import ForgeCheckbox from "./ForgeCheckbox.vue";
import { computed, watch } from "vue";
import { ForgeFormFieldTypes } from "../types/forge-types";

// @ts-ignore
export interface ForgeFormFieldProps {
  name: string,
  label: string,
  type?: ForgeFormFieldTypes,
  mask?: string,
  placeholder?: string,
}

const model = defineModel<any>()

const props = withDefaults(defineProps<ForgeFormFieldProps>(), {
  mask: "",
  placeholder: "",
  type: "text"
})

const change = (event : any) => {
  if(props.type == "number") {
    handleChange(event.value)
  } else {
    handleChange(event)
  }
}

const { errors, value, errorMessage, handleChange, handleBlur } = useField(() => props.name, undefined, {
  initialValue: model.value
})

const hasErrors = computed(() => errors.value.length > 0)

watch(() => value.value, (newValue) => {
  model.value = newValue
}, { immediate: true })
</script>