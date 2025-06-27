<template>
  <div>
    <ForgeNavbar :model="pages" severity="dark">
      <template #logo>Forge.UI 3</template>
      <template #end>
        <div class="navbar-nav cursor-pointer nav-item me-3">
          <a class="nav-link" @click.capture="router.push('/changelog')">v{{ version }}</a>
          <a class="nav-link" href="https://github.com/3Squared/ForgeUI-3" target="_blank"><Icon icon="mdi:github" width="24" height="24" /></a>
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
import { onMounted, ref } from "vue";
import { Icon } from '@iconify/vue'

const router = useRouter();

const pages = ref([
  {
    label: "Guides",
    items: [
      { label: "Getting Started", command: () => router.push("/guides/installation") },
      { label: "Forge Resolver", command: () => router.push("/guides/ForgeResolver") },
      { label: "Components", command: () => router.push("/guides/NewComponent") },
      { label: "Passthroughs", command: () => router.push("/guides/Passthroughs") },
      { label: "Forge Playground", command: () => router.push("/guides/ForgePlayground") },
      { label: "Changeset", command: () => router.push("/guides/Changeset") },
      { label: "Testing", command: () => router.push("/guides/Testing") },
      { label: "Validation", command: () => router.push("/guides/Validation") },
    ]
  },
  {
    label: "Buttons",
    items: [
      { label: "Action Button", command: () => router.push("/buttons/actionbutton") },
      { label: "Button", command: () => router.push("/buttons/button") },
      { label: "Link", command: () => router.push("/buttons/link") },
      { label: "Select Button", command: () => router.push("/buttons/selectbutton") },
      { label: "Split Button", command: () => router.push("/buttons/splitbutton") },
      { label: "Button Group", command: () => router.push("/buttons/ButtonGroup") },
      { label: "Toggle Button", command: () => router.push("/buttons/ToggleButton") },
    ]
  },
  {
    label: "Data",
    items: [
      { label: "Chart", command: () => router.push("/data/chart") },
      { label: "Progress Bar", command: () => router.push("/data/progress") },
      { label: "Stat Widget", command: () => router.push("/data/statwidget") },
      { label: "Table", command: () => router.push("/data/table") },
      { label: "Data View", command: () => router.push("/data/dataview") },
      { label: "Tile", command: () => router.push("/data/tile") },
      { label: "Tree", command: () => router.push("/data/Tree") },
      { label: "TreeTable", command: () => router.push("/data/TreeTable") }
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
          { label: "Multiselect Preview", command: () => router.push("/forms/dropdowns/multiselectpreview") },
          { label: "Tree Select", command: () => router.push("/forms/dropdowns/TreeSelect") }
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
      { label: "Scratchpad", command: () => router.push("/forms/scratchpad") },
      { label: "Switch", command: () => router.push("/forms/switch") },
      { label: "Pick List", command: () => router.push("/forms/PickList") },
      { label: "Listbox", command: () => router.push("/forms/Listbox") }
    ]
  },
  {
    label: "Layout",
    items: [
      { label: "Accordion", command: () => router.push("/layout/Accordion") },
      { label: "Alert", command: () => router.push("/layout/alert") },
      { label: "Loader", command: () => router.push("/layout/loader") },
      { label: "Page Header", command: () => router.push("/layout/pageheader") },
      { label: "Stepper", command: () => router.push("/layout/stepper") },
      { label: "Tabs", command: () => router.push("/layout/tabs") },
      { label: "Fieldset", command: () => router.push("/layout/fieldset") },
      { label: "Panel", command: () => router.push("/layout/panel") },
      { label: "Navbar", command: () => router.push("/layout/navbar") }
    ]
  },
  {
    label: "Overlay",
    items: [
      { label: "Modal", command: () => router.push("/overlay/modal") },
      { label: "Confirmation Modal", command: () => router.push("/overlay/confirmmodal") },
      { label: "Confirmation Popup", command: () => router.push("/overlay/ConfirmPopup") },
      { label: "Popover", command: () => router.push("/overlay/popover") },
      { label: "Toast", command: () => router.push("/overlay/toast") },
      { label: "Tooltip", command: () => router.push("/overlay/tooltip") },
      { label: "Drawer", command: () => router.push("/overlay/drawer") }
    ]
  },
  {
    label: "Misc",
    items: [
      { label: "Badge", command: () => router.push("/misc/badge") },
      { label: "Tag", command: () => router.push("/misc/tag") }
    ]
  },
  { label: "Icons", command: () => router.push("/icons") },
  { label: "Colours", command: () => router.push("/colours") }
]);

onMounted(() => {
  if(import.meta.env.DEV){
    pages.value.push({ label: "Code Testing", command: () => router.push("/examples/CodeTesting") })
  }
})
</script>
