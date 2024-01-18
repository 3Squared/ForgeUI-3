<template>
  <div>
    <ForgeNavbar :model="pages" severity="dark">
      <template #logo>Forge.UI 3</template>
    </ForgeNavbar>
    <main id="main-content" class="forge-layout">
      <div class="container mt-4">
        <router-view />
      </div>
    </main>
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { RouterView, useRouter } from "vue-router/auto";
import Toast from "primevue/toast";
import { ForgeNavbar } from "@3squared/forge-ui-3";

const router = useRouter();

const pages = [
  {
    label: "Getting Started"
  },
  {
    label: "Forms",
    items: [
      { label: "Checkbox", command: () => router.push("/forms/checkbox") },
      { label: "Date Picker", command: () => router.push("/forms/datepicker") },
      { label: "File Uploader" },
      { label: "Remaining Characters", command: () => router.push("/forms/remainingcharacters") },
      { label: "Form", command: () => router.push("/forms/form") },
      { label: "Form Field", command: () => router.push("/forms/formfield") },
      { label: "Multiselect", command: () => router.push("/forms/multiselect") },
      { label: "Multiselect Preview", command: () => router.push("/forms/multiselectpreview") },
      { label: "Dropdown", command: () => router.push("/forms/dropdown") },
      { label: "Chips", command: () => router.push("/forms/chips") }
    ]
  },
  {
    label: "Input",
    items: [
      { label: "Input Mask", command: () => router.push("/input/mask") },
      { label: "Input Number", command: () => router.push("/input/number") },
      { label: "Input Text", command: () => router.push("/input/text") },
      { label: "Inline Editor", command: () => router.push("/input/inlineeditor") },
      { label: "Text Area", command: () => router.push("/input/textarea") }
    ]
  },
  {
    label: "General",
    items: [
      { label: "Action Button", command: () => router.push("/general/actionbutton") },
      { label: "Alert", command: () => router.push("/general/alert") },
      { label: "Button", command: () => router.push("/general/button") },
      { label: "Chart", command: () => router.push("/general/chart") },
      { label: "Loader", command: () => router.push("/general/loader") },
      { label: "Modal", command: () => router.push("/general/modal") },
      { label: "Overlay Panel", command: () => router.push("/general/overlay") },
      { label: "Progress Bar", command: () => router.push("/general/progress") },
      { label: "Stat Widget", command: () => router.push("/general/statwidget") },
      { label: "Tile", command: () => router.push("/general/tile") },
      { label: "Toast", command: () => router.push("/general/toast") },
      { label: "Tooltip", command: () => router.push("/general/tooltip") }
    ]
  },
  {
    label: "Layout",
    items: [
      { label: "Page Header", command: () => router.push("/layout/pageheader") },
      { label: "Stepper", command: () => router.push("/layout/stepper") },
      { label: "Tabs", command: () => router.push("/layout/tabs") }
    ]
  },
  {
    label: "Tables",
    items: [
        { label: "Filter Header" }, 
      { label: "Table", command: () => router.push('/table/table') }]
  },
  { label: "Icons", command: () => router.push("/icons") },
  { label: "Colours", command: () => router.push("/colours") }
];
</script>
