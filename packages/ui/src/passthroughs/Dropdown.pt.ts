import { DropdownPassThroughMethodOptions } from "primevue/dropdown";

export default {
  dropdown: {
    root: ({ instance, state } : DropdownPassThroughMethodOptions<any>) => ({
      class: [
        {
          "rounded-0 rounded-top": state.overlayVisible,
          "disabled": instance.disabled,
          'form-control': !instance.disabled
        },
        'd-flex cursor-pointer w-100']
    }),
    input: () => ({
      class: ['fs-6 border-0']
    }),
    trigger: ({ props } : DropdownPassThroughMethodOptions<any>) => ({
      class: {
        'ms-2': props.showClear,
        'ms-auto': !props.showClear || !props.modelValue
      }
    }),
    loadingIcon: () => ({
      class: ['spinner-border spinner-border-sm border-0']
    }),
    clearIcon: () => ({
      class: ['ms-auto my-auto']
    }),
    list: () => ({
      class: ['border list-unstyled rounded-bottom bg-white']
    }),
    item: ({ context } :DropdownPassThroughMethodOptions<any>) => ({
      class: [
        'px-2 py-1 cursor-pointer item',
        {
          'bg-primary text-white': context.selected
        }
      ]
    }),
    itemGroup: () => ({
      class: ['d-flex px-2 py-1 fw-bold']
    }),
    filterContainer: () => ({
      class: ['d-flex border-start border-end p-2 bg-light']
    }),
    filterIcon: () => ({
      class: ['my-auto ms-3 me-2']
    }),
    filterInput: () => ({
      class: ['form-control']
    }),
  }
}