import Bootstrap_PT from "./src/Bootstrap_PT"
import '@/styles/main.scss'
import type { ComponentResolver, ComponentResolveResult } from 'unplugin-vue-components/types';

import ForgeAlert from "@/components/ForgeAlert.vue";
import ForgeActionButton from "./src/components/ForgeActionButton.vue";
import ForgeAutoComplete from "./src/components/ForgeAutoComplete.vue";
import ForgeCheckbox from "@/components/ForgeCheckbox.vue";
import ForgeLoader from "@/components/ForgeLoader.vue";
import ForgeLink from "./src/components/ForgeLink.vue";
import ForgeModal from "./src/components/ForgeModal.vue";
import ForgeInlineEditor from "./src/components/ForgeInlineEditor.vue";
import ForgeNavbar from "./src/components/ForgeNavbar.vue";
import ForgeMultiSelectPreview from './src/components/ForgeMultiSelectPreview.vue'
import ForgePageHeader from "./src/components/ForgePageHeader.vue";
import ForgeDatepicker from "./src/components/ForgeDatepicker.vue";
import ForgeRemainingCharacters from "./src/components/ForgeRemainingCharacters.vue";
import ForgeForm from "./src/components/ForgeForm.vue";
import ForgeFormField from "./src/components/ForgeFormField.vue";
import ForgeChip from "./src/components/ForgeChip.vue";
import ForgeProgressBar from "./src/components/ForgeProgressBar.vue";
import ForgeScratchpad from "./src/components/ForgeScratchpad.vue";
import ForgeStatWidget from "./src/components/ForgeStatWidget.vue";
import ForgeStepper from "./src/components/ForgeStepper.vue";
import ForgeTile from "./src/components/ForgeTile.vue";
import ForgeTable from "./src/components/table/ForgeTable.vue";
import ForgeTreeTable from "./src/components/ForgeTreeTable.vue"; 
import ForgeFilterHeader from "./src/components/table/ForgeFilterHeader.vue";
import ForgeFileUploader from "./src/components/file-uploader/ForgeFileUploader.vue";
import ForgeColumnCustomiser from './src/components/table/ForgeColumnCustomiser.vue'
import ForgePanel from './src/components/ForgePanel.vue'
import ForgeSelectButton from './src/components/ForgeSelectButton.vue'
import ForgeToggleButton from './src/components/ForgeToggleButton.vue'

export {
  Bootstrap_PT,
  ForgeActionButton,
  ForgeAlert,
  ForgeAutoComplete,
  ForgeCheckbox,
  ForgeChip,
  ForgeColumnCustomiser,
  ForgeDatepicker,
  ForgeForm,
  ForgeFormField,
  ForgeInlineEditor,
  ForgeLink,
  ForgeLoader,
  ForgeModal,
  ForgeMultiSelectPreview,
  ForgeNavbar,
  ForgePageHeader,
  ForgeRemainingCharacters,
  ForgeProgressBar,
  ForgeScratchpad,
  ForgeStatWidget,
  ForgeStepper,
  ForgeTile,
  ForgeTable,
  ForgeFilterHeader,
  ForgeFileUploader,
  ForgePanel,
  ForgeSelectButton,
  ForgeToggleButton,
  ForgeTreeTable
}

export * from './src/types/forge-types.ts'
export * from "./src/helpers/index";

export const ForgeResolver = (): ComponentResolver => {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (!name.startsWith('Forge')) return;

      return {
        from: `@3squared/forge-ui-3`,
        name: name
      } as ComponentResolveResult;
    }
  };
}

