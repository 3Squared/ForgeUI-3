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
import { ForgeCheckProps } from "../../../dist/src/components/ForgeCheckbox.vue";
import { ForgeDatePickerProps } from "../../../dist/src/components/ForgeDatepicker.vue";

export interface CalendarValidationWrapperProps extends /* @vue-ignore */ ForgeDatePickerProps {
  schema: YupSchema
}

const props = defineProps<CalendarValidationWrapperProps>()

const submit = () => {
  console.log("Valid!")
}

const invalid = () => {
  console.log("Invalid :(")
}

</script>