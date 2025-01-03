<template>
  <Form
      :validation-schema="schema"
      @submit="submit"
      @invalid="invalid"
  >
    <ForgeCheckbox v-bind="{ ...$attrs, ...props }" />
    <Button id="form-button" type="submit" label="Submit" />
  </Form>
</template>

<script setup lang="ts">
import { YupSchema, Form } from "vee-validate";
import { ForgeCheckProps } from "../../../dist/src/components/ForgeCheckbox.vue";
import ForgeCheckbox from "@/components/ForgeCheckbox.vue";

export interface CheckboxValidationWrapperProps extends /* @vue-ignore */ ForgeCheckProps {
  schema: YupSchema
}

const props = defineProps<CheckboxValidationWrapperProps>()

const submit = () => {
  console.log("Valid!")
}

const invalid = () => {
  console.log("Invalid :(")
}

</script>