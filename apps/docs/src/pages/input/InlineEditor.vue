<template>
  <ForgePageHeader title="Inline Editor" />
  <Playground :options="options" :code="code" :config="config" @reset="reset">
    <template #component>
      <component :is="ForgeInlineEditor" v-bind="options" v-model="value" />
    </template>
    <template #completeAction>
      <div class="d-flex flex-column mt-2">
        Complete Action
        <Button label="Click me!" @click="completeAction" class="w-25 mt-2"/>
      </div>
    </template>
  </Playground>
</template>

<script setup lang="ts">
import { ForgeInlineEditor, ForgePageHeader } from "@3squared/forge-ui-3";
import { Playground, usePlayground } from "@3squared/forge-playground-3";
import { computed, ref } from "vue";
import Button from 'primevue/button'

const value = ref<string>()
const completeAction = () => {
  window.alert("Completed!")
}

const { options, propVals, config, reset } = usePlayground({
  name: '',
  readonly: false,
  completeAction: null
}, 
    {})

const code = computed(() => `<ForgeInlineEditor${propVals.value.length > 0 ? " " + propVals.value.join(" ") : ""} />`)
</script>