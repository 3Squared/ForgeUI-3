<template>
  <div>
    <forge-page-header title="Tree Select" />
    <p>
      Further documentation and examples can be found in the
      <a class="link" target="_blank" href="https://primevue.org/treeselect/"><strong>PrimeVue documentation</strong></a>
      .
    </p>
    <Playground :options="options" :config="config" :code="code" display-value>
      <template #component>
        <component :is="TreeSelect" v-bind="options" v-model="selectedValue" class="w-100" />
      </template>
      <template #value>
        {{ selectedValue == null ? 'Select a value...' : selectedValue }}
      </template>
    </Playground>

    <p>
      See
      <a class="link" target="_blank" href="https://primevue.org/treeselect/#api.options.TreeNode"><strong>TreeNode</strong></a>
      for full object model
    </p>
    <CodeBlock :code="optionsCode" />
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader } from "@3squared/forge-ui-3";
import { computed, ref } from "vue";
import { usePlayground, Playground, CodeBlock } from "@3squared/forge-playground-3";
import TreeSelect from "primevue/treeselect";
import { nodes } from "../../examples/data/exampleTreeNodes";

const selectedValue = ref();

const displays = ["chip", "comma"];
const selectionModes = ["single", "multiple", "checkbox"];

const { options, propVals, config } = usePlayground(
    {
      options: nodes,
      display: "comma",
      filter: false,
      showClear: false,
      placeholder: "Select an option",
      disabled: false,
      maxSelectedLabels: 2,
      appendTo: "self"
    },
    {
      display: { type: "select", options: displays },
      selectionMode: { type: "select", options: selectionModes }
    }
);

const code = computed(() => `<TreeSelect ${propVals.value.join(" ")}/>`);

const optionsCode = computed(() => `const options = const nodes = [
  {
    key: '0',
    label: 'Documents',
    data: 'Documents Folder',
    icon: 'pi pi-fw pi-inbox',
    children: [
      {
        key: '0-0',
        label: 'Work',
        data: 'Work Folder',
        icon: 'pi pi-fw pi-cog',
        children: [
          { key: '0-0-0', label: 'Expenses.doc', icon: 'pi pi-fw pi-file', data: 'Expenses Document' },
          { key: '0-0-1', label: 'Resume.doc', icon: 'pi pi-fw pi-file', data: 'Resume Document' }
        ]
      },
      {
        key: '0-1',
        label: 'Home',
        data: 'Home Folder',
        icon: 'pi pi-fw pi-home',
        children: [{ key: '0-1-0', label: 'Invoices.txt', icon: 'pi pi-fw pi-file', data: 'Invoices for this month' }]
      }
    ]
  },
  {
    key: '1',
    label: 'Events',
    data: 'Events Folder',
    icon: 'pi pi-fw pi-calendar',
    children: [
      { key: '1-0', label: 'Meeting', icon: 'pi pi-fw pi-calendar-plus', data: 'Meeting' },
      { key: '1-1', label: 'Product Launch', icon: 'pi pi-fw pi-calendar-plus', data: 'Product Launch' },
      { key: '1-2', label: 'Report Review', icon: 'pi pi-fw pi-calendar-plus', data: 'Report Review' }
    ]
  },
  {
    key: '2',
    label: 'Movies',
    data: 'Movies Folder',
    icon: 'pi pi-fw pi-star-fill',
    children: [
      {
        key: '2-0',
        icon: 'pi pi-fw pi-star-fill',
        label: 'Al Pacino',
        data: 'Pacino Movies',
        children: [
          { key: '2-0-0', label: 'Scarface', icon: 'pi pi-fw pi-video', data: 'Scarface Movie' },
          { key: '2-0-1', label: 'Serpico', icon: 'pi pi-fw pi-video', data: 'Serpico Movie' }
        ]
      },
      {
        key: '2-1',
        label: 'Robert De Niro',
        icon: 'pi pi-fw pi-star-fill',
        data: 'De Niro Movies',
        children: [
          { key: '2-1-0', label: 'Goodfellas', icon: 'pi pi-fw pi-video', data: 'Goodfellas Movie' },
          { key: '2-1-1', label: 'Untouchables', icon: 'pi pi-fw pi-video', data: 'Untouchables Movie' }
        ]
      }
    ]
  }
];/>`);

</script>
