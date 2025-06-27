<template>
  <div>
    <Card>
      <template #content>
        <!--      Set up form (imported from vee-validate) with schema object and submit function-->
        <Form :validation-schema="schema" @submit="onSubmit">
          <ForgeFormField v-model="name" name="Name" placeholder="Enter name" field-label="Name" />
          
          <div class="d-flex justify-content-end mt-1">
            <!--          Add Button with type 'submit' to trigger submit event -->
            <Button label="Submit" type="submit" />
          </div>
        </Form>
      </template>
    </Card>

    <Toast />
  </div>
</template>

<script setup lang="ts">
import { ForgeFormField } from "@3squared/forge-ui-3";
import Button from "primevue/button";
import Card from "primevue/card";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
//Validation imports
import * as yup from "yup";
import { Form } from "vee-validate";
import { ref } from "vue";

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

const name = ref();
</script>
