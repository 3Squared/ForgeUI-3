<template>
  <div>
    <h3>Button</h3>
    <p>
      Further documentation and examples can be found in the
      <a class="link" href="https://saforgestyleguide.z33.web.core.windows.net/#/general/button/button" target="_blank">
        <strong>Forge.UI documentation</strong>
      </a>
      .
    </p>
    <playground :code="code" :config="config" :options="options" @reset="reset">
      <template #component>
        <component :is="Button" v-bind="options">{{ content }}</component>
      </template>
      <template #additionalOptions>
        <div>
          <label>Button Content</label>
          <InputText v-model="content"></InputText>
        </div>
      </template>
    </playground>
  </div>
</template>

<script setup lang="ts">
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Playground from "./Playground.vue";
import { computed, ref, watch } from "vue";
import { usePlayground } from "./composables/useMapProp";

const content = ref("I am a Button");

const { options, propVals, config, reset } = usePlayground(
  {
    label: "",
    badge: "",
    disabled: false,
    squared: false,
    pressed: false,
    to: "",
    replace: false,
    href: ""
  },
  {
    replace: { disabled: () => !options.value.to }
  },
  () => (content.value = "I am a Button")
);

const code = computed(() => {
  return `<Button ${propVals.value.join(" ")}>${content.value}</Button>`;
});

watch(
  () => options.value.to,
  (val) => {
    if (!val) {
      options.value.replace = false;
    }
  }
);
</script>
