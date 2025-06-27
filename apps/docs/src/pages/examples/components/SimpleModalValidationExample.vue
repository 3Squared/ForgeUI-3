<template>
  <!-- Set the submit button type to 'submit' to make it trigger validation --->
  <!-- onConfirm is the event trigger by the submit button, the forge modal will catch any errors that are thrown in this and stop the modal closing --->
  <ForgeModal v-model:visible="visible" :on-confirm="onSubmit" submit-button-type="submit" @show="reset">
    <ForgeFormField v-model="name" name="Name" placeholder="Enter name" field-label="Name" />

  </ForgeModal>

  <Button @click="visible = true">Show Modal</Button>
  <Toast />
</template>

<script setup lang="ts">
import Button from "primevue/button";
import { ref } from "vue";
import { ForgeFormField, ForgeModal } from "@3squared/forge-ui-3";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
//Validation imports
import * as yup from "yup";
import { useForm } from "vee-validate";

const toast = useToast();

//Build up validation schema with yup
//Property in the object should match a name on the form input
const schema = yup.object().shape({
  Name: yup.string().required()
});

const visible = ref(false);
const name = ref();

const { handleSubmit } = useForm({ validationSchema: schema });

//throw error here to be caught by the ForgeModal
//without this the modal will close automatically
//this will be reset when the modal is closed
const onInvalidSubmit = () => {
  throw Error("Enter required fields");
};

const onSubmit = handleSubmit(() => {
  toast.add({
    severity: "success",
    summary: "Success",
    closable: false,
    life: 3000
  });
}, onInvalidSubmit);

const reset = () => {
  name.value = "";
}
</script>
