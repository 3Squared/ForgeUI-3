<template>
  <div>
    <ForgePageHeader title="Form Field" />
    <Playground :options="options" :code="code" :config="config" @reset="reset">
      <template #component>
        <component :is="ForgeFormField" v-bind="options" v-model="value" :options="dropdownOptions" option-label="label" />
      </template>
    </Playground>

    <h2>Validation:</h2>

    <p class="flex">
      Forge form field uses a combination of
      <a href="https://vee-validate.logaretm.com/v4/">Vee-Validate</a>
      and
      <a href="https://github.com/jquense/yup">Yup</a>
      to validate inputs. See doc for more info.
    </p>

    <FormExamples />

    <CodeBlock :code="validationExampleCode"></CodeBlock>
  </div>
</template>

<script setup lang="ts">
import { Playground, usePlayground } from "@3squared/forge-playground-3";
import { ForgeFormField, ForgePageHeader } from "@3squared/forge-ui-3";
import { computed, ref, watch } from "vue";
import { formFieldTypes } from "../../../composables/playgroundOptions";
import CodeBlock from "@3squared/forge-playground-3/src/components/CodeBlock.vue";
import FormExamples from "./examples/FormExamples.vue";

const value = ref();
const { options, propVals, config, reset } = usePlayground(
  {
    name: "",
    fieldLabel: "",
    fieldLabelPosition: "top",
    type: "text",
    mask: "",
    placeholder: ""
  },
  {
    type: { type: "select", options: formFieldTypes },
    fieldLabelPosition: { type: "select", options: ["top", "left"] },
    name: { required: true },
    mask: { disabled: (): boolean => options.value.type !== "mask" },
    placeholder: { disabled: (): boolean => options.value.type === "checkbox" }
  }
);

const dropdownOptions = [
  { id: "option-1", label: "Option 1" },
  { id: "option-2", label: "Option 2" },
  { id: "option-3", label: "Option 3" },
  { id: "option-4", label: "Option 4" },
  { id: "option-5", label: "Option 5" },
  { id: "option-6", label: "Option 6" }
];

watch(
  () => options.value.type,
  (newType) => {
    if (newType == "multiselect") {
      value.value = [];
    } else {
      value.value = null;
    }
  }
);

const code = computed(() => `<ForgeFormField${propVals.value.length > 0 ? " " + propVals.value.join(" ") : ""} />`);

const name = ref();

const validationExampleCode = computed(
  () => `
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
          :key="selectCity" --add key for selects
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
          :key="selectedSkills" --add key for selects/multiselects
        />
        <div class="d-flex justify-content-end mt-1">
        <!--          Add Button with type 'submit' to trigger submit event -->
        <Button label="Test" type="submit" ></Button>
        </div>
      </Form>
    </template>
  </Card>

  <Toast />

</template>

<script>
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
  name: yup.string().required()
})


const onSubmit = () => {
  toast.add({ severity: "success", summary: "Success", closable: false, life: 3000 })
}

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

</\script>`
);
</script>
