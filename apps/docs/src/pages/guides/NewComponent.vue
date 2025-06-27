<template>
  <ForgePageHeader title="Using PrimeVue components" class="mx-3" />
  <div class="m-3">
    <p>
      Forge implements the unstyled version on PrimeVue, this means all components we used are striped of their styling. This might mean that when you import a PrimeVue component it won't work or css
      will be off.
      To make this work you have to add a passthrough object.
    </p>
    <p>
      If you are styling a PrimeVue component but not adding anything to it, all you need to do is add a passthrough. You then just use the PrimeVue import statement as normal and the Forge styling
      will
      be applied.
    </p>
    <ForgePageHeader title="New Components" />
    <ol>
      <li>Create the <code>`.vue`</code> file in the <code>`packages > ui > src > components`</code>. The convention for the component .vue file is to prefix it with <code>Forge</code> so that we know
        where the component comes from.
      </li>
      <li>If using PrimeVue, then add a passthrough object.</li>
      <li>To include your component in the build, you'll need to add it to the <code>`index.ts`</code> file which can be found in the <code>`packages > ui > src`</code> folder. Here you'll need to
        import the component at the top of the file and include the import in the export object which appears underneath.
      </li>
      <li> You can test this new component by creating an example in the Code Testing section, accessible in the local environment. It may be helpful to save a the code in the <code>examples >
        component</code> folder, this mean you can test changes in the future or refer back to it. Example data can be found in <code>examples > data</code>.
      </li>
      <li>Create a documentation page in the styleguide using the <code>ForgePlayground</code>. Add any helpful implementation info.</li>
      <li>To future proof it would be best to create cypress component tests. These help to prevent logic being broken when future bugs are fixed and as packaged are updated. Vitest can be used to
        test logic.
      </li>
      <li>Add a changeset to explain the component add bump the version number.</li>
    </ol>
    <ForgePageHeader title="Passthroughs" />

    <ol>
      <li><strong>Adding a passthrough:</strong>
        If using a PrimeVue component, you will need to create a <a href="https://primevue.org/passthrough/" target="_blank">Passthrough</a> file. These should be stored in the <code>`packages > ui >
          src > passthrough`</code> folder.
      </li>
      <li>Export your new Passthrough object in the <code>`Bootstrap_PT.ts`</code> file if you are developing in Forge.</li>
      <li>Visit
        <router-link to="/guides/Passthroughs">Passthroughs</router-link>
        for more info.
      </li>

    </ol>

    <ForgePageHeader title="Styling non PrimeVue components or adding extra styling" />
    <p>
      Components should be built mainly using Bootstrap classes where possible, (this prevents us ending up with lots of repeated css classes). Visit the
      <a href="https://getbootstrap.com/" target="_blank">Bootstrap documentation site</a> for all the classes available.
      If you require some custom styling, you can create a new <code>`.scss`</code> file in the <code>`packages > ui > src >
      styles > components`</code> folder. Follow the convention of using the component name to match the , i.e. <code>_{componentName}.scss</code>.
      Once you've done this, you'll then need to import your new <code>`.scss`</code> file into the <code>`forge-components.scss`</code> file if you are developing in Forge.
    </p>

    <ForgePageHeader title="Binding props and $attrs" />
    <p>

      On the majority of components, you'll find the code <code>v-bind="{...$attrs, ...props}"</code>. This code is there to pass all props and attributes in one go so that you don't have to pass each
      prop individually.

      The `props` object is defined in the component itself, along with a custom type if there are more props required for custom functionality. The <code>$attrs</code> object is on that is define by
      Vue, it captures any emits or props that aren't explicitly defined on the component. You can find out more about <a href="https://vuejs.org/guide/components/props">props()</a> and <a
      href="https://vuejs.org/guide/components/attrs">$attrs</a> in the Vue documentation.
    </p>
    <Image :src="VBindImg" alt="v-bind" class="mb-4" height="300" />


  </div>
</template>

<script setup lang="ts">
import VBindImg from "../../assets/v-bind.png";
import Image from "primevue/image";


</script>