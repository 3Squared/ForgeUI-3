<template>
  <h1>I am a Form</h1>
  <Form
      @submit="submit"
      :validation-schema="schema"
  >
    <ForgeMultiSelect name="options" v-model="options" :options="s" />
    <ForgeInlineEditor name="name" v-model="name" />
    
    <!--    Type submit is crucial, you'll be able to set the button type on forge modal-->
    <Button label="Submit" type="submit" />
  </Form>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate'
import Button from 'primevue/button'
import { ForgeMultiSelect, ForgeInlineEditor } from '@3squared/forge-ui-3'
import * as yup from 'yup'
import { ref } from "vue";

// Define all of your variables to add ForgeFormFields
const options = ref([
  { id: "1", label: "I" }
])
const name = ref()

const s = [
  { id: "1", label: "I" },
  { id: "2", label: "am"},
  { id: "3", label: "an"},
  { id: "4", label: "option"}
]

// Create your schema using Yup
const schema = yup.object().shape({
  name: yup.string().min(3).required("Required"),
  options: yup.array().min(3).required("Required")
})

// Will only run when the schema is valid
const submit = () => {
  console.log("Valid?")
}

</script>