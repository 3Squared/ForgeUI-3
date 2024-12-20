<template>
  <div class="card d-flex justify-center p-2">
    <AutoComplete v-model="selectedCountry" option-label="name" :suggestions="filteredCountries" @complete="search" multiple inputClass="border border-0"/>
  
    <ForgeAutoComplete v-model="selectedCountry" option-label="name" :suggestions="filteredCountries" @complete="search" multiple class="p-1"/>
    
    <Button class>Submit</Button>
  </div>
</template>

<script setup>
import AutoComplete from "primevue/autocomplete";
import { ref } from "vue";
import { countries } from "./exampleCountries";
import ForgeAutoComplete from "@3squared/forge-ui-3/src/components/ForgeAutoComplete.vue";
import Button from "primevue/button"


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
  
}
</script>