<template>

  <ForgeNavbar :model="pages" severity="dark"></ForgeNavbar>

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
      { label: "Action Button" },
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
</script>