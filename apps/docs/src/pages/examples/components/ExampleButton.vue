<template>
  <div>
    <div class="h3">Examples</div>
    <div>A button with a badge:</div>
    <Button label="Button" badge="8" badge-severity="primary" class="m-1" />
    <CodeBlock :code="code" />
  </div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import CodeBlock from "@3squared/forge-playground-3/src/components/CodeBlock.vue";
import { computed } from "vue";

const code = computed(() => `<Button label="Button" badge="8" badge-severity="primary" class="m-1"/>`);
</script>
