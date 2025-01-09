<template>
  <Form
    :validation-schema="schema"
    @submit="submit"
    @invalid="invalid"
  >
    <ForgeFormField name="select" v-bind="$attrs" v-model="selected" :options="options" option-label="label" :key="selected" type="select"/>
    <Button id="form-button" type="submit" label="Submit" />
  </Form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { YupSchema, Form } from "vee-validate";
//@ts-ignore
import { MultiSelectOption } from "@/types/forge-types.ts";
import { MultiSelectProps } from "primevue/multiselect";
import ForgeFormField from "@/components/ForgeFormField.vue";

export interface MultiSelectValidationWrapperProps extends /* @vue-ignore */ MultiSelectProps {
  schema: YupSchema,
  options: MultiSelectOption<any>[]
}

const { schema, options } = defineProps< MultiSelectValidationWrapperProps>()

const selected = ref<MultiSelectOption[]>([])

const submit = () => {
  console.log("Valid!")
}

const invalid = () => {
  console.log("Invalid :(")
}
</script>