import { SelectPassThroughMethodOptions } from "primevue/select";

export default {
  select: {
    root: ({ props }: SelectPassThroughMethodOptions<any>) => {
      
      return {
        class: [
          'form-select d-flex cursor-pointer position-relative',
          {
            'disabled': props.disabled
          }
        ]
      }

    },
    dropdown: ({ state } : SelectPassThroughMethodOptions<any>) => {

      return {
        class: [
          'd-none my-auto filter-trigger',
          {
            'rotate-180': state.overlayVisible
          }
        ]
      }
    },
    list: ({ props }: DropdownPassThroughMethodOptions<any>) => ({ 
      class: [ 'list-unstyled mb-0 overflow-y-auto'],
      style: "max-height:" + (props.scrollHeight ? props.scrollHeight : "200px")
    }),
    option: ({ context }: DropdownPassThroughMethodOptions<any>) => ({
      class: [
        'dropdown-item d-flex cursor-pointer text-wrap',
        {
          'bg-primary text-white': context.selected
        }
      ]
    }),
    panel: 'dropdown-menu overflow-y-auto show',
    filterContainer: 'd-flex position-relative p-2 w-100',
    filterInput: 'form-control w-100',
    filterIcon: {
      class: ['position-absolute bottom-0 end-0 me-3'],
      style: "top: 35%;"
    },
    clearIcon: "ms-auto my-auto",
    loadingIcon: 'spinner-border spinner-border-sm border-0',
    itemGroupLabel: "ps-2 fw-bold",
    emptyMessage: 'mx-3 my-2',
    input: ({ instance }: DropdownPassThroughMethodOptions<any>) => ({
      class: [
        'w-100',
        {
          'filter-placeholder': instance.modelValue === undefined
        }
      ]
    })
  }
}
