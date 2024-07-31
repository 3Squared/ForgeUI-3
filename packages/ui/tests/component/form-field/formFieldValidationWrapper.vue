<template>
  <Form
      :validation-schema="schema"
  >
    <ForgeFormField v-bind="{ ...props, ...$attrs }"/>
    <Button id="form-button" type="submit" label="Submit" />
  </Form>
</template>

<script setup lang="ts">
import { YupSchema, Form } from "vee-validate";
import { ForgeFormFieldProps } from "../../../dist/src/components/ForgeFormField.vue";


export interface FormFieldValidationWrapperProps extends /* @vue-ignore */ ForgeFormFieldProps {
  schema: YupSchema
}

const props = defineProps<FormFieldValidationWrapperProps>()

</script>