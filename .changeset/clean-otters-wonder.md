---
"@3squared/forge-ui-3": minor
"forge-ui-3-styleguide": minor
---

Replace use of VueMultiselect with PrimeVue Multiselect.

`ForgeMultiselect` is still usable but  has been placed in a folder labelled deprecated to avoid future use.
It has also been removed from the styleguide and replace with the newly styled PrimeVue multiselect.

Migration Guide: Replace `ForgeMultiselect` with `Multiselect` see docs for how this can be implemented and use [PrimeVue](https://v3.primevue.org/multiselect/) docs. 

 `ForgeMultiselectPreview` now uses the PrimeVue `Multiselect`. This may mean some props no longer work. Again see PrimeVue docs for further guidance. 