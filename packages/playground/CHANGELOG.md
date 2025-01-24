# @3squared/forge-playground-3

## 1.2.1

### Patch Changes

- dfc7f9c: Linting migration to ESLintV9 and ran linter
- Updated dependencies [dfc7f9c]
  - @3squared/forge-ui-3@2.4.0

## 1.2.0

### Minor Changes

- 81c21e4: Ensure file names have correct file extension

### Patch Changes

- Updated dependencies [81c21e4]
  - @3squared/forge-ui-3@2.3.0

## 1.1.0

### Minor Changes

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

### Patch Changes

- Updated dependencies [8f0b0bc]
  - @3squared/forge-ui-3@2.0.0

## 1.0.4

### Patch Changes

- f5e8319: - Refactor ForgeCheckbox so that the implementation is simpler.
  - Fix issue where clicking right at the top of a multiselect option wouldn't check the checkbox.
- Updated dependencies [f5e8319]
  - @3squared/forge-ui-3@0.13.1

## 1.0.3

### Patch Changes

- e20f354: Refactor Forge Multiselect
  - Update checkbox to use ForgeCheckbox.
  - Update Chevron to use the Bootstrap Chevron.
  - Update Placeholder to update depending on if searchable is true or not.
  - Fix issue where including Searchable broke Forge Multiselect (https://github.com/3Squared/ForgeUI-3/issues/139).
- Updated dependencies [e20f354]
  - @3squared/forge-ui-3@0.4.2

## 1.0.2

### Patch Changes

- c3418e4: Fix styling issues where options card and component card would be different sizes

## 1.0.1

### Patch Changes

- 1174632: Fix missing type issues

## 1.0.0

### Major Changes

- 3111e35: Add various enchancements to components

### Patch Changes

- 10fad22: Add Forge Table component and documentation. Fixed various inconsistencies across UI components and documentation pages. Fixed styling issues in Forge Playground.
- Updated dependencies [0ac1c6e]
- Updated dependencies [6e18be4]
- Updated dependencies [6bf70ec]
- Updated dependencies [7c73960]
- Updated dependencies [05683a8]
- Updated dependencies [d108647]
- Updated dependencies [18669a4]
- Updated dependencies [102760e]
- Updated dependencies [acee5a1]
- Updated dependencies [26c1f78]
- Updated dependencies [80ce5f9]
- Updated dependencies [1a8c850]
- Updated dependencies [b741405]
- Updated dependencies [a562bfb]
- Updated dependencies [4a7ad84]
- Updated dependencies [bd4c18b]
- Updated dependencies [1e4d938]
- Updated dependencies [7c33e57]
- Updated dependencies [fb7592c]
- Updated dependencies [a17f181]
- Updated dependencies [10fad22]
- Updated dependencies [1e5864a]
- Updated dependencies [b6ab00a]
- Updated dependencies [c43b9bb]
- Updated dependencies [44ddf25]
- Updated dependencies [01fb975]
- Updated dependencies [db0e596]
- Updated dependencies [d743506]
- Updated dependencies [9b1a21e]
- Updated dependencies [32107af]
- Updated dependencies [06bd31e]
- Updated dependencies [781f537]
- Updated dependencies [e2712cd]
- Updated dependencies [3111e35]
- Updated dependencies [2a5bdd8]
  - @3squared/forge-ui-3@0.1.0
