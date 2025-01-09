<template>
  <div>
    <ForgePageHeader title="Navbar" />
    <p>
      Further documentation and examples can be found in the
      <a class="link" target="_blank" href="https://primevue.org/menubar/"><strong>PrimeVue documentation</strong></a>
      .
    </p>
    <p>Position can be be changed by adding the `position` attribute. Options are: "fixed-top" | "fixed-bottom" | "sticky-top"</p>
    <Playground :options="options" :code="code" :config="config" @reset="reset">
      <template #component>
        <component :is="ForgeNavbar" v-bind="options" :model="pages">
          <template #logo>Forge.UI 3</template>
          <template #end>
            <Icon icon="material-symbols:person" width="24" height="24" class="me-4" style="color: #fff" />
          </template>
        </component>
      </template>
    </Playground>

    <ExampleNavBar />
  </div>
</template>

<script setup lang="ts">
import { ForgeNavbar, ForgePageHeader } from "@3squared/forge-ui-3";
import { Playground, usePlayground } from "@3squared/forge-playground-3";
import { computed } from "vue";
import { severities } from "../../composables/playgroundOptions";
import { Icon } from "@iconify/vue";
import ExampleNavBar from "../examples/components/ExampleNavBar.vue";

const { options, propVals, config, reset } = usePlayground(
  {
    severity: severities[0]
  },
  {
    severity: { type: "select", options: severities }
  }
);

const code = computed(() => `<ForgeNavbar${propVals.value.length > 0 ? " " + propVals.value.join(" ") : ""} />`);

const pages = [
  {
    label: "Guides",
    items: [{ label: "Getting Started" }, { label: "Migrating from Forge.UI (Coming Soon...)" }]
  },
  {
    label: "Buttons",
    disabled: true,
    items: [{ label: "Action Button" }, { label: "Button" }, { label: "Link" }, { label: "Select Button" }]
  },
  {
    label: "Data",
    items: [{ label: "Chart" }, { label: "Progress Bar" }, { label: "Stat Widget" }, { label: "Table" }, { label: "Tile" }]
  }
];
</script>
