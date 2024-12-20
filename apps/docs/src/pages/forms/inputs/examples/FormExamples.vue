<template>
  <Card>
    <template #content>
      <!--      Set up form (imported from vee-validate) with schema object and submit function-->
      <Form @submit="onSubmit" :validation-schema="schema">
        <ForgeFormField
          name="name"
          v-model="name"
          placeholder="Enter name"
          fieldLabel="Name"
        />

        <ForgeFormField
          name="city"
          v-model="selectCity"
          type="select"
          placeholder="Select City"
          :options="cities"
          optionLabel="label"
          fieldLabel="City"
          :key="selectCity"
        />

        <ForgeFormField
          name="skills"
          v-model="selectedSkills"
          type="multiselect-preview"
          placeholder="Select Skills"
          :options="skills"
          optionLabel="label"
          display="chip"
          filter
          filterPlaceholder="Search"
          fieldLabel="Skills"
          :maxSected
          :key="selectedSkills"
        />
        <div class="d-flex justify-content-end mt-1">
          <!--          Add Button with type 'submit' to trigger submit event -->
          <Button label="Test" type="submit"></Button>
        </div>
      </Form>
    </template>
  </Card>

  <Toast />
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
  city: yup.object().required(),
  skills: yup.array().min(1, "Please select at least 1 option").required(),
  name: yup.string().required(),
});

const onSubmit = () => {
  toast.add({
    severity: "success",
    summary: "Success",
    closable: false,
    life: 3000,
  });
};

const selectedSkills = ref([]);
const selectCity = ref();
const name = ref();

const cities = ref([
  { id: 1, label: "London" },
  { id: 2, label: "Manchester" },
  { id: 3, label: "Birmingham" },
  { id: 4, label: "Liverpool" },
  { id: 5, label: "Leeds" },
  { id: 6, label: "Sheffield" },
  { id: 7, label: "Newcastle" },
  { id: 8, label: "Nottingham" },
  { id: 9, label: "Bristol" },
  { id: 10, label: "Cambridge" },
  { id: 11, label: "Oxford" },
  { id: 12, label: "York" },
]);

const skills = ref([
  { id: 1, label: "JavaScript" },
  { id: 2, label: "Python" },
  { id: 3, label: "HTML" },
  { id: 4, label: "CSS" },
  { id: 5, label: "React" },
  { id: 6, label: "Node.js" },
  { id: 7, label: "SQL" },
  { id: 8, label: "Java" },
  { id: 9, label: "C++" },
  { id: 10, label: "Git" },
  { id: 11, label: "Communication" },
  { id: 12, label: "Problem Solving" },
]);
</script>
