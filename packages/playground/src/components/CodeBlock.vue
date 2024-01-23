<template>
  <div class="position-relative mt-2">
    <Button class="copy-code position-absolute text-white" link @click="copyToClipboard">
      Copy
      <Icon icon="bi:files" />
    </Button>
    <pre class="position-relative p-3 pt-4 rounded-lg code-block"><code class="text-white" v-html='formattedCode' /></pre>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Prism from "prismjs";
import Button from "primevue/button";
import { Icon } from "@iconify/vue";

export interface CodeBlockProps {
  code: string;
}

const props = defineProps<CodeBlockProps>();

const formattedCode = computed(() => Prism.highlight(props.code, Prism.languages.markup, "vue"));

function copyToClipboard() {
  navigator.clipboard.writeText(props.code!);
}
</script>
