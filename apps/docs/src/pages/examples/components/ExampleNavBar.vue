<template>
  <div>
    <div class="h3">Examples</div>
    <Panel header="Disabling menu options" toggleable>
      <p>To do this just pass through the `disabled: true` as a property with the menu items</p>
      <ForgeNavbar :model="pages" severity="dark" />

      <CodeBlock :code="code" />
    </Panel>    
  </div>
</template>

<script setup lang="ts">
import { ForgeNavbar } from "@3squared/forge-ui-3";
import CodeBlock from "@3squared/forge-playground-3/src/components/CodeBlock.vue";
import { computed } from "vue";
import Panel from "primevue/panel";

const pages = [
  {
    label: "Guides",
    items: [{ label: "Getting Started" }, { label: "Migrating from Forge.UI (Coming Soon...)" }],
  },
  {
    label: "Buttons",
    items: [{ label: "Action Button", disabled: true }, { label: "Button" }, { label: "Link" }, { label: "Select Button" }]
  },
  {
    label: "Data",
    items: [{ label: "Chart" }, { label: "Progress Bar" }, { label: "Stat Widget" }, { label: "Table" }, { label: "Tile" }]
  }
];

const code = computed(
    () => `
<template>
 <ForgeNavbar :model="pages" severity="dark" />
</template>

<script setup lang="ts">
import { ForgeNavbar } from "@3squared/forge-ui-3";

const pages = [
  {
    label: "Guides",
    items: [
      { label: "Getting Started" },
      { label: "Migrating from Forge.UI (Coming Soon...)" },
    ],
  },
  {
    label: "Buttons",
    items: [
      { label: "Action Button", disabled: true },
      { label: "Button" },
      { label: "Link" },
      { label: "Select Button" },
    ],
  },
  {
    label: "Data",
    items: [
      { label: "Chart" },
      { label: "Progress Bar" },
      { label: "Stat Widget" },
      { label: "Table" },
      { label: "Tile" },
    ],
  },
];
</\script>
`
);
</script>
