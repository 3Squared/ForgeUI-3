<template>
  <div>
    <Toast />
    <ForgeConfirmPopup group="templating">
      <template #message="slotProps">
        <div>
          <p>{{ slotProps.message.message }}</p>
        </div>
      </template>
    </ForgeConfirmPopup>
    <div class="card flex justify-center">
      <Button @click="showTemplate($event)" label="Save"></Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import Button from "primevue/button";

const confirm = useConfirm();
const toast = useToast();

const showTemplate = (event) => {
  confirm.require({
    target: event.currentTarget,
    group: 'templating',
    message: 'Please confirm to proceed moving forward.',
    icon: 'pi pi-exclamation-circle',
    rejectProps: {
      icon: 'pi pi-times',
      label: 'Cancel',
    },
    acceptProps: {
      icon: 'pi pi-check',
      label: 'Confirm'
    },
    accept: () => {
      toast.add({severity:'info', summary:'Confirmed', detail:'You have accepted', life: 3000});
    },
    reject: () => {
      toast.add({severity:'error', summary:'Rejected', detail:'You have rejected', life: 3000});
    }
  });
}
</script>
