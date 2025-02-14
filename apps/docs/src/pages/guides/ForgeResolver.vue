<template>
  <div>
    <ForgePageHeader title="Forge Resolver" />
    <div class="my-3">The ForgeResolver enables automatic imports of Forge UI components in a Vue + Vite project, eliminating the need for manual import statements.
      This allows you to use
      <code>{{ tableCode }}</code>
      or
      <code>{{ tileCode }}</code>
      directly in templates without explicitly importing them.
    </div>

    <div class="my-3">
      <h4 class="mb-3">Using the ForgeResolver</h4>
      To set up the forge resolver add it to the <code>vite.config.ts</code>
      <CodeBlock :code="setupForgeResolver" class="mt-3" />

      This will create a <code>component.d.ts</code> file, this needs to be added to the <code>tsconfig.json</code> to add typescript support under <code>"include"</code> section.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader } from "@3squared/forge-ui-3";
import { CodeBlock } from "@3squared/forge-playground-3";

const tableCode = `<ForgeTable>`;
const tileCode = `<ForgeTile>`;
const setupForgeResolver = `
import Components from 'unplugin-vue-components/vite'
import { ForgeResolver } from "@3squared/forge-ui-3";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Components({
      resolvers: [ForgeResolver()]
    })
  ],
});
`;
</script>
