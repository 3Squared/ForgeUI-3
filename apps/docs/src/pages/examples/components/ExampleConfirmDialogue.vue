<template>
  <div>
    <p>
      Passing through a magic ID from somewhere into the confirmation. This can also be used for any other of the configuration options within that
      <code>confirm.require({})</code>
      call.
    </p>
    <div>
      <Button label="Save" @click="confirmExample('my-cool-id')" />
      <CodeBlock :code="code" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import { useConfirm } from "primevue/useconfirm";
import CodeBlock from "@3squared/forge-playground-3/src/components/CodeBlock.vue";
import { computed } from "vue";

const confirm = useConfirm();

const confirmExample = (id: string) => {
  confirm.require({
    message: `Are you sure you want to proceed with ID: ${id}?`,
    header: "Confirmation",
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
  () => `<template>
  <div>
    <ConfirmDialog></ConfirmDialog>
    <Button @click="confirmExample('my-cool-id')" label="Save" />
  </div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import ConfirmDialog from "primevue/confirmdialog";
import {useConfirm} from "primevue/useconfirm";

const confirm = useConfirm()


const confirmExample = (id: string) => {
  confirm.require({
    message: \`Are you sure you want to proceed with ID: \$\{id\}?\`,
    header: 'Confirmation',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Save'
    },
    accept: () => {
      console.log('Accepted');
    },
    reject: () => {
      console.log('Rejected');
    }
  });
};

<\/script>`
);
</script>
