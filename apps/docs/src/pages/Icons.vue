<template>
  <div>
    <ForgePageHeader title="Icons" />
    Icons are managed and supplied by
    <a class="link" target="_blank" href="https://icon-sets.iconify.design/"><strong>Iconify</strong></a>
    . Iconify acts like a CDN to supply icons from a variety of sources, meaning that you aren't locked into using one icon vendor!

    <iframe src="https://icon-sets.iconify.design/" class="iframe" />
    <br />
    <br />
    In order to use Iconify, you should:
    <CodeBlock :code="code" />
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader } from "@3squared/forge-ui-3";
import { CodeBlock } from "@3squared/forge-playground-3";

const code = `
  <template>
    <Icon icon="bi:3-circle-fill" />
  </template>
  
  <script setup lang="ts">
    import { Icon } from '@iconify/vue'
  <\/script>
`;
</script>
