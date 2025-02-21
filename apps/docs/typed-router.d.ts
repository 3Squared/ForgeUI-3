/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-router. ‼️ DO NOT MODIFY THIS FILE ‼️
// It's recommended to commit this file.
// Make sure to add this file to your tsconfig.json file as an "includes" or "files" entry.

declare module 'vue-router/auto-routes' {
  import type {
    RouteRecordInfo,
    ParamValue,
    ParamValueOneOrMore,
    ParamValueZeroOrMore,
    ParamValueZeroOrOne,
  } from 'vue-router'

  /**
   * Route name map generated by unplugin-vue-router
   */
  export interface RouteNamedMap {
    '/': RouteRecordInfo<'/', '/', Record<never, never>, Record<never, never>>,
    '/buttons/ActionButton': RouteRecordInfo<'/buttons/ActionButton', '/buttons/ActionButton', Record<never, never>, Record<never, never>>,
    '/buttons/Button': RouteRecordInfo<'/buttons/Button', '/buttons/Button', Record<never, never>, Record<never, never>>,
    '/buttons/ButtonGroup': RouteRecordInfo<'/buttons/ButtonGroup', '/buttons/ButtonGroup', Record<never, never>, Record<never, never>>,
    '/buttons/Link': RouteRecordInfo<'/buttons/Link', '/buttons/Link', Record<never, never>, Record<never, never>>,
    '/buttons/SelectButton': RouteRecordInfo<'/buttons/SelectButton', '/buttons/SelectButton', Record<never, never>, Record<never, never>>,
    '/buttons/SplitButton': RouteRecordInfo<'/buttons/SplitButton', '/buttons/SplitButton', Record<never, never>, Record<never, never>>,
    '/buttons/ToggleButton': RouteRecordInfo<'/buttons/ToggleButton', '/buttons/ToggleButton', Record<never, never>, Record<never, never>>,
    '/Changelog': RouteRecordInfo<'/Changelog', '/Changelog', Record<never, never>, Record<never, never>>,
    '/Colours': RouteRecordInfo<'/Colours', '/Colours', Record<never, never>, Record<never, never>>,
    '/data/Chart': RouteRecordInfo<'/data/Chart', '/data/Chart', Record<never, never>, Record<never, never>>,
    '/data/DataView': RouteRecordInfo<'/data/DataView', '/data/DataView', Record<never, never>, Record<never, never>>,
    '/data/Progress': RouteRecordInfo<'/data/Progress', '/data/Progress', Record<never, never>, Record<never, never>>,
    '/data/StatWidget': RouteRecordInfo<'/data/StatWidget', '/data/StatWidget', Record<never, never>, Record<never, never>>,
    '/data/Table': RouteRecordInfo<'/data/Table', '/data/Table', Record<never, never>, Record<never, never>>,
    '/data/Tile': RouteRecordInfo<'/data/Tile', '/data/Tile', Record<never, never>, Record<never, never>>,
    '/data/Tree': RouteRecordInfo<'/data/Tree', '/data/Tree', Record<never, never>, Record<never, never>>,
    '/examples/CodeTesting': RouteRecordInfo<'/examples/CodeTesting', '/examples/CodeTesting', Record<never, never>, Record<never, never>>,
    '/examples/components/ExampleAutoComplete': RouteRecordInfo<'/examples/components/ExampleAutoComplete', '/examples/components/ExampleAutoComplete', Record<never, never>, Record<never, never>>,
    '/examples/components/ExampleButton': RouteRecordInfo<'/examples/components/ExampleButton', '/examples/components/ExampleButton', Record<never, never>, Record<never, never>>,
    '/examples/components/ExampleConfirmDialogue': RouteRecordInfo<'/examples/components/ExampleConfirmDialogue', '/examples/components/ExampleConfirmDialogue', Record<never, never>, Record<never, never>>,
    '/examples/components/ExampleDataView': RouteRecordInfo<'/examples/components/ExampleDataView', '/examples/components/ExampleDataView', Record<never, never>, Record<never, never>>,
    '/examples/components/ExampleDrawer': RouteRecordInfo<'/examples/components/ExampleDrawer', '/examples/components/ExampleDrawer', Record<never, never>, Record<never, never>>,
    '/examples/components/ExampleFileUploader': RouteRecordInfo<'/examples/components/ExampleFileUploader', '/examples/components/ExampleFileUploader', Record<never, never>, Record<never, never>>,
    '/examples/components/ExampleModal': RouteRecordInfo<'/examples/components/ExampleModal', '/examples/components/ExampleModal', Record<never, never>, Record<never, never>>,
    '/examples/components/ExampleNavBar': RouteRecordInfo<'/examples/components/ExampleNavBar', '/examples/components/ExampleNavBar', Record<never, never>, Record<never, never>>,
    '/examples/components/ExampleScratchpad': RouteRecordInfo<'/examples/components/ExampleScratchpad', '/examples/components/ExampleScratchpad', Record<never, never>, Record<never, never>>,
    '/examples/components/ExampleSelectBool': RouteRecordInfo<'/examples/components/ExampleSelectBool', '/examples/components/ExampleSelectBool', Record<never, never>, Record<never, never>>,
    '/examples/components/ExampleTableExapandableGroup': RouteRecordInfo<'/examples/components/ExampleTableExapandableGroup', '/examples/components/ExampleTableExapandableGroup', Record<never, never>, Record<never, never>>,
    '/examples/components/ExampleTableGroup': RouteRecordInfo<'/examples/components/ExampleTableGroup', '/examples/components/ExampleTableGroup', Record<never, never>, Record<never, never>>,
    '/examples/components/FormExamples': RouteRecordInfo<'/examples/components/FormExamples', '/examples/components/FormExamples', Record<never, never>, Record<never, never>>,
    '/forms/Checkbox': RouteRecordInfo<'/forms/Checkbox', '/forms/Checkbox', Record<never, never>, Record<never, never>>,
    '/forms/Datepicker': RouteRecordInfo<'/forms/Datepicker', '/forms/Datepicker', Record<never, never>, Record<never, never>>,
    '/forms/dropdowns/Dropdown': RouteRecordInfo<'/forms/dropdowns/Dropdown', '/forms/dropdowns/Dropdown', Record<never, never>, Record<never, never>>,
    '/forms/dropdowns/Multiselect': RouteRecordInfo<'/forms/dropdowns/Multiselect', '/forms/dropdowns/Multiselect', Record<never, never>, Record<never, never>>,
    '/forms/dropdowns/MultiselectPreview': RouteRecordInfo<'/forms/dropdowns/MultiselectPreview', '/forms/dropdowns/MultiselectPreview', Record<never, never>, Record<never, never>>,
    '/forms/dropdowns/TreeSelect': RouteRecordInfo<'/forms/dropdowns/TreeSelect', '/forms/dropdowns/TreeSelect', Record<never, never>, Record<never, never>>,
    '/forms/FileUploader': RouteRecordInfo<'/forms/FileUploader', '/forms/FileUploader', Record<never, never>, Record<never, never>>,
    '/forms/Form': RouteRecordInfo<'/forms/Form', '/forms/Form', Record<never, never>, Record<never, never>>,
    '/forms/inputs/AutoComplete': RouteRecordInfo<'/forms/inputs/AutoComplete', '/forms/inputs/AutoComplete', Record<never, never>, Record<never, never>>,
    '/forms/inputs/Chips': RouteRecordInfo<'/forms/inputs/Chips', '/forms/inputs/Chips', Record<never, never>, Record<never, never>>,
    '/forms/inputs/FormField': RouteRecordInfo<'/forms/inputs/FormField', '/forms/inputs/FormField', Record<never, never>, Record<never, never>>,
    '/forms/inputs/InlineEditor': RouteRecordInfo<'/forms/inputs/InlineEditor', '/forms/inputs/InlineEditor', Record<never, never>, Record<never, never>>,
    '/forms/inputs/Mask': RouteRecordInfo<'/forms/inputs/Mask', '/forms/inputs/Mask', Record<never, never>, Record<never, never>>,
    '/forms/inputs/Number': RouteRecordInfo<'/forms/inputs/Number', '/forms/inputs/Number', Record<never, never>, Record<never, never>>,
    '/forms/inputs/Text': RouteRecordInfo<'/forms/inputs/Text', '/forms/inputs/Text', Record<never, never>, Record<never, never>>,
    '/forms/inputs/TextArea': RouteRecordInfo<'/forms/inputs/TextArea', '/forms/inputs/TextArea', Record<never, never>, Record<never, never>>,
    '/forms/RemainingCharacters': RouteRecordInfo<'/forms/RemainingCharacters', '/forms/RemainingCharacters', Record<never, never>, Record<never, never>>,
    '/forms/Scratchpad': RouteRecordInfo<'/forms/Scratchpad', '/forms/Scratchpad', Record<never, never>, Record<never, never>>,
    '/forms/Switch': RouteRecordInfo<'/forms/Switch', '/forms/Switch', Record<never, never>, Record<never, never>>,
    '/guides/ForgeResolver': RouteRecordInfo<'/guides/ForgeResolver', '/guides/ForgeResolver', Record<never, never>, Record<never, never>>,
    '/guides/Installation': RouteRecordInfo<'/guides/Installation', '/guides/Installation', Record<never, never>, Record<never, never>>,
    '/Icons': RouteRecordInfo<'/Icons', '/Icons', Record<never, never>, Record<never, never>>,
    '/layout/Accordion': RouteRecordInfo<'/layout/Accordion', '/layout/Accordion', Record<never, never>, Record<never, never>>,
    '/layout/Alert': RouteRecordInfo<'/layout/Alert', '/layout/Alert', Record<never, never>, Record<never, never>>,
    '/layout/Fieldset': RouteRecordInfo<'/layout/Fieldset', '/layout/Fieldset', Record<never, never>, Record<never, never>>,
    '/layout/Loader': RouteRecordInfo<'/layout/Loader', '/layout/Loader', Record<never, never>, Record<never, never>>,
    '/layout/Navbar': RouteRecordInfo<'/layout/Navbar', '/layout/Navbar', Record<never, never>, Record<never, never>>,
    '/layout/PageHeader': RouteRecordInfo<'/layout/PageHeader', '/layout/PageHeader', Record<never, never>, Record<never, never>>,
    '/layout/Panel': RouteRecordInfo<'/layout/Panel', '/layout/Panel', Record<never, never>, Record<never, never>>,
    '/layout/Stepper': RouteRecordInfo<'/layout/Stepper', '/layout/Stepper', Record<never, never>, Record<never, never>>,
    '/layout/Tabs': RouteRecordInfo<'/layout/Tabs', '/layout/Tabs', Record<never, never>, Record<never, never>>,
    '/misc/Badge': RouteRecordInfo<'/misc/Badge', '/misc/Badge', Record<never, never>, Record<never, never>>,
    '/misc/Tag': RouteRecordInfo<'/misc/Tag', '/misc/Tag', Record<never, never>, Record<never, never>>,
    '/overlay/ConfirmModal': RouteRecordInfo<'/overlay/ConfirmModal', '/overlay/ConfirmModal', Record<never, never>, Record<never, never>>,
    '/overlay/Modal': RouteRecordInfo<'/overlay/Modal', '/overlay/Modal', Record<never, never>, Record<never, never>>,
    '/overlay/Popover': RouteRecordInfo<'/overlay/Popover', '/overlay/Popover', Record<never, never>, Record<never, never>>,
    '/overlay/Toast': RouteRecordInfo<'/overlay/Toast', '/overlay/Toast', Record<never, never>, Record<never, never>>,
    '/overlay/Tooltip': RouteRecordInfo<'/overlay/Tooltip', '/overlay/Tooltip', Record<never, never>, Record<never, never>>,
  }
}
