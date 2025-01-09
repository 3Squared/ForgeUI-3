<template>
  <Form
      :validation-schema="schema"
      @submit="submit"
      @invalid="invalid"
  >
    <ForgeInlineEditor v-bind="{ ...$attrs, ...props }" />
    <Button id="form-button" type="submit" label="Submit" />
  </Form>
</template>

<script setup lang="ts">
import { YupSchema, Form } from "vee-validate";
//@ts-ignore
import { ForgeInlineEditorProps } from "@/components/ForgeInlineEditor.vue";

export interface InlineEditorValidationWrapperProps extends /* @vue-ignore */ ForgeInlineEditorProps {
  schema: YupSchema
}

const props = defineProps<InlineEditorValidationWrapperProps>()

const submit = () => {
  console.log("Valid!")
}

const invalid = () => {
  console.log("Invalid :(")
}

</script>