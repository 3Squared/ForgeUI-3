<template>
  Test
  <ForgeNavbar :model="pages" severity="dark"></ForgeNavbar>
  <ForgeNavbar :model="pages" severity="light"></ForgeNavbar>
  <ForgeNavbar :model="pages" severity="primary" ></ForgeNavbar>
  <ForgeNavbar :model="pages" severity="brand" ></ForgeNavbar>
  <ForgeNavbar :model="pages" severity="secondary" position="fixed-bottom"></ForgeNavbar>
  <Menu :model="pages"></Menu>
</template>
<script setup lang="ts">
import { ForgeNavbar } from "@3squared/forge-ui-3";
import Menu from "primevue/menu";

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
<style scoped></style>
