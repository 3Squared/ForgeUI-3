<template>
  <ForgeNavbar :model="pages" severity="dark">
    <template #logo>
      Forge.UI 3
    </template>
  </ForgeNavbar>
  <main id="main-content" class="forge-layout">
    <div class="container mt-4">
      <router-view />
    </div>
  </main>
</template>

<script setup lang="ts">
import { RouterView, useRouter } from "vue-router/auto";
import { ForgeNavbar } from "@3squared/forge-ui-3"

const router = useRouter()

const pages = [
  {
    label: "Getting Started"
  },
  { 
    label: "Forms", 
    items: [
      { label: "Checkbox", command: () => router.push('/forms/checkbox') },
      { label: "Date Picker", command: () => router.push('/forms/datepicker') },
      { label: "File Uploader" },
      { label: "Remaining Characters", command: () => router.push('/forms/remainingcharacters') },
      { label: "Form", command: () => router.push('/forms/form') },
      { label: "Form Field", command: () => router.push('/forms/formfield') },
      { label: "Multiselect", command: () => router.push('/forms/multiselect') },
      { label: "Multiselect Preview", command: () => router.push('/forms/multiselectpreview') },
      { label: "Select" },
      { label: "Tags" },
    ]
  },
  {
    label: "Input",
    items: [
      { label: "Input Mask", command: () => router.push('/input/mask') },
      { label: "Input Number", command: () => router.push('/input/number') },
      { label: "Input Text", command: () => router.push('/input/text') },
      { label: "Inline Editor", command: () => router.push('/input/inlineeditor') },
      { label: "Text Area", command: () => router.push('/input/textarea') }
    ]
  },
  {
    label: "General",
    items: [
      { label: "Action Button" },
      { label: "Alert" },
      { label: "Button" },
      { label: "Chart" },
      { label: "Loader" },
      { label: "Modal" },
      { label: "Popover" },
      { label: "Progress" },
      { label: "Stat Widget" },
      { label: "Toast" },
      { label: "Tooltip" }
    ]
  },
  {
    label: "Layout",
    items: [
      { label: "Collapse" },
      { label: "Page Header" },
      { label: "Stepper" },
      { label: "Tabs" }
    ]
  },
  {
    label: "Tables",
    items: [
      { label: "Filter Header" },
      { label: "Table" }
    ]
  },
  { label: "Icons" },
  { label: "Colours" }
]
</script>