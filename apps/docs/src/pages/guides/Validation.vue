<template>
  <ForgePageHeader title="Validation" class="mx-3" />
  <div class="m-3">
    <p>
      Forge uses a combination of <a href="https://vee-validate.logaretm.com/v4/" class="link">Vee-Validate</a> and <a href="https://github.com/jquense/yup">Yup</a>
    </p>
    <p>
      There are a couple of ways of setting up validation with vee-validate, this is the main way we have done it using Forge. You may need to play around to make the validation work with child/parent
      components or with different validation conditions.
    </p>
    <div class="h4"> Forge Form Field</div>
    <p>
      Using the forge form field is the quickest way to set up validation. Visit the playground example,
      <router-link to="/forms/inputs/formfield" class="link">Forge form field</router-link>
      . The name passed in attaches to the <code>Validation Schema</code>
    </p>
    <p>
      This is set up with a slot <code>#default</code> you can pass any input into. This input can then be treated as usual, you just need to extract the props and pass them into the input. Doing it
      this way means that new inputs don't need to be manually added to the <code>ForgeFormField</code>. A couple of these inputs are already set up in the ForgeFormField, e.g. InputText. Here is an
      example
    </p>
    <CodeBlock :code="formFieldSlot"></CodeBlock>
    <p>
      You can use the <code>ForgeFormField</code> to style your forms, e.g. you can show a field as required or move the field label to either the left or the top.
    </p>

    <div class="h4">Validation Schema</div>
    <p>
      In order to set this validation up you need to create a validation schema. This registers the component as a field to use in a Vee-Validate form. Each component which implements this validation
      will accept a prop called <code>name</code>.
      If the <code>name</code> prop doesn't match up with a property in the validation schema the validation won't work.
    </p>
    <p>Use <a class="link" target="_blank" href="https://github.com/jquense/yup?tab=readme-ov-file#yup"><strong>Yup
      4</strong></a> to create your rules for validation. Yup is installed with Forge.UI 3/RailSmart Design System so that it can be used straight out of the box.
    </p>
    <p>
      To do this, first import yup using <code>import * as yup from 'yup'</code> and create a shape using <code>yup.object().shape({})</code>. You can then start to add properties and validation
      rules.
      For more information on this, please see the <a class="link" target="_blank" href="https://github.com/jquense/yup?tab=readme-ov-file#yup"><strong>Yup </strong></a> documentation site, there are
      lots of different options for building rules.
    </p>
    <p>
      Here is an example of the validation schema:
    </p>
    <CodeBlock :code="validationSchema" />

    <p>The validation schema should be customised based on the type of data you are validating, here is a more complex example</p>
    <CodeBlock :code="yupValidationSchema" />

    <div class="h4">Validation with a <code>Form</code></div>
    <p>
      Connect the validation schema to the <code>form fields</code> by wrapping all the fields in the <a class="link" target="_blank" href="https://vee-validate.logaretm.com/v4/api/form/">Form</a>
      component. This will be imported through
      Vee Validate.
    </p>
    <CodeBlock :code="formImport" />
    <CodeBlock :code="formExample" />

    <p>
      Pass the submit function into the <code>Form</code> component through the <code>@submit</code> listener. You need a <code>Button</code> with the <code>type="Submit"</code> to trigger the submit
      event from the the Form.
    </p>
    <p>There should be a red border that incidents the field with the error. The default message will appear below the input. You can pass a custom message into the <code>required()</code> extension
      in the validation schema</p>
    <CodeBlock :code="formWithButtonExample" />

    <p>Here is a simple example validating a <code>name</code> field.</p>
    <CodeBlock :code="fullFormExample" />
    <SimpleFormValidationExample class="mb-3" />
    <p>See <router-link to="/examples/components/FormExamples" class="link">Form example</router-link>
      for a more complex example of this.
    </p>

    You can then utilise the `useForm` method supplied by Vee-Validate, this will return a method called `handleSubmit` to link the form to the validation schema. Here you can define what
    should happen when the validation is successful and unsuccessful. More information can be found <a class="link" target="_blank" href="https://vee-validate.logaretm.com/v4/api/use-form/"><strong>here
    4</strong></a>
  </div>
</template>

<script setup lang="ts">
import CodeBlock from "@3squared/forge-playground-3/src/components/CodeBlock.vue";
import SimpleFormValidationExample from "../examples/components/SimpleFormValidationExample.vue";

const validationSchema = `const validationSchema = yup.object().shape({
    someField: yup.string().required()
})`;

const formExample = `  
<!--      Set up form (imported from vee-validate) with schema object and submit function-->
  <Form :validation-schema="schema" >
    <ForgeFormField v-model="name" name="Name" placeholder="Enter name" field-label="Name" />  
  </Form>`;

const formWithButtonExample = `  
<!--      Set up form (imported from vee-validate) with schema object and submit function-->
  <Form :validation-schema="schema" @submit="onSubmit">
    <ForgeFormField v-model="name" name="Name" placeholder="Enter name" field-label="Name" />  
        
    <div class="d-flex justify-content-end mt-1">
            <!--          Add Button with type 'submit' to trigger submit event -->
            <Button label="Submit" type="submit" />
    </div>
  </Form>`;


const fullFormExample = `  
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
</\script>
`;

const formImport = `import { Form } from "vee-validate";`;

const yupValidationSchema = `
//Build up validation schema with yup
//Property in the object should match a name on the form input
const schema = yup.object().shape({
  city: yup.object().required(),
  skills: yup.array().min(1, "Please select at least 1 option").required(),
  name: yup.string().required(),
  rating: yup.array().min(1, "Please select at least 1 option").required()
});`;

const formFieldSlot = `<ForgeFormField name="rating" field-label="Rating" v-model="rating">
  <template #default="{ modelValue, updateModel, hasErrors }">
    <ForgeSelectButton :model-value="modelValue"
                       :options="ratingOptions"
                       @update:modelValue="updateModel"
                       :invalid="hasErrors"
    />
  </template>          
</ForgeFormField> 
`;
</script>