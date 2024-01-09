<template>
  <ForgePageHeader title="Action Button" />
  <p>
    Further documentation and examples can be found in the <a class="link" target="_blank"
                                                              href="https://primevue.org/button/"><strong>PrimeVue
    documentation</strong></a>.
  </p>
  <Playground :options="options" :config="config" :code="code" @reset="reset">
    <template #component>
      <component :is="ForgeActionButton" v-bind="options" />
    </template>
    <template #additionalOptions>
      <template>
        <label>Button Content</label>
        <InputText v-model="content" class="mb-2"></InputText>
      </template>
      <ForgeCheckbox v-model="throwError" label="Throw Error" class="mb-2" />
      <ForgeCheckbox v-model="hideSpinner" label="Hide Spinner" class="mb-2" />
    </template>
  </Playground>
</template>

<script setup lang="ts">
import { ForgePageHeader, ForgeActionButton, ForgeCheckbox } from "@3squared/forge-ui-3";
import InputText from "primevue/inputtext";
import Toast from 'primevue/toast'
import { Playground, usePlayground } from "@3squared/forge-playground-3";
import { computed, ref, watch } from "vue";
import { severities } from "../../composables/playgroundOptions";
import { useToast } from 'primevue/usetoast'

const throwError = ref(false);
const hideSpinner = ref(false);
const errorMessage = ref("This action failed");
const content = ref("Action Button");

const disabled = ref(false)

const toast = useToast()

const { options, propVals, config, reset } = usePlayground(
    {
      action: async () => {
        if (!hideSpinner.value) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
        if (throwError.value) {
          throw errorMessage.value;
        } else {
          toast.add({ severity: 'success', summary: "Action completed successfully!"})
        }
      },
      params: ["ArrayOfActionParams"],
      severity: severities[0],
      "error-message": errorMessage.value,
      label: content.value
    },
    {
      severity: { type: "select", options: severities, required: true },
      action: { required: true }
    },
    () => {
      content.value = "Action Button";
      throwError.value = false;
      hideSpinner.value = false;
    }
);

watch(
    () => options.value["error-message"],
    (message) => (errorMessage.value = message)
);

const code = computed(() => `<forge-action-button ${propVals.value.join(" ")}>${content.value}</forge-action-button>`);
</script>