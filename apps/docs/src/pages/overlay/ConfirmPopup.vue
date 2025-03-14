<template>
  <div>
    <ForgePageHeader title="Confirm Popup" />
    <p>A small popup confirmation to appear by a button.</p>
    <p>
      Further documentation and examples can be found in the
      <a class="link" target="_blank" href="https://primevue.org/confirmpopup/"><strong>PrimeVue documentation</strong></a>
      .
    </p>

    <p> 
      Make sure to add
      <code>.use(ConfirmationService)</code>
      to your main.ts file before using it.
    </p>
    <Playground :options="options" :code="code" :config="config" @reset="reset">
      <template #component>
        <component :is="ForgeConfirmPopup" group="templating">
          <template #message="slotProps">
            <div>
              <p>{{ slotProps.message.message }}</p>
            </div>
          </template>
        </component>
        <Button label="Click me!" @click="showTemplate($event)" />
      </template>
    </Playground>
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { ForgeConfirmPopup, ForgePageHeader } from "@3squared/forge-ui-3";
import Button from "primevue/button";
import { Playground, usePlayground } from "@3squared/forge-playground-3";
import { computed, ref } from "vue";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const message = ref("Are you sure you want to proceed?")
const { options, config, reset } = usePlayground(
    {
      group: "templating"
    },
    {}
);

const confirm = useConfirm();
const toast = useToast();

const showTemplate = (event) => {
  confirm.require({
    target: event.currentTarget,
    group: 'templating',
    message: message.value,
    accept: () => {
      toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    },
    reject: () => {
      toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }
  });
}

const code = computed(
    () => `
<template>
    <Toast />
    <ForgeConfirmPopup group="templating">
      <template #message="slotProps">
        <div>
          <p>{{ slotProps.message.message }}</p>
        </div>
      </template>
    </ForgeConfirmPopup>
    <Button label="Click me!" @click="showTemplate($event)" />
</template>

<script>
import { ForgeConfirmPopup } from "@3squared/forge-ui-3";
import {useConfirm} from "primevue/useconfirm";
import { computed, ref } from "vue";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const confirm = useConfirm();
const toast = useToast();

const showTemplate = (event) => {
  confirm.require({
    target: event.currentTarget,
    //group - Optional key to match the key of the confirmation, useful to target a specific confirm dialog instance.
    group: 'templating', 
    message: "Are you sure you want to proceed?",
    accept: () => {
      toast.add({severity:'info', summary:'Confirmed', detail:'You have accepted', life: 3000});
    },
    reject: () => {
      toast.add({severity:'error', summary:'Rejected', detail:'You have rejected', life: 3000});
    }
  });
}
<\/script>
`
);
</script>
