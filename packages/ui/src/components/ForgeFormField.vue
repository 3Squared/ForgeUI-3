<template>
  <forge-checkbox
      v-if="props.type === 'checkbox'" :id="props.name" v-bind="$attrs" v-model="model"
      :label="props.fieldLabel" :name="props.name" />
  <div v-else class="d-flex flex-column w-100">
    <div data-cy="input-wrapper" class="d-flex" :class="props.fieldLabelPosition === 'top' ? 'flex-column' : 'flex-row'">
      <label :for="props.name" :class="props.fieldLabelPosition === 'top' ? 'mb-1' : ('me-2 ' + props.labelWidthClass)">
        {{ props.fieldLabel }} <span v-if="required" class="text-danger fw-600">*</span>
      </label>

      <!-- Slot for Custom Inputs -->
      <slot v-bind="{ modelValue: model, updateModel: handleChange, hasErrors  }">
        <!-- Default Inputs (if no input is provided) -->
        <InputNumber
            v-if="props.type === 'number'" :id="props.name" v-bind="$attrs"
            v-model="model" :placeholder="props.placeholder" :input-class="{'is-invalid': hasErrors }"
            :class="{'is-invalid': hasErrors }" @input="change"
        />
        <Textarea
            v-else-if="props.type === 'textarea'" :id="props.name" v-bind="$attrs"
            v-model="model" :placeholder="props.placeholder"
            :class="{'is-invalid': hasErrors }"
            @input="change" @blur="handleBlur"
        />
        <InputMask
            v-else-if="props.type === 'mask'" :id="props.name" v-bind="$attrs"
            v-model="model" :placeholder="props.placeholder" :mask="props.mask"
            :class="{'is-invalid': hasErrors }" @complete="change" @blur="handleBlur"
        />
        <InputText
            v-else-if="props.type === 'text'" :id="props.name" v-bind="$attrs"
            v-model="model" :placeholder="props.placeholder"
            :class="{'is-invalid': hasErrors }"
            @input="change" @blur="handleBlur"
        />
        <Select
            v-else-if="props.type === 'select'" v-bind="{...props,...$attrs}" v-model="model"
            :class="{'is-invalid': hasErrors }" />
        <MultiSelect
            v-else-if="props.type === 'multiselect'" v-bind="{...props,...$attrs}" v-model="model"
            :class="{'is-invalid': hasErrors }" />
        <ForgeMultiSelectPreview
            v-else-if="props.type === 'multiselect-preview'" v-bind="{...props,...$attrs}" v-model="model"
            :class="{'is-invalid': hasErrors }" />
        <ForgeDatepicker
            v-else-if="props.type === 'datepicker'" v-bind="{...props,...$attrs}" v-model="model"
            :class="{'is-invalid': hasErrors }" />
      </slot>

    </div>

    <!-- Validation Error Message -->
    <small v-show="hasErrors && props.type !== 'multiselect' && props.type !== 'datepicker'" data-cy="error" class="invalid-feedback">{{ errorMessage }}</small>
  </div>
</template>

<script setup lang="ts">
import InputNumber from 'primevue/inputnumber'
import { useField } from 'vee-validate'
import ForgeCheckbox from "./ForgeCheckbox.vue";
import { computed, watch } from "vue";
import { ForgeFormFieldTypes } from "../types/forge-types";
import ForgeMultiSelectPreview from "@/components/ForgeMultiSelectPreview.vue";

// @ts-ignore
export interface ForgeFormFieldProps {
  name: string,
  fieldLabelPosition?: 'left' | 'top',
  fieldLabel?: string,
  type?: ForgeFormFieldTypes,
  mask?: string,
  placeholder?: string,
  labelWidthClass?: string,
  required?: boolean,
}

const model = defineModel<any>()

const props = withDefaults(defineProps<ForgeFormFieldProps>(), {
  fieldLabelPosition: 'top',
  mask: "",
  placeholder: "",
  type: "text",
  labelWidthClass: "w-25",
  required: false,
})

const change = (event: any) => {
  if (props.type == "number") {
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