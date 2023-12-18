<template>
  <ForgePageHeader title="Remaining Characters" />
  <Playground :options="options" :code="code" :config="config" @reset="reset">
    <template #component>
      <div class="d-flex flex-column w-75">
        <div class="d-flex justify-content-between">
          <label>{{ textboxLabel }}</label>
          <ForgeRemainingCharacters v-bind="options" />
        </div>
        <TextArea v-model="text"  />
      </div>
    </template>
  </Playground>
</template>

<script setup lang="ts">
import { ForgeRemainingCharacters, ForgePageHeader } from '@3squared/forge-ui-3'
import { Playground, usePlayground } from "@3squared/forge-playground-3";
import TextArea from 'primevue/textarea'
import { computed, ref, watch } from "vue";

const textboxLabel = ref("Textbox Label");
const text = ref<string>("Hello")

const { options, propVals, config, reset } = usePlayground({
      maxCount: 300,
      currentCount: text.value.length
    },
    {
      currentCount: { required: true },
      maxCount: { required: true }
    },
    () => {
      text.value = "Hello";
    })

watch(
    () => text.value,
    (text) => (options.value.currentCount = text.length)
);

const code = computed(() => {
  return `<div class="d-flex flex-column w-100">
  <div class="d-flex justify-content-between">
    <label>${textboxLabel.value}</label>
    <forge-remaining-characters ${propVals.value.join(" ")} />
  </div>
  <b-form-textarea v-model="textVariable" rows="4" />
</div>`;
});
</script>