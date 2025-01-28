<template>
  <div class="d-flex flex-column">
    <vue-drawing-canvas
        ref="drawingCanvas"
        v-model:image="image"
        data-cy="drawing-canvas"
        class="border canvas"
        v-bind="{...$attrs}"
        :height="height"
        :width="width"
        :style="`height: ${height}px; width: ${width}px`"
        line-join="round"
    />
    <div class="d-flex flex-row mt-1 gap-1">
      <Button v-if="props.showUndo" @click="undo" outlined data-cy="undo-button">Undo</Button>
      <Button v-if="props.showRedo" @click="redo" outlined data-cy="redo-button">Redo</Button>
      <Button v-if="props.showClear" @click="clear" outlined data-cy="clear-button">Clear</Button>
      <Button v-if="props.showSave" @click="save" class="ms-auto" data-cy="save-button">Save</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import VueDrawingCanvas from "vue-drawing-canvas";
import { ref, useTemplateRef } from 'vue'

export interface ScratchpadProps {
  showClear?: boolean,
  showUndo?: boolean,
  showRedo?: boolean,
  showSave?: boolean,
  height?: number,
  width?: number,
  lineJoin?: string
}

const props = withDefaults(defineProps<ScratchpadProps>(), {
  showClear: true,
  showUndo: true,
  showRedo: true,
  showSave: true,
  height: 300,
  width: 600,
  lineJoin: 'round'
})

const emit = defineEmits(['save'])
const drawingCanvas = useTemplateRef<any>('drawingCanvas')
const image = ref();

const clear = () => {
  drawingCanvas?.value.reset()
}

const redo = () => {
  drawingCanvas?.value.redo()
}

const undo = () => {
  drawingCanvas?.value.undo()
}

const save = () => {
  emit('save', drawingCanvas.value.isEmpty())
}
</script>