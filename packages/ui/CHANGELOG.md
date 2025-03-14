# @3squared/forge-ui-3

## 2.14.2

### Patch Changes

- ae165d2: Fix full row expander on model value change not firing the setExpanderColumns, by adding a watch and firing the event

## 2.14.1

### Patch Changes

- 12f3dd0: - Update primevue and extra packages
  - Remove console log

## 2.14.0

### Minor Changes

- 6d2d6e7: Added ForgeTreeTable
  - Added new ForegTreeTable component based on PrimeVue TreeTable with addtional props top allow for parent nodes being full width, based on a column count prop
  - Added passthrough for the TreeTable to be used, if not using the ForgeTreeTable Component
  - Added a new base colour called success-alternate
  - Fixed the Colour page menus

## 2.13.0

### Minor Changes

- 14ce4d6: Changes:
  - Add `inLine` version of `ForgeLoader`: a smaller version so it can for showing the uploading status of each file in the file uploader.
  - `ForgeFileUploader`:
    - Fix functionality to stop file upload
    - Stop files from uploading again if new files are added
  - Make severity optional for `ForgeTile`

## 2.12.3

### Patch Changes

- f0a5c70: Fix passthrough for splitbutton dropdown to allow for automatic alignment instead of pageoverflow

## 2.12.2

### Patch Changes

- 7774358: Change the way slots are passed into the panel

## 2.12.1

### Patch Changes

- f185006: Add type import fix

## 2.12.0

### Minor Changes

- 2682662: - Add max height prop to modal
  - Move helpful classes to utilities so they can be used in app and don't have to be added in railsmart design system

## 2.11.0

### Minor Changes

- df4fc12: Add customisable modal error

## 2.10.1

### Patch Changes

- b37a89e: Add max file count display

## 2.10.0

### Minor Changes

- 7cd55cc: - ForgeFormField - Add a slot to pass any input into
  - Change ForgeSelectButton to v-model for the select values rather than the whole option object

## 2.9.0

### Minor Changes

- 7337a7d: Add resetError function to the ForgeModal

## 2.8.2

### Patch Changes

- 51b10d5: Trim text filter value in table

## 2.8.1

### Patch Changes

- c4a1d42: Fix checkbox > readonly not working properly

## 2.8.0

### Minor Changes

- 1c0488f: Add forge resolver with docs update

## 2.7.0

### Minor Changes

- 4224fe6: Add ForgeSelectButton and ForgeToggleButton
  - Allow severity to be passed into each button within a select group
- 6bcdcb7: Add styled accordion component and docs

## 2.6.0

### Minor Changes

- c0a13c9: Style and document Tree and Tree Select

## 2.5.2

### Patch Changes

- c1ab88e: Update vite to v6

## 2.5.1

### Patch Changes

- a6f4d90: Fix scratchpad line interpolation, by adding default lineJoin of round
- dd6a455: Improve paginator:
  - Remove if there are no initial values
  - Disable if the buttons don't do anything

## 2.5.0

### Minor Changes

- 6eab332: - Add ForgePanel - this is so we can have the chevron icon instead of the plus/minus.
  - Set eslint config to ignore example files

## 2.4.0

### Minor Changes

- dfc7f9c: Introduce PT for ConfirmDialog

## 2.3.0

### Minor Changes

- 81c21e4: Ensure file names have correct file extension

## 2.2.1

### Patch Changes

- ca67ae5: - Fix tag severity background
  - Update dropdown primevue links/update code example
  - Add better select button code example
  - Add styling to panel

## 2.2.0

### Minor Changes

- 7c1cf42: Add ForgeScratchpad component

## 2.1.0

### Minor Changes

- 3b87252: Add styling to primevue split button with documentation

### Patch Changes

- eb1a02d: Alter column customiser so that selected columns can we sent in.

  Add `selected` property to `ForgeColumn`, this allows selected columns to be set to true or false outside forge ui.

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

## 1.3.5

### Patch Changes

- 2056e33: Add multiselect-preview into ForgeFormField so that validation can be easily implemented.

## 1.3.4

### Patch Changes

- 48991eb: Installed Mime package, added forge mime type to utilities and to file info. This allows us to send the content type and disposition header to blob

## 1.3.3

### Patch Changes

- a9fbd3e: Multiselect changes:
  - Remove chip default from multiselect preview
  - Improve to multiselect documentation

## 1.3.2

### Patch Changes

- cfbb0fc: Change default multiselect filter header back to comma

## 1.3.1

### Patch Changes

- b546490: Add Styling fixes and more example data

## 1.3.0

### Minor Changes

- 221d4c4: Replace use of VueMultiselect with PrimeVue Multiselect.

  `ForgeMultiselect` is still usable but has been placed in a folder labelled deprecated to avoid future use.
  It has also been removed from the styleguide and replace with the newly styled PrimeVue multiselect.

  Migration Guide: Replace `ForgeMultiselect` with `Multiselect` see docs for how this can be implemented and use [PrimeVue](https://v3.primevue.org/multiselect/) docs.

  `ForgeMultiselectPreview` now uses the PrimeVue `Multiselect`. This may mean some props no longer work. Again see PrimeVue docs for further guidance.

- c8f1859: Add extra width classes:

  - 5: 5%,
  - 10: 10%,
  - 20: 20%,
  - 25: 25%,
  - 30: 30%,
  - 40: 40%,
  - 50: 50%,
  - 60: 60%,
  - 75: 75%,
  - 80: 80%,
  - 90: 90%,
  - 100: 100%,

  These can be used by appending the size needed to `w-` e.g. 20% would be `w-20`

### Patch Changes

- a8ec24e: Fix fieldset test

## 1.2.0

### Minor Changes

- cf1b355: Add and style fieldset for forge

### Patch Changes

- fd61f4a: Update vitest to 2.1.5

## 1.1.3

### Patch Changes

- a482387: Fix file type validation to use ForgeFileType object instead of a string

## 1.1.2

### Patch Changes

- e87977c: Fix checkbox to make label trigger change event when validation is not used

## 1.1.1

### Patch Changes

- 9b98b29: Fix issue where ForgeColumnCustomisers spacing would be too tight to the Exporter and Clear All button

## 1.1.0

### Minor Changes

- 269c873: Add Forge Column Customiser.
  - This component allows users hide and show columns.

## 1.0.0

### Major Changes

- 84503ba: Update FileUploader so that:

  - Accepted file types appear in an overlay instead of inline.
  - File types can be configured with custom labels.

  **BREAKING CHANGE MIGRATION GUIDE**

  File Uploaders `acceptedFileTypes` prop will now be required to use the custom `ForgeFileType` interface provided by the import `@3squared/forge-ui-3/src/types/forge-types.ts`.

  In order to fix the breaking change, you will simply have to update your accepted file type array to use the interface. For example:

  `['image/jpeg'] -> [{ fileType: 'image/jpeg' }] as ForgeFileType[]`

## 0.16.1

### Patch Changes

- 6cd40a3: Fix issue where form-control ! was visible underneath ForgeDatepicker Calendar icon when the field is invalid.
- ccc8b13: Fix issue where ForgeLink wouldn't wrap text when inside a container.
- e08dba8: - Fix issue where ForgeMultiselect panel would appear underneath other elements.
  - Fix issue in ForgeMultiselect and Dropdown where placeholder text would wrap, causing the element to become misshapen.
  - Fix issue in ForgeFilterHeader where items would spill out of the dropdown panel past a certain size.

## 0.16.0

### Minor Changes

- 1b4c94b: Add utility classes to modify font weight via css classes

### Patch Changes

- 331eb6e: Fix padding between dropdown/multiselect arrow and label

## 0.15.0

### Minor Changes

- ddaf434: Add prop to ForgeFormField to position the label above or to the left of the input

### Patch Changes

- bf2b021: Fix button link styling so that it is inline with ForgeLink
- 1663233: Fix issue where Clear Button on table appears when there is no active filter
- 7a4acdc: - Fix issue where large images would appear off the screen.
  - Fix issue where the toolbar would appear under the image.

## 0.14.0

### Minor Changes

- c212535: Add default empty table slot content and empty message prop to allow easy customisation to tables which contain no content.

### Patch Changes

- 2e9e692: Fix issue where dropdown placeholder text was a different colour and refactor ForgeMultiselect css

## 0.13.1

### Patch Changes

- f5e8319: - Refactor ForgeCheckbox so that the implementation is simpler.
  - Fix issue where clicking right at the top of a multiselect option wouldn't check the checkbox.

## 0.13.0

### Minor Changes

- f373b6f: - Add size prop to ForgeModal, this will allow for a modals width to be made bigger or smaller.

## 0.12.1

### Patch Changes

- d6deb37: Fix issue where divider had a large margin.

## 0.12.0

### Minor Changes

- 6a541da: Add Clear All prop to Forge Table so that the developer is able to customise how filters are cleared.

## 0.11.1

### Patch Changes

- 9d36cda: - Fix issue where clicking multiselect option wouldn't check checkbox when clicking in a certain area of the option.
  - Fix issue where attributes weren't passed to ForgeMultiselect when using ForgeMultiselectPreview.

## 0.11.0

### Minor Changes

- 8f243cc: Add utility methods to convert arrays and objects to multiselect options.

## 0.10.2

### Patch Changes

- cbd59d2: Fix issue where label wouldn't display in ForgeFilterHeader if optionValue is defined

## 0.10.1

### Patch Changes

- 62aff77: - Fix issue where label and value wasn't taken into consideration by Dropdown or Multiselect in ForgeFilterHeader.
  - Fix issue in ForgeFilterHeader Multiselect where the placeholder text was the wrong colour.

## 0.10.0

### Minor Changes

- 4544bd7: - Add Dropdown, ForgeMultiselect and ForgeDatepicker to ForgeFormField.
  - Add validation to ForgeDatePicker.

## 0.9.0

### Minor Changes

- 56d26fe: - Add Clear button to Forge Filter header and method prop to customise clear functionality.

## 0.8.0

### Minor Changes

- 748a0ea: - Add selected prop and styling to visually show that a tile has been selected.

## 0.7.2

### Patch Changes

- 89f595b: - Fix issue where ForgeDatepicker panel wouldn't open without setting the showOnFocus prop.

## 0.7.1

### Patch Changes

- 250ce31: - Fix issue where the Multiselect in the ForgeFilterHeader was unstyled.
  - Fix issue where ForgeChips, ForgeMultiselect and ForgeInlineEditor were still using Zod for validation.

## 0.7.0

### Minor Changes

- 1d88aef: - Add @update:tableContext event to table to allow user to retrieve the table context easily. The Table context retrieves the following information about the table:

  - Total Items
  - Current Page
  - Items per page
  - Sort Field
  - Sort Direction
  - Filters

  - Fix issue where cursor doesn't change to pointer when hovering over the pagination buttons.

### Patch Changes

- 1e67190: - Fix ForgeFormField validation so that it can be accessed via Form level validation.
  - Update ForgeFormField to use Yup instead of Zod.
  - Add cancelButtonType and submitButtonType to ForgeModal so that the buttons can be converted into submit/reset buttons for form use.

## 0.6.1

### Patch Changes

- 3180962: - Fix issue where the table loading spinner stopped the user from using the rest of the page whilst the table was loading.

## 0.6.0

### Minor Changes

- e5bd7f9: - Add Severity prop to ForgeTable and table styles.
  - Fix issue where Sticky Header and Active Page in pagination would appear over the top of modals.
  - Fix issue where Sticky Header wasn't toggleable.
  - Fix issue where ForgePageHeader wouldn't vertically center the title with the content passed through the slot.

## 0.5.5

### Patch Changes

- a7949c0: - Fix issue where tile-brand hover colour defaulted to the tile-primary hover colour.

## 0.5.4

### Patch Changes

- f2d0c19: - Update naming convention of SCSS variables to match bootstrap 5 naming conventions.

## 0.5.3

### Patch Changes

- a905cf8: Fix issue where bootstrap imports wouldn't resolve in external apps

## 0.5.2

### Patch Changes

- d2ed79a: - Update bootstrap import statements so that they are imported from the root node_modules folder.

## 0.5.1

### Patch Changes

- c769c8e: - Split out components into separate scss file to allow for external projects to have the choice of just importing the component classes.

## 0.5.0

### Minor Changes

- c20f659: Improve appearance and functionality of the Datepicker
  - Allow users to manually enter a date by typing.
  - Hide the 'Today' and 'Clear' buttons by default.
  - Adding missing styling for time picker.
  - Highlight current day, month and year in variant colour.
  - Update the styling of circle that surrounds the selected date along with its hover state.
  - Update appearance of the calendar icon, making it appear inside the datepicker input.
  - Add a Clear button inside the datepicker input.

## 0.4.2

### Patch Changes

- e20f354: Refactor Forge Multiselect
  - Update checkbox to use ForgeCheckbox.
  - Update Chevron to use the Bootstrap Chevron.
  - Update Placeholder to update depending on if searchable is true or not.
  - Fix issue where including Searchable broke Forge Multiselect (https://github.com/3Squared/ForgeUI-3/issues/139).

## 0.4.1

### Patch Changes

- cafa2d7: Fix issue where toast text wouldn't wrap when it exceeded the width of the toast container.

## 0.4.0

### Minor Changes

- 52adf7f: Add input switch component

## 0.3.1

### Patch Changes

- bc17ec1: Fix issue where brand colours weren't customisable

## 0.3.0

### Minor Changes

- ee10f17: - Add customisable Brand colour.
  - Refactor Passthrough objects into their own files.

## 0.2.3

### Patch Changes

- ed5f7b5: - Fix styling issue with ForgeChips where the input would have an outline on focus state, making the chips appear like they were outside the input.

## 0.2.2

### Patch Changes

- 6670934: - Fix issue where PrimeVue slots weren't rendering.
  - Fix issue where CancelClass and SubmitClass didn't affect button styling.
  - Fix styling issue where close and maximise icons were too big.

## 0.2.1

### Patch Changes

- 12803a1: - Fix issue with the documentation page where it showed the incorrect tag in the generated code.
  - Fix ForgeChips styling issue where it showed the outline of the input textbox in the container.
  - Fix ForgeChips styling issue where each tag and input would have a bulletpoint before them.

## 0.2.0

### Minor Changes

- d4efc70: - Add Forge Link Component.
  - This utility component allows developers to implement a link to an external site, which incorporates [link](https://getbootstrap.com/docs/5.3/utilities/link/) and [icon-link](https://getbootstrap.com/docs/5.3/helpers/icon-link/) styling from Bootstrap 5.

## 0.1.4

### Patch Changes

- 554a00d: Fix issue where the second layer of the Menu Item Dropdown would appear left of the original dropdown instead of the right.

## 0.1.3

### Patch Changes

- a7213c3: - Fix issue where Modal would take up 100% of the screen height on open.
  - Fix issue where Modal wouldn't expand outwards when maximised.
  - Fix styling issues for Close and Maximise buttons.
  - Fix issue where Modal wouldn't position correctly when setting the position prop to anything other than top, center or bottom.

## 0.1.2

### Patch Changes

- 2a2565c: Update type declaration in package.json

## 0.1.1

### Patch Changes

- 09f15a8: Add types to bundled package

## 0.1.0

### Minor Changes

- 0ac1c6e: Add ForgeChips component
- 6e18be4: Add inline editor component
- 6bf70ec: Add Forge Loader component
- 7c73960: Add Forge Calendar component
- 05683a8: Add Tooltip passthrough options
- d108647: Add pass through options for card
- 18669a4: Add Forge Action Button component.
- 102760e: Add Forge Stat Widget Component
- acee5a1: Add Forge Checkbox component and passthrough options.
- 26c1f78: Add TabView and TabPanel passthrough options
- 80ce5f9: Add ForgeStepper Component
- 1a8c850: Add Forge Tile component
- b741405: Add Forge Multiselect Preview component
- a562bfb: Remove ForgeToast and style PrimeVue implementation
- 4a7ad84: Add Text Area pass through options
- bd4c18b: Add ForgeModal component
- 1e4d938: Add passthrough styling for the Dropdown component.
- 7c33e57: Add panel overlay passthrough options
- fb7592c: Add Badge pass through options
- a17f181: Update button config so that it is more comprehensive, allowing for the consumer to use a variety of different states and features which are documented in the PrimeVue documentation.
- 10fad22: Add Forge Table component and documentation. Fixed various inconsistencies across UI components and documentation pages. Fixed styling issues in Forge Playground.
- 1e5864a: Add passthrough object to style button
- b6ab00a: Add Forge Form Field component
- c43b9bb: Add Page Header component.
- 44ddf25: Add Forge Multiselect Component
- 01fb975: Add new Forge Toast component
- db0e596: Add ForgeFileUploader and documentation page.
- d743506: Add Passthrough options for InputText
- 9b1a21e: Add Forge Form component
- 32107af: Add ForgeProgressBar component and add passthrough options
- 06bd31e: Add Remaining Characters component.
- 781f537: Add ForgeAlert component
- e2712cd: Add Forge Navbar component
- 3111e35: Add various enchancements to components
- 2a5bdd8: Add Select Button passthrough options
