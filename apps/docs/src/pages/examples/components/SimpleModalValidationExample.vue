<template>
  <ForgeModal ref="modalRef" v-model:visible="visible" :error="error" :on-confirm="onSubmit" submit-button-type="submit" >
    <ForgeFormField v-model="name" name="Name" placeholder="Enter name" field-label="Name" />
    
  </ForgeModal>

  <Button @click="visible = true">Show Modal</Button>
</template>

<script setup lang="ts">
import Button from "primevue/button"
import { ref } from "vue";
import { ForgeModalError } from "@3squared/forge-ui-3/dist/src/components/ForgeModal.vue";
import { ForgeFormField, ForgeModal } from "@3squared/forge-ui-3";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
//Validation imports
import * as yup from "yup";
import { Form } from "vee-validate";

const toast = useToast();

//Build up validation schema with yup
//Property in the object should match a name on the form input
const schema = yup.object().shape({
  Name: yup.string().required(),
});

const onSubmit = () => {
  toast.add({
    severity: "success",
    summary: "Success",
    closable: false,
    life: 3000
  });
};


const visible = ref(false)
const error = ref<ForgeModalError>()
const modalRef = ref();
const name = ref();

const cancel = () => {
  modalRef.value?.resetError();
  visible.value = false
}

const save = async () => {
  error.value = {
    hasError: true,
    header: 'I am an error',
    message: []
  };
};
</script>
