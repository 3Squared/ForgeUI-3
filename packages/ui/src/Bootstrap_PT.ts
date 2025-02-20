import { PrimeVuePTOptions } from "primevue/config";
import AutoCompletePT from "./passthroughs/AutoComplete.pt.ts";
import ButtonPT from "./passthroughs/Button.pt.ts";
import CheckboxPT from "./passthroughs/Checkbox.pt.ts";
import DropdownPT from "./passthroughs/Dropdown.pt.ts";
import ColumnPT from "./passthroughs/Column.pt.ts";
import InputPT from "./passthroughs/Input.pt.ts";
import InputMaskPT from "./passthroughs/InputMask.pt.ts";
import InputSwitchPT from "./passthroughs/InputSwitch.pt.ts";
import TagPT from "./passthroughs/Tag.pt.ts";
import TextAreaPT from "./passthroughs/TextArea.pt.ts";
import ChipPT from "./passthroughs/Chip.pt.ts";
import DialogPT from "./passthroughs/Dialog.pt.ts";
import PopoverPT from "./passthroughs/Popover.pt.ts";
import MessagePT from "./passthroughs/Message.pt.ts";
import StepsPT from "./passthroughs/Steps.pt.ts";
import TabsPT from "./passthroughs/Tabs.pt.ts";
import DatepickerPT from "./passthroughs/Datepicker.pt.ts";
import MultiselectPT from "./passthroughs/Multiselect.pt.ts";
import ProgressBarPT from "./passthroughs/ProgressBar.pt.ts";
import PanelPT from "./passthroughs/Panel.pt.ts";
import TablePT from "./passthroughs/Table.pt.ts";
import BadgePT from "./passthroughs/Badge.pt.ts";
import NavbarPT from "./passthroughs/Navbar.pt.ts";
import TooltipPT from "./passthroughs/Tooltip.pt.ts";
import SelectButtonPT from "./passthroughs/SelectButton.pt.ts";
import SplitButtonPT from "./passthroughs/SplitButton.pt.ts";
import ProgressSpinnerPT from "./passthroughs/ProgressSpinner.pt.ts";
import CardPT from "./passthroughs/Card.pt.ts";
import DividerPT from "./passthroughs/Divider.pt.ts";
import ImagePT from "./passthroughs/Image.pt.ts";
import ToastPT from "./passthroughs/Toast.pt.ts";
import TreePT from "./passthroughs/Tree.pt.ts";
import TreeSelectPT from "./passthroughs/TreeSelect.pt.ts";
import FieldsetPt from "./passthroughs/Fieldset.pt.ts";
import AccordionPT from "./passthroughs/Accordion.pt.ts";
import TreeTable from "./passthroughs/TreeTable.pt.ts";

export default {
  ...AutoCompletePT,
  ...BadgePT,
  ...ButtonPT,
  ...CardPT,
  ...CheckboxPT,
  ...ChipPT,
  ...ColumnPT,
  ...DatepickerPT,
  ...DialogPT,
  ...DividerPT,
  ...DropdownPT,
  ...ImagePT,
  ...InputPT,
  ...InputMaskPT,
  ...InputSwitchPT,
  ...MessagePT,
  ...MultiselectPT,
  ...NavbarPT,
  ...PopoverPT,
  ...ProgressBarPT,
  ...ProgressSpinnerPT,
  ...PanelPT,
  ...SelectButtonPT,
  ...SplitButtonPT,
  ...StepsPT,
  ...TablePT,
  ...TagPT,
  ...TabsPT, 
  ...ToastPT,
  ...TextAreaPT,
  ...FieldsetPt,
  ...TreeSelectPT,
  ...TreePT,
  ...AccordionPT,
 ...TreeTable,
  directives: {
    ...TooltipPT
  }
} as PrimeVuePTOptions
