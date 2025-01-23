<template>
  <div class="d-flex flex-column">
    <div class="d-flex flex-row mb-2 h-100">
      <Card class="w-75 vh-70 me-2" :pt="{ content: { class: 'h-100' } }">
        <template #content>
          <div
            class="d-flex align-items-center justify-content-center"
            :class="displayValue ? 'h-75' : 'h-100'"
          >
            <slot href="component" name="component" />
          </div>
          <div v-if="displayValue" class="h-25">
            <Divider />

            <div class="h3">Result:</div>
            <div class="d-flex align-items-center justify-content-center">
              <slot href="value" name="value" />
            </div>
          </div>
        </template>
      </Card>
      <Card class="w-50 vh-70">
        <template #header>
          <div class="d-flex justify-content-between pb-2">
            <h1 class="h3">Options</h1>
            <div class="d-flex align-items-center">
              <slot name="re-render">
                <Button
                  v-if="props.rerender"
                  class="mr-2"
                  @click="$emit('re-render')"
                >
                  Re-render
                </Button>
              </slot>
              <Button @click="$emit('reset')"> Reset </Button>
            </div>
          </div>
          <slot name="header" />
        </template>
        <template #content>
          <div class="p-3 h-100">
            <template v-for="(option, key) in props.options">
              <slot :name="key" v-bind="props.options">
                <div v-if="isSelect(getConfig(key))">
                  <label>{{ key }}</label>
                  <Select
                    v-model="props.options[key]"
                    :options="getOptions(key)"
                    class="mb-3"
                    :disabled="isDisabled(key)"
                  />
                </div>
                <ForgeCheckbox
                  v-else-if="typeof option === 'boolean'"
                  v-model="props.options[key]"
                  :label="key"
                  binary
                  class="mb-2"
                  :disabled="isDisabled(key)"
                  :name="key"
                />
                <template v-else-if="typeof option === 'number'">
                  <label>{{ key }}</label>
                  <InputText
                    v-model.number="props.options[key]"
                    class="mb-2"
                    type="number"
                    :disabled="isDisabled(key)"
                  />
                </template>
                <template
                  v-else-if="
                    typeof option === 'string' || typeof option === undefined
                  "
                >
                  <label>{{ key }}</label>
                  <InputText
                    v-model="props.options[key]"
                    class="mb-2"
                    :disabled="isDisabled(key)"
                  />
                </template>
              </slot>
            </template>
            <slot name="additionalOptions" />
          </div>
        </template>
      </Card>
    </div>

    <CodeBlock :code="code" />
  </div>
</template>

<script setup lang="ts">
import Card from "primevue/card";
import Button from "primevue/button";
import Divider from "primevue/divider";
import InputText from "primevue/inputtext";
import Select from "primevue/select";
import { ForgeCheckbox } from "@3squared/forge-ui-3";
import { PropDefs, SelectPropDef } from "./composables/useMapProp";
import CodeBlock from "./components/CodeBlock.vue";

export interface ForgePlaygroundProps {
  code: string;
  options: object;
  rerender: boolean;
  config: Partial<Record<string, PropDefs>>;
  displayValue: boolean;
}

const props = withDefaults(defineProps<ForgePlaygroundProps>(), {
  rerender: false,
  code: "",
  displayValue: false,
});

function getConfig(key: string): PropDefs {
  return props.config[key]! ?? {};
}

function isDisabled(key: string) {
  const config = getConfig(key);
  if (config.disabled) {
    return config.disabled();
  }
  return false;
}

function isSelect(config: PropDefs): config is SelectPropDef {
  return (config as SelectPropDef)?.type === "select";
}

function getOptions(key: string) {
  const config = getConfig(key);
  if (isSelect(config)) {
    return config.options;
  }
  return [];
}
</script>

<style scoped>
.scroll {
  max-height: 100%;
  overflow-y: auto;
}
</style>
