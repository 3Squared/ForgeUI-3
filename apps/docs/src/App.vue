<template>
  <ForgeNavbar :model="pages" severity="dark">
    <template #logo>
      Forge.UI 3
    </template>
  </ForgeNavbar>
  <main id="main-content" class="forge-layout">
    <div class="container mt-5">
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
      { label: "Checkbox", command: () => router.push('/Checkbox') },
      { label: "Date Picker", command: () => router.push('/Datepicker') },
      { label: "File Uploader" },
      { label: "Remaining Characters", command: () => router.push('/RemainingCharacters') },
      { label: "Form" },
      { label: "Form Field" },
      { label: "Inline Editor" },
      { label: "Input" },
      { label: "Multiselect" },
      { label: "Multiselect Preview" },
      { label: "Select" },
      { label: "Tags" },
      { label: "Textarea" }
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