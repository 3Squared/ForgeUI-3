<template>
  <div>
    <div v-for="palette in palettes">
      <h1 class="mb-4 pb-1">{{ palette.title }}</h1>
      <div class="d-flex">
        <div v-for="colour in palette.colours">
          <div class="d-flex mb-4 pb-1 me-5 text-center">
            <div class="color-swatch d-flex flex-column h-100 pr-5">
              <p class="text-center mb-1">{{ colour.label }}</p>
              <div :id="`swatch-${colour.background}`" :class="colour.background" style="margin: 0 auto;"></div>
              <Button link @click="(event) => toggle(event, colour.text)">
                Copy
                <Icon icon="bi:chevron-down" />
              </Button>
              <Menu :id="`${colour.text}-menu`" ref="menu" :model="menuItems" :popup="true">
                <template #item="{ label }">
                  <div @click="getColour(colour.background)">{{ label }}</div>
                </template>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import rgbHex from "rgb-hex";
import { Icon } from "@iconify/vue";
import Button from "primevue/button";
import Menu from "primevue/menu";
import { ref } from "vue";
import { useToast } from "primevue/usetoast";

interface Shade {
  background: string;
  text: string;
  label: string;
}

interface Colour {
  title: string;
  colours: Shade[];
}

const menu = ref();
const menuItems = ref([
  {
    items: [{ label: "Hex Code" }, { label: "Background Class" }, { label: "Text Class" }]
  }
]);

const toast = useToast();

const toggle = (event: Event, text: string) => {
  console.log(menu);
  menu.value.find((s: { $id: string }) => s.$id === `${text}-menu`).toggle(event);
};

const palettes = [
  {
    title: "Neutral Shades",
    colours: [
      { background: "bg-grey-900", text: "text-grey-900", label: "Grey 900" },
      { background: "bg-grey-800", text: "text-grey-800", label: "Grey 800" },
      { background: "bg-grey-700", text: "text-grey-700", label: "Grey 700" },
      { background: "bg-grey-600", text: "text-grey-600", label: "Grey 600" },
      { background: "bg-grey-500", text: "text-grey-500", label: "Grey 500" },
      { background: "bg-grey-400", text: "text-grey-400", label: "Grey 400" },
      { background: "bg-grey-300", text: "text-grey-300", label: "Grey 300" },
      { background: "bg-grey-200", text: "text-grey-200", label: "Grey 200" },
      { background: "bg-grey-100", text: "text-grey-100", label: "Grey 100" }
    ]
  },
  {
    title: "System Colours",
    colours: [
      { background: "bg-brand", text: "text-brand", label: "Brand" },
      { background: "bg-primary", text: "text-primary", label: "Primary" },
      { background: "bg-secondary", text: "text-secondary", label: "Secondary" },
      { background: "bg-info", text: "text-info", label: "Info" },
      { background: "bg-success", text: "text-success", label: "Success" },
      { background: "bg-success-alternate", text: "text-success-alternate", label: "Success Alternate" },
      { background: "bg-warning", text: "text-warning", label: "Warning" },
      { background: "bg-danger", text: "text-danger", label: "Danger" },
      { background: "bg-light", text: "text-light", label: "Light" },
      { background: "bg-dark", text: "text-dark", label: "Dark" }
    ]
  }
] as Colour[];

const copyToClipboard = (value: string) => {
  navigator.clipboard.writeText(value);
  toast.add({ severity: "success", summary: "Copied to clipboard", life: 3000 });
};

const getColour = (colour: string) => {
  const swatch = document.getElementById(`swatch-${colour}`) as Element;
  const swatchStyles = getComputedStyle(swatch);
  const hex = `#${rgbHex(swatchStyles.backgroundColor)}`;
  copyToClipboard(hex);
};
</script>

<style lang="scss">
.color-swatch {
  div {
    height: 74px;
    width: 74px;
  }
}
</style>
