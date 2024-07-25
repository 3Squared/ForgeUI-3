# @3squared/forge-ui-3

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
