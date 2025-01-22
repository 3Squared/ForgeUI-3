<template>
  <div>
    <Drawer v-model:visible="visible" header="Drawer">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </Drawer>
    <Button @click="visible = true">Open the drawer</Button>
  </div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import Drawer from "primevue/drawer";
import { ref } from "vue";

const visible = ref(false);
</script>
