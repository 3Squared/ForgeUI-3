<template>
  <div>
    <ForgePageHeader title="Listbox" />
    <p>
      Further documentation and examples can be found in the
      <a class="link" target="_blank" href="https://primevue.org/listbox/"><strong>PrimeVue documentation</strong></a>
      .
    </p>
    <playground :options="options" :config="config" :code="code" display-value @reset="reset">
      <template #component>
        <component :is="Listbox" v-bind="options" v-model="value" class="w-100"/>
      </template>
      <template #value>
        {{ value }}
      </template>
    </playground>
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader} from "@3squared/forge-ui-3";
import { computed, ref } from "vue";
import { usePlayground, Playground } from "@3squared/forge-playground-3";
import Listbox from "primevue/listbox";

const value = ref();
const cities = ref([
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' }
]);

const { options, config, reset } = usePlayground(
  {
    options: cities,
    optionLabel: "name",
    checkmark: false,
    multiple: false,
    filter: true
  },
);

const code = computed(() => {
  return `
<template>
  <Listbox v-model="selectedCity" :options="cities" optionLabel="name" checkmark filter multiple />
</template>

<script setup lang="ts">
import Listbox from "primevue/listbox";
import { ref } from "vue";

const selectedCity = ref();
const cities = ref([
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' }
]);
</\script>
`;
});
</script>
