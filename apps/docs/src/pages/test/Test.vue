<template>  
  <div class="pb-3">
    <Multiselect
      v-model="selectedSkills"
      placeholder="Select cities"
      :options="skills"
      option-label="label"
      display="chip"
      filter
      filter-placeholder="Search"
    />
  </div>

  <div>
    <ForgeMultiSelect v-model="selectedSkills" :options="skills" :max-height="700"></ForgeMultiSelect>
  </div>
  {{ selectedSkills }}

  <forge-multi-select-preview v-model="selectedItemsArray" :options="selectedSkills" filter />
  <Card>
    <template #content>
      <Form :validation-schema="schema" @submit="onSubmit" @invalid-submit="onInvalidSubmit">
        <ForgeFormField v-model="name" name="Name" placeholder="Enter name" field-label="Name" />

        <ForgeFormField v-model="selectCity" name="City" type="select" placeholder="Select City" :options="cities" option-label="label" field-label="City" />

        <ForgeFormField
          v-model="selectedSkills"
          name="Skills"
          type="multiselect"
          placeholder="Select Skills"
          :options="skills"
          option-label="label"
          display="chip"
          filter
          filter-placeholder="Search"
          field-label="Skills"
        />
        <div class="d-flex end-0">
          <Button label="Test" type="submit"></Button>
        </div>
      </Form>
    </template>
  </Card>

  <Toast />
  
</template>

<script setup lang="ts">
import Multiselect from "primevue/multiselect";
import { ref } from "vue";
import { ForgeFormField, ForgeMultiSelect, ForgeMultiSelectPreview } from "@3squared/forge-ui-3";
import Button from "primevue/button";
import Card from "primevue/card";
import * as yup from "yup";
import { Form } from "vee-validate";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
const value = ref(0);
const selectedItemsArray = ref([]);
const toast = useToast();
const schema = yup.object().shape({
  City: yup.object().required(),
  Skills: yup.array().min(2, "Please select at least 1 option"),
  Name: yup.string().required()
});

const onSubmit = () => {
  toast.add({ severity: "success", summary: "Success", closable: false, life: 3000 });
};

const onInvalidSubmit = ({ values, errors, results }) => {
  toast.add({ severity: "error", summary: "Bad", closable: false, life: 3000 });

  console.log(values); // current form values
  console.log(errors); // a map of field names and their first error message
  console.log(results); // a detailed map of field names and their validation results
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
  { id: 12, label: "York" }
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
  { id: 12, label: "Problem Solving" }
]);
</script>
<style scoped></style>
