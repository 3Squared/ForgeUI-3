import { PrimeVuePTOptions } from "primevue/config";
import ButtonPT from "./passthroughs/Button.pt.ts";
import CheckboxPT from "./passthroughs/Checkbox.pt.ts";
import DropdownPT from "./passthroughs/Dropdown.pt.ts";
import ColumnPT from "./passthroughs/Column.pt.ts";
import InputPT from "./passthroughs/Input.pt.ts";
import InputMaskPT from "./passthroughs/InputMask.pt.ts";
import TextAreaPT from "./passthroughs/TextArea.pt.ts";
import ChipsPT from "./passthroughs/Chips.pt.ts";
import DialogPT from "./passthroughs/Dialog.pt.ts";
import OverlayPanelPT from "./passthroughs/OverlayPanel.pt.ts";
import MessagePT from "./passthroughs/Message.pt.ts";
import StepsPT from "./passthroughs/Steps.pt.ts";
import TabsPT from "./passthroughs/Tabs.pt.ts";
import DatepickerPT from "./passthroughs/Datepicker.pt.ts";
import MultiselectPT from "./passthroughs/Dropdown.pt.ts";
import ProgressBarPT from "./passthroughs/ProgressBar.pt.ts";
import TablePT from "./passthroughs/Table.pt.ts";
import BadgePT from "./passthroughs/Badge.pt.ts";
import NavbarPT from "./passthroughs/Navbar.pt.ts";
import TooltipPT from "./passthroughs/Tooltip.pt.ts";
import SelectButtonPT from "./passthroughs/SelectButton.pt.ts";
import ProgressSpinnerPT from "./passthroughs/ProgressSpinner.pt.ts";
import CardPT from "./passthroughs/Card.pt.ts";
import DividerPT from "./passthroughs/Divider.pt.ts";
import ImagePT from "./passthroughs/Image.pt.ts";
import ToastPT from "./passthroughs/Toast.pt.ts";

export default {
  ...BadgePT,
  ...ButtonPT,
  ...CardPT,
  ...CheckboxPT,
  ...ChipsPT, 
  ...ColumnPT,
  ...DatepickerPT,
  ...DialogPT,
  ...DividerPT,
  ...DropdownPT,
  ...ImagePT,
  ...InputPT,
  ...InputMaskPT,
  ...MessagePT,
  ...MultiselectPT,
  ...NavbarPT,
  ...OverlayPanelPT,
  ...ProgressBarPT,
  ...ProgressSpinnerPT,
  ...SelectButtonPT,
  ...StepsPT,
  ...TablePT,
  ...TabsPT, 
  ...ToastPT,
  ...TextAreaPT,
  directives: {
    ...TooltipPT
  }
} as PrimeVuePTOptions
