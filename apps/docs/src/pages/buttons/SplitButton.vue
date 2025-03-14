<template>
  <div>
    <ForgePageHeader title="Split Button" />
    <p>
      Further documentation and examples can be found in the
      <a class="link" target="_blank" href="https://primevue.org/button/"><strong>PrimeVue documentation</strong></a>
      .
    </p>
    <p>
      <b>IMPORTANT:</b> Please make sure to pass in an <code>id</code> attribute when using SplitButtons to make sure the dropdown alignment is correct.
    </p>
    <Playground :options="options" :code="code" :config="config" @reset="reset">
      <template #component>
        <component :is="SplitButton" v-bind="options" :model="items" @click="save" />
      </template>
    </Playground>
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader } from "@3squared/forge-ui-3";
import { Playground, usePlayground } from "@3squared/forge-playground-3";
import { computed } from "vue";
import { severities, sizes } from "../../composables/playgroundOptions";
import SplitButton from "primevue/splitbutton";
import { useToast } from "primevue/usetoast";

const toast = useToast();

const items = [
  {
    label: "Update",
    command: () => {
      toast.add({ severity: "success", summary: "Updated", detail: "Data Updated", life: 3000 });
    }
  },
  {
    label: "Delete",
    command: () => {
      toast.add({ severity: "warn", summary: "Delete", detail: "Data Deleted", life: 3000 });
    }
  },
  {
    separator: true
  },
  {
    label: "Quit",
    url: "https://vuejs.org/"
  }
];

const save = () => {
  toast.add({ severity: "success", summary: "Success", detail: "Data Saved", life: 3000 });
};

const { options, propVals, config, reset } = usePlayground(
  {
    id: "my-unique-id",
    label: "Button",
    severity: severities[0],
    outlined: false,
    size: ""
  },
  {
    id: { required: true },
    label: { required: true },
    size: { type: "select", options: sizes },
    severity: { type: "select", options: severities }
  }
);

const code = computed(
  () => `
<template>
 <SplitButton${propVals.value.length > 0 ? " " + propVals.value.join(" ") : ""} />
</template>

<script setup lang="ts">
import SplitButton from "primevue/splitbutton";

const items = [
  {
    label: "Update",
    command: () => {
      toast.add({ severity: "success", summary: "Updated", detail: "Data Updated", life: 3000 });
    }
  },
  {
    label: "Delete",
    command: () => {
      toast.add({ severity: "warn", summary: "Delete", detail: "Data Deleted", life: 3000 });
    }
  },
  {
    separator: true
  },
  {
    label: "Quit",
    command: () => {
      window.location.href = "https://vuejs.org/";
    }
  }
];

const save = () => {
  toast.add({ severity: "success", summary: "Success", detail: "Data Saved", life: 3000 });
};
</\script>
`
);
</script>
