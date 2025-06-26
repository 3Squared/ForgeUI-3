<template>
  <ForgePageHeader title="Passthroughs" class="mx-3"/>
  <div class="m-3">
  <p>
    <a href="https://primevue.org/passthrough/">Passthrough objects</a> are used to style PrimeVue components. Each passthrough object has a list of properties which relate to different parts of a
    component.
    A useful diagram can be found for each component under the <a href="https://primevue.org/button/">passthrough</a> tab which appears on each page of their Documentation Site.
    Another way of finding the name of these properties is to look for the `data-pc-section` attribute which is found on each component, through using the dev inspector. Sometime the PrimeVue docs are
    incorrect.
  </p>
  <p> 
    All passthrough files can be found in <code>packages > ui > src > passthroughs</code> and each file is exported via the global passthrough object found in <code>packages > ui > src >
    Bootstrap_PT.ts</code>.
  </p>
  <p> 
    Some passthroughs are customised within the <code>.vue</code> Forge component file. This might be if we had to add severity option where PrimeVue has not implemented them, or we may have wanted
    to customise further.
  </p>
  <p>
    Each one of these properties which appear in the Passthrough object, accept all of the html attributes that you would add to a HTML tag. Typically, you'll end up using
    <code>class</code> and on rare occasion <code>style</code>.
  </p>
  <p>
    These properties can accept static strings or conditional properties, these conditional properties allow you to add state to components. Using the `options` described in the `PT Option` section,
    you can gain access to the:
  </p>
  <ol>
    <li>Instance</li>
    <li>Props</li>
    <li>Context</li>
    <li>Parent</li>
    <li>Global</li>
  </ol>
  <p>
    Typically, <code>props</code> and <code>context</code> are the most useful options to use when adding a condition for styling using conditional properties.
    Below is a template that you can use to get started with adding a passthrough option:
  </p>

  <CodeBlock :code="example" class="mt-3" language="js" />
  <div class="h4">Components within components:</div>
  <p>
    PrimeVue often build components with their own components. Within the passthrough these are denoted with <code>pc</code>. You can then target these within the component.
    Look into the passthrough of that component to find the related properties. Below is simple example adding styling to the Button within the panel.
  </p>

  <CodeBlock :code="pcExample" class="mt-3" />

  </div>
</template>

<script setup lang="ts">
import { VueMarkdown } from "@crazydos/vue-markdown";
import Image from "primevue/image";
import { CodeBlock } from "@3squared/forge-playground-3";

const example = `
import { SomeComponentPassThroughMethodOptions } from 'primevue/somecomponent'

export default {
  someComponent: {
    someOption: ({ instance, props, context, parent, global } : SomeComponentPassThroughMethodOptions) => ({
      class: [
        // Static class.
        'some-static-class-that-should-always-be-added',
        // Conditional classes, they're only added if the condition is true.
        {
          'some-conditional-class': props.someProp === true
        }
      ]
    })
  }
}
`;

const pcExample = `
import { PanelPassThroughOptions } from "primevue/panel";

export default {
  panel: {
    root: "card w-100",
    header: "h4 d-flex justify-content-between align-items-center fw-600 ms-4 me-3 my-2",
    pcToggleButton: {
      root: {
        class: [
          "btn",
        ]
      }
    },
    contentContainer: "mt-2 mx-4 mb-4",
  } as PanelPassThroughOptions
}
`;
</script>