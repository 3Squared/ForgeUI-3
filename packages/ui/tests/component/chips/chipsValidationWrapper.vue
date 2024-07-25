<template>
  <Form
      :validation-schema="schema"
      @submit="submit"
      @invalid="invalid"
  >
    <ForgeChips v-bind="{ ...$attrs, ...props }" />
    <Button id="form-button" type="submit" label="Submit" />
  </Form>
</template>

<script setup lang="ts">
import { YupSchema, Form } from "vee-validate";
import { ForgeChipsProps } from "../../../dist/src/components/ForgeChips.vue";

export interface ChipsValidationWrapperProps extends /* @vue-ignore */ ForgeChipsProps {
  schema: YupSchema
}

const props = defineProps<ChipsValidationWrapperProps>()

const submit = () => {
  console.log("Valid!")
}

const invalid = () => {
  console.log("Invalid :(")
}

</script>