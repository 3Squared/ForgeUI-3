<template>
  <div class="h3">Examples</div>
  <Card>
    <template #content>
  <ForgeNavbar :model="pages" severity="dark" />
    </template></Card>
  <CodeBlock :code="code" />
</template>

<script setup lang="ts">
import { ForgeNavbar } from "@3squared/forge-ui-3";
import CodeBlock from "@3squared/forge-playground-3/src/components/CodeBlock.vue";
import { computed } from "vue";
import Card from "primevue/card";

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


const code = computed(() => `
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
`);

</script>