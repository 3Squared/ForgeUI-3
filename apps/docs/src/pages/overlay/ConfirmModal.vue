<template>
  <div>
    <ForgePageHeader title="Confirmation Modal" />
    <p>If you only a small popup seeking confirmation from the user, theres a quick programmatic way to display one using the ConfirmService.</p>
    <p>
      Further documentation and examples can be found in the
      <a class="link" target="_blank" href="https://primevue.org/confirmdialog/"><strong>PrimeVue documentation</strong></a>
      .
    </p>
    <Playground :options="options" :code="code" :config="config" @reset="reset">
      <template #component>
        <component :is="ConfirmDialog" />
        <Button label="Click me!" @click="confirm1()" />
      </template>
    </Playground>
    Make sure to add
    <code>.use(ConfirmationService)</code>
    to your main.ts file before using it.
    <h2>Examples</h2>
    <ExampleConfirmDialogue class="mt-3" />
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader } from "@3squared/forge-ui-3";
import Button from "primevue/button";
import { Playground, usePlayground } from "@3squared/forge-playground-3";
import { computed, ref } from "vue";
import { buttonTypes, position } from "../../composables/playgroundOptions";
import ExampleConfirmDialogue from "../examples/components/ExampleConfirmDialogue.vue";
import ConfirmDialog from "primevue/confirmdialog";
import { useConfirm } from "primevue/useconfirm";

function getPropValue<T>(key: string, fallback: T): T {
  return (propVals?.value?.find((val) => val?.startsWith(key) == true)?.split("=")[1] as T) ?? fallback;
}

const { options, propVals, config, reset } = usePlayground(
  {
    message: "Are you sure you want to proceed?",
    header: "Confirmation",
    rejectProps: {
      label: "Cancel",
      severity: "secondary",
      outlined: true
    },
    acceptProps: {
      label: "Save"
    }
  },
  {}
);

const confirm = useConfirm();

const confirm1 = () => {
  confirm.require({
    message: getPropValue("message", "Are you sure you want to proceed?").replaceAll('"', ""),
    header: getPropValue("header", "Confirmation").replaceAll('"', ""),
    rejectProps: {
      label: "Cancel",
      severity: "secondary",
      outlined: true
    },
    acceptProps: {
      label: "Save"
    },
    accept: () => {
      console.log("Accepted");
    },
    reject: () => {
      console.log("Rejected");
    }
  });
};

const code = computed(
  () => `
<template>
    <ConfirmDialog />
    <Button label="Click me!" @click="confirm1()" />
</template>

<script>
import ConfirmDialog from "primevue/confirmdialog";
import {useConfirm} from "primevue/useconfirm";

const confirm = useConfirm();

const confirm1 = () => {
  confirm.require({
    message: "${getPropValue("message", "Are you sure you want to proceed?").replaceAll('"', "")}",
    header: "${getPropValue("header", "Confirmation").replaceAll('"', "")}",
    rejectProps: {
      label: "Cancel",
      severity: "secondary",
      outlined: true
    },
    acceptProps: {
      label: "Save"
    },
    accept: () => {
      console.log("Accepted");
    },
    reject: () => {
      console.log("Rejected");
    }
  });
};
<\/script>
`
);
</script>
