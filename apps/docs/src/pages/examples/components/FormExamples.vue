<template>
  <div>
    <Card>
      <template #content>
        <!--      Set up form (imported from vee-validate) with schema object and submit function-->
        <Form :validation-schema="schema" @submit="onSubmit">
          <ForgeFormField v-model="name" name="name" placeholder="Enter name" field-label="Name"
                          field-label-position="left"
          
          />

          <ForgeFormField
              :key="selectCity"
              v-model="selectCity"
              field-label-position="left"
              name="city"
              type="select"
              placeholder="Select City"
              :options="cities"
              option-label="label"
              field-label="City"
          />

          <ForgeFormField
              :key="selectedSkills"
              v-model="selectedSkills"
              field-label-position="left"
              name="skills"
              type="multiselect-preview"
              placeholder="Select Skills"
              :options="skills"
              option-label="label"
              display="chip"
              filter
              filter-placeholder="Search"
              field-label="Skills"
          />
          
          <ForgeFormField name="rating" field-label="Rating" v-model="rating" field-label-position="left" >
            <template #default="{ modelValue, updateModel, hasErrors }">
              <ForgeSelectButton :model-value="modelValue"
                                 :options="ratingOptions"
                                 @update:modelValue="updateModel"
                                 :invalid="hasErrors"
              />
            </template>
          </ForgeFormField>
          
          <div class="d-flex justify-content-end mt-1">
            <!--          Add Button with type 'submit' to trigger submit event -->
            <Button label="Test" type="submit"></Button>
          </div>
        </Form>
      </template>
    </Card>

    <Toast />
  </div>
</template>

<script setup lang="ts">
import { ForgeFormField, ForgeSelectButton } from "@3squared/forge-ui-3";
import type { ForgeSelectButtonOption } from "@3squared/forge-ui-3/src/types/forge-types";
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
  rating: yup.array().min(1, "Please select at least 1 option").required()
});

const onSubmit = () => {
  toast.add({
    severity: "success",
    summary: "Success",
    closable: false,
    life: 3000
  });
};

const selectedSkills = ref([]);
const selectCity = ref();
const name = ref();
const rating = ref();

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

const ratingOptions = ref<ForgeSelectButtonOption[]>([
  { label: "Maj", value: "1", severity: "danger", disabled: true, },
  { label: "Min", value: "2", severity: "warning"},
  { label: "Pro", value: "3", severity: "success" },
  { label: "Ex", value: "4", severity: "success-dark" },
  { label: "N/A", value: "5", severity: "secondary" }
]);
</script>
