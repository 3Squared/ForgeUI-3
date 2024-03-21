<template>
  <Changelog />
</template>

<script setup lang="ts">
//@ts-expect-error No Types as this is a Markdown File.
import Changelog from "../../../../packages/ui/CHANGELOG.md";
</script>
