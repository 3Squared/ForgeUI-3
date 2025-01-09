<template>
  <div>
    <ForgePageHeader title="AutoComplete" />
    <p>
      Further documentation and examples can be found in the
      <a class="link" target="_blank" href="https://primevue.org/autocomplete/"><strong>PrimeVue documentation</strong></a>
      .
    </p>
    <Playground :options="options" :code="code" :config="config" @reset="reset">
      <template #component>
        <component :is="ForgeAutoComplete" v-bind="options" v-model="selectedCountry" :suggestions="filteredCountries" option-label="name" @complete="search" />
      </template>
    </Playground>
  </div>
</template>

<script setup lang="ts">
import { ForgeAutoComplete, ForgePageHeader } from "@3squared/forge-ui-3";
import { Playground, usePlayground } from "@3squared/forge-playground-3";
import { computed, ref } from "vue";
import { countries } from "../../examples/data/exampleCountries";

const { options, propVals, config, reset } = usePlayground({
  name: "",
  multiple: false,
  disabled: false,
  placeholder: "Type a country name..."
});

const selectedCountry = ref();
const filteredCountries = ref();

const search = (event) => {
  if (!event.query.trim().length) {
    filteredCountries.value = [...countries];
  } else {
    filteredCountries.value = countries.filter((country) => {
      return country.name.toLowerCase().startsWith(event.query.toLowerCase());
    });
  }
};

const code = computed(() => `<ForgeAutoComplete${propVals.value.length > 0 ? " " + propVals.value.join(" ") : ""} />`);
</script>
