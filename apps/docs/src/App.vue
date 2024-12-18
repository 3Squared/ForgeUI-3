<template>
  <div>
    <ForgeNavbar :model="pages" severity="dark">
      <template #logo>Forge.UI 3</template>
      <template #end>
        <div class="navbar-nav cursor-pointer nav-item me-3">
          <a class="nav-link" @click.capture="router.push('/changelog')">v{{ version }}</a>
        </div>
      </template>
    </ForgeNavbar>
    <main id="main-content" class="forge-layout">
      <div class="container-fluid mt-4">
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
import { version } from "../../../packages/ui/package.json";

const router = useRouter();

const pages = [
  {
    label: "Guides",
    items: [{ label: "Getting Started", command: () => router.push("/guides/installation") }, { label: "Migrating from Forge.UI (Coming Soon...)" }]
  },
  {
    label: "Buttons",
    items: [
      { label: "Action Button", command: () => router.push("/buttons/actionbutton") },
      { label: "Button", command: () => router.push("/buttons/button") },
      { label: "Link", command: () => router.push("/buttons/link") },
      { label: "Select Button", command: () => router.push("/buttons/selectbutton") }
    ]
  },
  {
    label: "Data",
    items: [
      { label: "Chart", command: () => router.push("/data/chart") },
      { label: "Progress Bar", command: () => router.push("/data/progress") },
      { label: "Stat Widget", command: () => router.push("/data/statwidget") },
      { label: "Table", command: () => router.push("/data/table") },
      { label: "Tile", command: () => router.push("/data/tile") }
    ]
  },
  {
    label: "Forms",
    items: [
      { label: "Checkbox", command: () => router.push("/forms/checkbox") },
      { label: "Date Picker", command: () => router.push("/forms/datepicker") },
      {
        label: "Dropdowns",
        items: [
          { label: "Dropdown", command: () => router.push("/forms/dropdowns/dropdown") },
          { label: "Multiselect", command: () => router.push("/forms/dropdowns/multiselect") },
          { label: "Multiselect Preview", command: () => router.push("/forms/dropdowns/multiselectpreview") }
        ]
      },
      { label: "File Uploader", command: () => router.push("/forms/fileuploader") },
      { label: "Form", command: () => router.push("/forms/form") },
      {
        label: "Inputs",
        items: [
          { label: "Autocomplete", command: () => router.push("/forms/inputs/autocomplete") },
          { label: "Chips", command: () => router.push("/forms/inputs/chips") },
          { label: "Form Field", command: () => router.push("/forms/inputs/formfield") },
          { label: "Inline Editor", command: () => router.push("/forms/inputs/inlineeditor") },
          { label: "Input Text", command: () => router.push("/forms/inputs/text") },
          { label: "Input Mask", command: () => router.push("/forms/inputs/mask") },
          { label: "Input Number", command: () => router.push("/forms/inputs/number") },
          { label: "Text Area", command: () => router.push("/forms/inputs/textarea") }
        ]
      },
      { label: "Remaining Characters", command: () => router.push("/forms/remainingcharacters") },
      { label: "Switch", command: () => router.push("/forms/switch") }
    ]
  },
  {
    label: "Layout",
    items: [
      { label: "Alert", command: () => router.push("/layout/alert") },
      { label: "Loader", command: () => router.push("/layout/loader") },
      { label: "Page Header", command: () => router.push("/layout/pageheader") },
      { label: "Stepper", command: () => router.push("/layout/stepper") },
      { label: "Tabs", command: () => router.push("/layout/tabs") },
      { label: "Fieldset", command: () => router.push("/layout/fieldset") }
    ]
  },
  {
    label: "Overlay",
    items: [
      { label: "Modal", command: () => router.push("/overlay/modal") },
      { label: "Popover", command: () => router.push("/overlay/popover") },
      { label: "Toast", command: () => router.push("/overlay/toast") },
      { label: "Tooltip", command: () => router.push("/overlay/tooltip") }
    ]
  },
  {
    label: "Misc",
    items: [{ label: "Badge", command: () => router.push("/misc/badge") }]
  },
  { label: "Icons", command: () => router.push("/icons") },
  { label: "Colours", command: () => router.push("/colours") }
];
</script>
