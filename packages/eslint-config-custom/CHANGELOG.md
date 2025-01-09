# eslint-config-custom

## 0.0.1

### Patch Changes

- 8f0b0bc: Update forge to use primevue 4:

  This major update upgrades forge from using primevue 3 to primevue 4.

  Breaking changes:

  - Removed `ForgeMultiselect`, use the primevue `Multiselect` instead
  - `Dropdown` is now a `Select`
  - `ForgeChip` has been replaced with `ForgeChip` is now more of a display component, use `ForgeAutoComplete` from primevue with `multiple` for more similar functionality
  - `ForgeStepper`
    - Requires the new `ForgeSteps` array to pass in steps
    - Removed back button
  - `TabView` now doesn't exist, instead use a combination of `Tabs`, `TabList`, and `Tab`, see docs for more detail
  - `OverlayPanel` is now `Popover`
  - `ForgeAlert`, `#messageicon` slot is now `#icon`
  - `FrogeNavbar`, `#menubuttonicon` slot is now `#buttonicon`
  - Passthroughs: Various properties in the passthrough objects from primevue have changed names, look through the individual passthrough object to see differences and use the primevue documentation

  Newly Styled/Documented components:

  - `DataView`
  - `ForgeAutoComplete`
  - `ForgeChip`
  - `Tags`
  - `Panel` - can be used as a single accordion
  - Add examples for `Button`, `Navbar`, `Table`, `DataView`, `AutoComplete` (not all these are documented)

  New features/Minor Fixes for ui:

  - Introduces inline steps for `ForgeStepper`
  - Default for `ForgeTable` paging is now 5
  - Add `ForgeSteps` type to use in `ForgeStepper`
  - Set `inline-feedback` class to `display: block !important` to make sure validation message is seen

  - Update packages:
    - Primevue
    - Iconify
    - Vueuse/components
    - Cypress
    - Yup

  Playground:

  - Add option to display the value (useful for form components)
