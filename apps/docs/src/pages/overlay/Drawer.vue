<template>
  <div>
    <ForgePageHeader title="Drawer" />
    <p>
      Further documentation and examples can be found in the
      <a class="link" target="_blank" href="https://primevue.org/drawer/"><strong>PrimeVue documentation</strong></a>
      .
    </p>
    <Playground :options="options" :code="code" :config="config" @reset="reset">
      <template #component>
        <Drawer v-model:visible="visible" :header="options.header" :position="pos">
          <p :class="contentClass">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </Drawer>
        <div class="d-flex gap-1">
          <Button label="Open Drawer" @click="visible = true" />
        </div>
      </template>
      <template #additionalOptions>
        <div>
          <label>position</label>
          <Select v-model="pos" :options="position" />
        </div>
      </template>
    </Playground>
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader } from "@3squared/forge-ui-3";
import { Playground, usePlayground } from "@3squared/forge-playground-3";
import { computed, ref } from "vue";
import Drawer from "primevue/drawer";
import Button from "primevue/button";
import Select from "primevue/select";

const contentClass = computed(() => {
  if (pos.value == "left" || pos.value == "right") return "mw-300px";
  else return "";
});

const position = ["right", "top", "bottom", "left", "full"];
const pos = ref<"right" | "top" | "bottom" | "left" | "full">("left");

const visible = ref<boolean>(false);

const { options, propVals, config, reset } = usePlayground(
  {
    header: "Drawer Header"
  }, {
    header: { required: true }
  },
  () => {
    pos.value = "left";
  }
);

const code = computed(() => `
<template>
  <Drawer v-model:visible="visible"${propVals.value.length > 0 ? " " + propVals.value.join(" ") : ""} position="${pos.value}">
    <p ${contentClass.value.length > 0 ? "class=\"" + contentClass.value + "\"" : ""}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
  </Drawer>
</template>

<script setup lang="ts">
import Drawer from 'primevue/drawer';
import Button from 'primevue/button';

const visible = ref<boolean>(false);
</\script>
`);
</script>
