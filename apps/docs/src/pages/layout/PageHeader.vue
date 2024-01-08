<template>
  <ForgePageHeader title="Page Header" />
  <Playground :options="options" :code="code" :config="config" @reset="reset">
    <template #component>
      <component :is="ForgePageHeader" v-bind="options" />
    </template>
  </Playground>
</template>

<script setup lang="ts">
import { ForgePageHeader } from "@3squared/forge-ui-3";
import { Playground, usePlayground } from "@3squared/forge-playground-3";
import { computed } from "vue";

const { options, propVals, config, reset } = usePlayground({
  title: ''
})

const code = computed(() => `<ForgePageHeader${propVals.value.length > 0 ? " " + propVals.value.join(" ") : ""} />`)
</script>