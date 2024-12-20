<template>
  <Form
      :validation-schema="schema"
      @submit="submit"
      @invalid="invalid"
  >
    <ForgeDatepicker v-bind="{ ...$attrs, ...props }" />
    <Button id="form-button" type="submit" label="Submit" />
  </Form>
</template>

<script setup lang="ts">
import { YupSchema, Form } from "vee-validate";
import { ForgeDatePickerProps } from "../../../dist/src/components/ForgeDatepicker.vue";

export interface DatepickerValidationWrapperProps extends /* @vue-ignore */ ForgeDatePickerProps {
  schema: YupSchema
}

const props = defineProps<DatepickerValidationWrapperProps>()

const submit = () => {
  console.log("Valid!")
}

const invalid = () => {
  console.log("Invalid :(")
}

</script>