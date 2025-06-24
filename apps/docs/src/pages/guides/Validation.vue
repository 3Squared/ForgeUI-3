<template>
  <ForgePageHeader title="Validation" />
  <p>
    Forge uses a combination of <a href="https://vee-validate.logaretm.com/v4/">Vee-Validate</a> and <a href="https://github.com/jquense/yup">Yup</a>
  </p>
  <p>
    There are a couple of way of setting up validation with vee-validate, this is the main way we have done it using Forge. You may need to play around to make the validation work with child/parent
    components or with different validation conditions.
  </p>
  <div class="h4"> Forge Form Field</div>
  <p>
    Using the forge form field is the quickest way to set up validation. Visit the playground example,
    <router-link to="/forms/inputs/formfield">Forge form field</router-link>
    .
  </p>
  <p>
    In order to set this validation up you need to create a validation schema. This registers the component as a field to use in a Vee-Validate form. Each component which implements this validation
    will accept a prop called `name`.
    If the <code>name</code> prop doesn't match up with a property in the validation schema the validation won't work.
  </p>
  <p>Use <a class="link" target="_blank" href="https://github.com/jquense/yup?tab=readme-ov-file#yup"><strong>Yup
    4</strong></a> to create your rules for validation. Yup is installed with Forge.UI 3/RailSmart Design System so that it can be used straight out of the box.
  </p>
  <p>
    To do this, first import yup using <code>import * as yup from 'yup'</code> and create a shape using <code>yup.object().shape({})</code>. You can then start to add properties and validation rules.
    For more information on this, please see the <a class="link" target="_blank" href="https://github.com/jquense/yup?tab=readme-ov-file#yup"><strong>Yup </strong></a> documentation site, there are
    lots of different options for building rules.
  </p>
  <p>
    Here is an example of the validation schema:
  </p>
  <CodeBlock :code="validationSchema"></CodeBlock>

  <p>Use field</p>

  You can then utilise the `useForm` method supplied by Vee-Validate, this will return a method called `handleSubmit` to link the form to the validation schema. Here you can define what
  should happen when the validation is successful and unsuccessful. More information can be found <a class="link" target="_blank" href="https://vee-validate.logaretm.com/v4/api/use-form/"><strong>here
  4</strong></a>
  <p>
    The `useField` method also accepts a set of rules as it's second parameter. In Forge.UI 3, this is set to undefined as we want to allow the user to set these via the Validation Schema. Finally it
    accepts some configuration props as the third parameter, typically I have used them to set an initial value or in the case of ForgeCheckbox, used it to specify that it's a checkbox.

    Finally, the `useField` method returns a variety of useful data which Forge.UI 3 uses to handle validation. Typically, each component will use the `handleChange` and `handleBlur` functions and
    pass them to the relevant events emitted by the component. This allows us to run validation once these events are emitted. Each component will also use the `errors` array and `errorMessage` to
    display the validation error back to the user and to add any invalid styling which is required. You can find more out about the `useField` method
    [here](https://vee-validate.logaretm.com/v4/api/use-field/).

  </p>
  
  <div class="h4">Validation with a <code>Form</code></div>
  <div class="h4">Validation within a modal</div>
</template>

<script setup lang="ts">
import CodeBlock from "@3squared/forge-playground-3/src/components/CodeBlock.vue";

const validationSchema = `const validationSchema = yup.object().shape({
    someField: yup.string().required()
})`;
</script>