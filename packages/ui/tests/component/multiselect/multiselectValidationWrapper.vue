<template>
  <Form
    :validation-schema="schema"
    @submit="submit"
    @invalid="invalid"
  >
    <ForgeMultiSelect name="select" v-bind="$attrs" v-model="selected" :options="options" />
    <Button id="form-button" type="submit" label="Submit" />
  </Form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { YupSchema, Form } from "vee-validate";
import { ForgeMultiSelectProps } from "../../../dist/src/components/ForgeMultiSelect.vue";
import { MultiSelectOption } from "@/types/forge-types.ts";

export interface MultiSelectValidationWrapperProps extends /* @vue-ignore */ ForgeMultiSelectProps {
  schema: YupSchema,
  options: MultiSelectOption<any>[]
}

const { schema, options } = defineProps< MultiSelectValidationWrapperProps>()

const selected = ref<Array<{ label: string, value: string }>>([])

const submit = () => {
  console.log("Valid!")
}

const invalid = () => {
  console.log("Invalid :(")
}

</script>