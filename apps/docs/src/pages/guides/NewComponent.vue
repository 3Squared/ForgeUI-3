<template>
  <ForgePageHeader title="Adding a New Component" />
  <ol>
    <li>Create the <code>`.vue`</code> file in the <code>`packages > ui > src > components`</code></li>
    <li>If using a PrimeVue component, you will need to create a <a href="https://primevue.org/passthrough/" target="_blank">Passthrough</a> file. These should be stored in the <code>`packages > ui > src > passthrough`</code> folder.</li>
    <li>Export your new Passthrough object in the <code>`Bootstrap_PT.ts`</code> file if you are developing in Forge.</li>
    <li>To include your component in the build, you'll need to add it to the <code>`index.ts`</code> file which can be found in the <code>`packages > ui > src`</code> folder. Here you'll need to import the component at the top of the file and include the import in the export object which appears underneath.</li>
    <li>You can test this new component by creating an example in the CodeTesting sections, accessible in the local environment</li>
    <li>To future proof it would be best to create cypress component tests. These help to prevent logic being broken when future bugs are fixed and as packaged are updated.</li>
  </ol>
    <ForgePageHeader title="Using PrimeVue components" />
  <p>
    Forge implements the unstyled version on PrimeVue, this means all components we used are striped of their styling. This mean you have to add a passthrough object to forge to use these in any apps. 
  </p>
 <p>
   Components should be built mainly using Bootstrap classes where possible. If you require some custom styling, you can create a new <code>`.scss`</code> file in the <code>`packages > ui > src > styles > components`</code> folder. 
   Once you've done this, you'll then need to import your new <code>`.scss`</code> file into the <code>`forge-components.scss`</code> file if you are developing in Forge or the <code>`_railsmart.scss`</code> file if you are developing in RailSmart Design System.
 </p>
</template>

<script setup lang="ts">

</script>