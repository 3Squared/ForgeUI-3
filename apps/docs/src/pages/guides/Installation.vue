<template>
  <div>
    <ForgePageHeader title="Getting Started with Forge.UI 3" />

    This getting started guide will give a comprehensive guide of how to install ForgeUI into your app, please consult the component pages for detailed examples
    of how to use each component.

    <div class="my-5">
      <h4 class="mb-3">Step 1 - Installing Forge.UI 3</h4>

      As Forge.UI 3 is open source, the package is distributed via npm. In order to install Forge.UI 3 from npm, you will need to run the following command.

      <CodeBlock code="npm i @3squared/forge-ui-3" class="mt-3" />
    </div>

    <div class="my-5">
      <h4 class="mb-3">Step 2 - The PrimeVue Plugin</h4>

      Now that you have the package installed, the next step is to install the PrimeVue plugin using the custom Bootstrap 5
      <a class="link" target="_blank" href="https://primevue.org/passthrough/"><strong>passthrough object</strong></a>
      which is supplied by Forge.UI 3.

      <CodeBlock :code="step2Code" class="mt-3" />
    </div>

    <div class="my-5">
      <h4 class="mb-3">Step 3 - Importing the CSS</h4>

      Finally, we need to import the custom css. For those not using a pre-processor, you will simply need to import the css in your main.ts file like so.

      <CodeBlock :code="step3CodeBasicImport" class="mt-3" />

      If you are using a pre-processor, you have the option to import the css in your main sass file. By doing this, it also allows you to customise the theme
      colours to your liking!

      <CodeBlock :code="step3CodeSassImport" class="mt-3" />
    </div>
    <div class="my-5">
      <h4 class="mb-3">Step 4 - Run your project</h4>

      If you have followed the steps correctly, you should now be able to use the Forge.UI 3 and PrimeVue components in your codebase. Guides on how to use
      these components are documented across this site along with relevant links.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader } from "@3squared/forge-ui-3";
import { CodeBlock } from "@3squared/forge-playground-3";

const step2Code = `
/// main.ts

...
import PrimeVue from 'primevue/config'
import { Bootstrap_PT } from '@3squared/forge-ui-3'

createApp(App)
  .use(PrimeVue, { unstyled: true, pt: Bootstrap_PT })
  .mount('#app')
`;

const step3CodeBasicImport = `
  /// main.ts
  
  ...
  import '@3squared/forge-ui-3/dist/esm/style.css'
  import PrimeVue from 'primevue/config'
  import { Bootstrap_PT } from '@3squared/forge-ui-3'

  createApp(App)
    .use(PrimeVue, { unstyled: true, pt: Bootstrap_PT })
    .mount('#app')
`;

const step3CodeSassImport = `
  /// _main.scss
  
  $primary: #FF0000
  @import "@3squared/forge-ui-3/src/styles/main";
`;
</script>
