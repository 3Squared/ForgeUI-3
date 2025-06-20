<template>
  <ForgePageHeader title="Validation" />
  <p class="flex">
    Forge uses a combination of
    <a href="https://vee-validate.logaretm.com/v4/">Vee-Validate</a>
    and
    <a href="https://github.com/jquense/yup">Yup</a>
  </p>
  <p>
    There are a couple of way of setting up validation with vee-validate, this is the main way we have done it using Forge. You may need to play around to make the validation work with child/parent
    components or with different validation conditions.
    
    Using the forge form field, you can quickly 

    In order to set this validation up you need to create a validation schema. This registers the component as a field to use in a Vee-Validate form. Each component which implements this validation
    will accept a prop called `name`, this prop is passed to validation schema.
    If the <strong>`name`</strong> prop doesn't match up with a property in the validation schema the validation won't work.
  </p>
  <p>
    The `useField` method also accepts a set of rules as it's second parameter. In Forge.UI 3, this is set to undefined as we want to allow the user to set these via the Validation Schema. Finally it
    accepts some configuration props as the third parameter, typically I have used them to set an initial value or in the case of ForgeCheckbox, used it to specify that it's a checkbox.

    Finally, the `useField` method returns a variety of useful data which Forge.UI 3 uses to handle validation. Typically, each component will use the `handleChange` and `handleBlur` functions and
    pass them to the relevant events emitted by the component. This allows us to run validation once these events are emitted. Each component will also use the `errors` array and `errorMessage` to
    display the validation error back to the user and to add any invalid styling which is required. You can find more out about the `useField` method
    [here](https://vee-validate.logaretm.com/v4/api/use-field/).

  </p>
  <p>
    In consuming applications, Developers can use <a class="link" target="_blank" href="https://github.com/jquense/yup?tab=readme-ov-file#yup"><strong>Yup
    4</strong></a> to create a validation schema for Vee-Validate to work with and is installed with
    Forge.UI 3/RailSmart Design System so that it can be used straight out of the box. To do this, Developers will first have to import yup using `import * as yup from 'yup'` and create a shape using
    <code>yup.object().shape({})</code>. Once they have done that, they can then start to add their properties and validation rules. For more information on this, please see the Yup documentation
    site.

    Once the Developer has a Validation Schema. They can then utilise the `useForm` method supplied by Vee-Validate, this will return a method called `handleSubmit`. Here the Developer can define what
    should happen when the validation is successful and unsuccessful. More information can be found <a class="link" target="_blank" href="https://vee-validate.logaretm.com/v4/api/use-form/"><strong>here
    4</strong></a>

    It's worth noting that the example below isn't the actual implementation for ForgeFormField, I have simplified it down to hopefully explain how the validation actually works in Forge.UI
    3/RailSmart Design System and how it can be used in consuming applications.

    <a class="link" target="_blank" href="https://3squared.github.io/ForgeUI-3/#/forms/inputs/formfield"><strong>Forge Form Field
      4</strong></a>
  </p>

</template>

<script setup lang="ts">

</script>