<template>
  <div>
    <ForgePageHeader title="Scratchpad" />
    <span>
      Scratchpad implements a third party package called Vue-drawing-canvas
      <ForgeLink url="https://github.com/razztyfication/vue-drawing-canvas">(visit the documentation for more info)</ForgeLink>
    </span>
    <Playground :options="options" :code="code" :config="config" display-value @reset="reset">
      <template #component>
        <component :is="ForgeScratchpad" v-bind="options" v-model:image="image" @save="onSave" />
      </template>
      <template #value>
        <div class="w-100">
          <Image :src="image" class="border" height="100" width="200" alt="scratchpad" preview />
          <CodeBlock :code="image ?? ''"></CodeBlock>
        </div>
      </template>
    </Playground>
  </div>
</template>

<script setup lang="ts">
import { ForgeLink, ForgePageHeader, ForgeScratchpad } from "@3squared/forge-ui-3";
import { Playground, usePlayground } from "@3squared/forge-playground-3";
import { computed, ref } from "vue";
import { useToast } from "primevue/usetoast";
import CodeBlock from "@3squared/forge-playground-3/src/components/CodeBlock.vue";
import Image from "primevue/image";

const toast = useToast();
const { options, propVals, config, reset } = usePlayground(
  {
    showClear: true,
    showRedo: true,
    showUndo: true,
    showSave: true,
    height: 300,
    width: 600
  },
  {}
);

const image = ref();

const onSave = (isEmpty: boolean) => {
  if (isEmpty) {
    toast.add({ severity: "error", summary: "Scratchpad is empty", closable: true, life: undefined });
  } else {
    toast.add({ severity: "success", summary: "Saving your image..", closable: true, life: undefined });
  }
};

const code = computed(() => {
  return `<template>
  <ForgeScratchpad v-model:image="image" @save="onSave" ${propVals.value.length > 0 ? " " + propVals.value.join(" ") : ""}/>  
</template>

<script setup lang="ts">
import { ForgeScratchpad } from "@3squared/forge-ui-3";
import { ref } from "vue";
import { useToast } from "primevue/usetoast";

const image =  ref();
const toast = useToast();

const onSave = (isEmpty: boolean) => {  
  if(isEmpty){
    toast.add({ severity: "error", summary: "Scratchpad is empty", closable: true, life: undefined })
  }
  else {
    toast.add({ severity: "success", summary: "Saving your image..", closable: true, life: undefined })
    
  }
}
</\script>`;
});
</script>
