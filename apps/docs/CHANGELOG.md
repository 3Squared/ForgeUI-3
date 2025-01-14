# forge-ui-3-styleguide

## 2.2.0

### Minor Changes

- 7c1cf42: Add ForgeScratchpad component

### Patch Changes

- Updated dependencies [7c1cf42]
  - @3squared/forge-ui-3@2.2.0

## 2.1.0

### Minor Changes

- 3b87252: Add styling to primevue split button with documentation

### Patch Changes

- eb1a02d: Alter column customiser so that selected columns can we sent in.

  Add `selected` property to `ForgeColumn`, this allows selected columns to be set to true or false outside forge ui.

- ca37bab: Add an example of the script code for split button
- Updated dependencies [3b87252]
- Updated dependencies [eb1a02d]
  - @3squared/forge-ui-3@2.1.0

## 2.0.0

### Major Changes

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
  - @3squared/forge-playground-3@1.1.0

## 1.17.3

### Patch Changes

- 2056e33: Add multiselect-preview into ForgeFormField so that validation can be easily implemented.
- Updated dependencies [2056e33]
  - @3squared/forge-ui-3@1.3.5

## 1.17.2

### Patch Changes

- a9fbd3e: Multiselect changes:
  - Remove chip default from multiselect preview
  - Improve to multiselect documentation
- Updated dependencies [a9fbd3e]
  - @3squared/forge-ui-3@1.3.3

## 1.17.1

### Patch Changes

- b546490: Add Styling fixes and more example data
- Updated dependencies [b546490]
  - @3squared/forge-ui-3@1.3.1

## 1.17.0

### Minor Changes

- 221d4c4: Replace use of VueMultiselect with PrimeVue Multiselect.

  `ForgeMultiselect` is still usable but has been placed in a folder labelled deprecated to avoid future use.
  It has also been removed from the styleguide and replace with the newly styled PrimeVue multiselect.

  Migration Guide: Replace `ForgeMultiselect` with `Multiselect` see docs for how this can be implemented and use [PrimeVue](https://v3.primevue.org/multiselect/) docs.

  `ForgeMultiselectPreview` now uses the PrimeVue `Multiselect`. This may mean some props no longer work. Again see PrimeVue docs for further guidance.

### Patch Changes

- Updated dependencies [221d4c4]
- Updated dependencies [a8ec24e]
- Updated dependencies [c8f1859]
  - @3squared/forge-ui-3@1.3.0

## 1.16.0

### Minor Changes

- cf1b355: Add and style fieldset for forge

### Patch Changes

- Updated dependencies [fd61f4a]
- Updated dependencies [cf1b355]
  - @3squared/forge-ui-3@1.2.0

## 1.15.1

### Patch Changes

- a482387: Fix file type validation to use ForgeFileType object instead of a string
- Updated dependencies [a482387]
  - @3squared/forge-ui-3@1.1.3

## 1.15.0

### Minor Changes

- 269c873: Add Forge Column Customiser.
  - This component allows users hide and show columns.

### Patch Changes

- Updated dependencies [269c873]
  - @3squared/forge-ui-3@1.1.0

## 1.14.0

### Minor Changes

- 84503ba: Update FileUploader so that:

  - Accepted file types appear in an overlay instead of inline.
  - File types can be configured with custom labels.

  **BREAKING CHANGE MIGRATION GUIDE**

  File Uploaders `acceptedFileTypes` prop will now be required to use the custom `ForgeFileType` interface provided by the import `@3squared/forge-ui-3/src/types/forge-types.ts`.

  In order to fix the breaking change, you will simply have to update your accepted file type array to use the interface. For example:

  `['image/jpeg'] -> [{ fileType: 'image/jpeg' }] as ForgeFileType[]`

### Patch Changes

- Updated dependencies [84503ba]
  - @3squared/forge-ui-3@1.0.0

## 1.13.1

### Patch Changes

- c8c65ca: Update sample code in ForgeRemainingCharacters

## 1.13.0

### Minor Changes

- ddaf434: Add prop to ForgeFormField to position the label above or to the left of the input

### Patch Changes

- 1663233: Fix issue where Clear Button on table appears when there is no active filter
- Updated dependencies [bf2b021]
- Updated dependencies [ddaf434]
- Updated dependencies [1663233]
- Updated dependencies [7a4acdc]
  - @3squared/forge-ui-3@0.15.0

## 1.12.0

### Minor Changes

- c212535: Add default empty table slot content and empty message prop to allow easy customisation to tables which contain no content.

### Patch Changes

- 2e9e692: Fix issue where dropdown placeholder text was a different colour and refactor ForgeMultiselect css
- Updated dependencies [2e9e692]
- Updated dependencies [c212535]
  - @3squared/forge-ui-3@0.14.0

## 1.11.0

### Minor Changes

- f5e8319: - Refactor ForgeCheckbox so that the implementation is simpler.
  - Fix issue where clicking right at the top of a multiselect option wouldn't check the checkbox.

### Patch Changes

- Updated dependencies [f5e8319]
  - @3squared/forge-playground-3@1.0.4
  - @3squared/forge-ui-3@0.13.1

## 1.10.0

### Minor Changes

- f373b6f: - Add size prop to ForgeModal, this will allow for a modals width to be made bigger or smaller.

### Patch Changes

- Updated dependencies [f373b6f]
  - @3squared/forge-ui-3@0.13.0

## 1.9.1

### Patch Changes

- 4294ef1: Add missing File Uploader link to Navbar

## 1.9.0

### Minor Changes

- 4544bd7: - Add Dropdown, ForgeMultiselect and ForgeDatepicker to ForgeFormField.
  - Add validation to ForgeDatePicker.

### Patch Changes

- Updated dependencies [4544bd7]
  - @3squared/forge-ui-3@0.10.0

## 1.8.2

### Patch Changes

- 56d26fe: - Add Clear button to Forge Filter header and method prop to customise clear functionality.
- Updated dependencies [56d26fe]
  - @3squared/forge-ui-3@0.9.0

## 1.8.1

### Patch Changes

- 748a0ea: - Add selected prop and styling to visually show that a tile has been selected.
- Updated dependencies [748a0ea]
  - @3squared/forge-ui-3@0.8.0

## 1.8.0

### Minor Changes

- 1e67190: - Fix ForgeFormField validation so that it can be accessed via Form level validation.
  - Update ForgeFormField to use Yup instead of Zod.
  - Add cancelButtonType and submitButtonType to ForgeModal so that the buttons can be converted into submit/reset buttons for form use.

### Patch Changes

- 1d88aef: - Add @update:tableContext event to table to allow user to retrieve the table context easily. The Table context retrieves the following information about the table:

  - Total Items
  - Current Page
  - Items per page
  - Sort Field
  - Sort Direction
  - Filters

  - Fix issue where cursor doesn't change to pointer when hovering over the pagination buttons.

- Updated dependencies [1d88aef]
- Updated dependencies [1e67190]
  - @3squared/forge-ui-3@0.7.0

## 1.7.1

### Patch Changes

- e5bd7f9: - Add Severity prop to ForgeTable and table styles.
  - Fix issue where Sticky Header and Active Page in pagination would appear over the top of modals.
  - Fix issue where Sticky Header wasn't toggleable.
  - Fix issue where ForgePageHeader wouldn't vertically center the title with the content passed through the slot.
- Updated dependencies [e5bd7f9]
  - @3squared/forge-ui-3@0.6.0

## 1.7.0

### Minor Changes

- 738a286: Add Select Button Documentation page

## 1.6.2

### Patch Changes

- c20f659: Improve appearance and functionality of the Datepicker - Allow users to manually enter a date by typing. - Hide the 'Today' and 'Clear' buttons by default. - Adding missing styling for time picker. - Highlight current day, month and year in variant colour. - Update the styling of circle that surrounds the selected date along with its hover state. - Update appearance of the calendar icon, making it appear inside the datepicker input. - Add a Clear button inside the datepicker input.
- Updated dependencies [c20f659]
  - @3squared/forge-ui-3@0.5.0

## 1.6.1

### Patch Changes

- e20f354: Refactor Forge Multiselect
  - Update checkbox to use ForgeCheckbox.
  - Update Chevron to use the Bootstrap Chevron.
  - Update Placeholder to update depending on if searchable is true or not.
  - Fix issue where including Searchable broke Forge Multiselect (https://github.com/3Squared/ForgeUI-3/issues/139).
- Updated dependencies [e20f354]
  - @3squared/forge-playground-3@1.0.3
  - @3squared/forge-ui-3@0.4.2

## 1.6.0

### Minor Changes

- 52adf7f: Add input switch component

### Patch Changes

- Updated dependencies [52adf7f]
  - @3squared/forge-ui-3@0.4.0

## 1.5.0

### Minor Changes

- 09ab424: Add badge documentation page

## 1.4.3

### Patch Changes

- ee10f17: - Add customisable Brand colour.
  - Refactor Passthrough objects into their own files.
- Updated dependencies [ee10f17]
  - @3squared/forge-ui-3@0.3.0

## 1.4.2

### Patch Changes

- 6670934: - Fix issue where PrimeVue slots weren't rendering.
  - Fix issue where CancelClass and SubmitClass didn't affect button styling.
  - Fix styling issue where close and maximise icons were too big.
- Updated dependencies [6670934]
  - @3squared/forge-ui-3@0.2.2

## 1.4.1

### Patch Changes

- 12803a1: - Fix issue with the documentation page where it showed the incorrect tag in the generated code.
  - Fix ForgeChips styling issue where it showed the outline of the input textbox in the container.
  - Fix ForgeChips styling issue where each tag and input would have a bulletpoint before them.
- Updated dependencies [12803a1]
  - @3squared/forge-ui-3@0.2.1

## 1.4.0

### Minor Changes

- d4efc70: - Add Forge Link Component.
  - This utility component allows developers to implement a link to an external site, which incorporates [link](https://getbootstrap.com/docs/5.3/utilities/link/) and [icon-link](https://getbootstrap.com/docs/5.3/helpers/icon-link/) styling from Bootstrap 5.

### Patch Changes

- Updated dependencies [d4efc70]
  - @3squared/forge-ui-3@0.2.0

## 1.3.0

### Minor Changes

- 554a00d: Fix issue where the second layer of the Menu Item Dropdown would appear left of the original dropdown instead of the right.

### Patch Changes

- Updated dependencies [554a00d]
  - @3squared/forge-ui-3@0.1.4

## 1.2.0

### Minor Changes

- 4bdab41: Add changelog for Forge.UI 3 to documentation site

## 1.1.0

### Minor Changes

- b755a9d: Add Getting Started guide

## 1.0.1

### Patch Changes

- be547c0: Remove Route Searcher here filler text from landing page

## 1.0.0

### Major Changes

- 3111e35: Add various enchancements to components

### Minor Changes

- 10fad22: Add Forge Table component and documentation. Fixed various inconsistencies across UI components and documentation pages. Fixed styling issues in Forge Playground.
- db0e596: Add ForgeFileUploader and documentation page.

### Patch Changes

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
