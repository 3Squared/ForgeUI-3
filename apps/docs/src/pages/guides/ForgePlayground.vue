<template>
  <ForgePageHeader title="Forge.Playground" class="mx-3" />
  <div class="m-3">
    <p>
      Forge Playground is a package which the Documentation sites use to allow users to see how props affect components in real time whilst generating code snippets that they can use in their Vue
      code.
      The package is made up of one file called <code>Playground.vue</code>.
    </p>
    <Image :src="ForgePlaygroundImg" alt="Forge Playground" class="mb-3" height="400"></Image>

    <VueMarkdown markdown="
The playground accepts the following props:

- code
    - This is a string which is passed in by the developer.
    - This appears in the Code block at the bottom.

- options
    - This is an object which contains all of the props that the component takes. These should be set to whatever the component has as default, replicating what comes out of the box. This should be retreived using the `usePlayground` composable.

- rerender
    - This is a boolean which is used to toggle the `reset` button. This should be retreived using the `usePlayground` composable.

- config   
    - This is a list of configuration options which can be used to configure the options in the Options tab. This should be retreived using the `usePlayground` composable.

- displayValue   
    - This shows the value slot if set to true 

### Slots
The playground component is made up of a handful of slots that the developer can use. These are:

- Component
    - Used to pass in the component which should be displayed in the Preview Card. This will typically be whatever component you are documenting.

- Re-render
    - Replaces the re-render button which appears in the top right of the Options Card.

- Option
    - Each option that is rendered by the Playground can be completely customised using a named slot. By doing this it will replace the option in the Options Card with whatever is in the slot.

- Value
    - This is useful for component like the Form components where it is useful to display the value that is the developer want to pull out of the component. It requires the `displayValue` props to be set to true. It displays at the bottom of the Preview Card.

- Additional Options
    - Allows the developer to add any extra options which aren't a prop for the component into the Options Card. This has been useful when showing off different states or how a component reacts to an event.

### usePlayground
Forge Playground provides a composable function called `usePlayground`. 
This allows the developer to pass any props which the component that they are documenting requires, any option config and an additional reset function which allows developers to determine how options in the `additionalOptions` slot should be reset. 
The function then returns four values which include:

- Options
    - The props values defined in the `usePlayground` composable as a variable.

- PropVals
    - The prop values defined in the `usePlayground` composable as a computed object.

- Config
    - The configuration values defined in the `usePlayground` composable as a variable.

- Reset
    - A reset function.

This composable has been designed to improve the usability of the playground, giving the exact values which the Playground requires as props. This means that these values can be directly passed into the `<ForgePlayground />` component.
" />
    <CodeBlock :code="codeExample" />
    <VueMarkdown markdown="
  ## Component Structure

  The playground is made up of three main parts, the options card, the preview card and the code block.

  ### Options Card

  The Options card is the card which appears on the right of the preview card. It houses a range of inputs which affect the props of the component which is in the preview card.

  In order to determine what input to use for each prop, it loops over the `options` prop and looks at the type of the value provided. Using this type, it then uses a simple `if else` to find the right input for the option.

  If the option type is set in the config prop (currently it can only be set to `select`), it will disregard the type of the prop and render a dropdown instead.

  As mentioned in the slots section, this card also contains a slot for any additional options which might be useful for the documentation site.
" />
    <Image :src="OptionsCardImg" alt="Options Card" class="mb-4" height="600" />

    <VueMarkdown markdown="
  ### Preview Card

  The Preview card is where the component will render.
  - The slot called `component` is used to display the component that they are documenting.
  - The `result` slot will display the preview of the output result of the component, this is useful for form components.
" />
    <Image :src="PreviewCardImg" alt="Preview Card" class="mb-4" height="200" />
    <VueMarkdown markdown="
  ### Code Block

  The Code Block appears underneath the Preview and Options Cards. It is a div which uses a `code` html tag to display a string which is passed into it. It uses [prismjs](https://prismjs.com/) to highlight the code in the same way that vue does.

  It also contains a `copy` button in the top right corner of the component. It allows the user to copy the generated code to their clipboard so that they can use it in their project.
" />
    <Image :src="CodeBlockImg" alt="Preview Card" class="mb-4" height="600" />
  </div>
</template>

<script setup lang="ts">
import { VueMarkdown } from "@crazydos/vue-markdown";
import CodeBlock from "@3squared/forge-playground-3/src/components/CodeBlock.vue";
import ForgePlaygroundImg from "/src/assets/Playground.png";
import OptionsCardImg from "/src/assets/Options_Card.png";
import PreviewCardImg from "/src/assets/Preview_Card.png";
import CodeBlockImg from "/src/assets/Code_Block.png";
import Image from "primevue/image";

const codeExample = `
const { options, propVals, config, reset } = usePlayground(
  {
    aProp: "Hello",
    anotherProp: someList[0],
    // Some other props
  },
  {
    aProp: { required: () => someCondition, disabled: () => someOtherCondition},
    anotherProp: { type: "select", options: someList }
    // Some Config
  },
  () => {
    someCustomValue = null
    // Custom Reset function.
  }
);
`;
</script>