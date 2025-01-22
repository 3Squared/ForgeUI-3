<template>
  <div>
    <ConfirmDialog></ConfirmDialog>
    <Button label="Save" @click="confirm1()" />
    <CodeBlock :code="code" />
  </div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import ConfirmDialog from "primevue/confirmdialog";
import { useConfirm } from "primevue/useconfirm";
import CodeBlock from "@3squared/forge-playground-3/src/components/CodeBlock.vue";
import { computed } from "vue";

const confirm = useConfirm();

const confirm1 = () => {
  confirm.require({
    message: "Are you sure you want to proceed?",
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
    <Button @click="confirm1()" label="Save" />
  </div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import ConfirmDialog from "primevue/confirmdialog";
import {useConfirm} from "primevue/useconfirm";

const confirm = useConfirm()


const confirm1 = () => {
  confirm.require({
    message: 'Are you sure you want to proceed?',
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
