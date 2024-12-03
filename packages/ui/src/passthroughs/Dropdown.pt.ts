import { SelectPassThroughMethodOptions } from "primevue/select";

export default {
  select: {
    root: ({ props }: SelectPassThroughMethodOptions<any>) => {
      
      return {
        class: [
          'form-control d-flex cursor-pointer position-relative',
          {
            'disabled': props.disabled
          }
        ]
      }

    },
    dropdown: ({ state } : SelectPassThroughMethodOptions<any>) => {

      return {
        class: [
          'my-auto filter-trigger',
          {
            'rotate-180': state.overlayVisible
          }
        ] 
      }

    },
    list: 'list-unstyled mb-0 dropdown-menu overflow-y-auto show w-100',
    item: ({ context } : SelectPassThroughMethodOptions<any>) => ({
      class: [
        'dropdown-item d-flex cursor-pointer text-wrap',
        {
          'bg-primary text-white': context.selected
        }
      ]
    }),
    header: "d-flex border-bottom pb-2",
    headercheckboxcontainer: 'form-check ms-2 mt-2',
    headercheckbox: (options: any) => ({
      class: [
        'form-check-input px-2 py-2 rounded position-relative',
        {
          'bg-primary': options.instance.allSelected
        }
      ]
    }),
    headercheckboxicon: 'mb-1 fw-medium text-white position-absolute filter-header-multiselect__check-icon',
    pcFilterContainer: 'd-flex position-relative mt-1 ps-2 w-100',
    pcFilter: 'form-control w-100',
    filtericon: {
      class: ['position-absolute bottom-0 end-0 me-3'],
      style: "top: 35%;"
    },
    closebutton: 'btn',
    checkbox: (options: SelectPassThroughMethodOptions<any>) => ({
      class: [
        'form-check-input px-2 py-2 rounded position-relative',
        {
          'bg-primary': options.context.selected,
          'form-check-input__focus': options.state.focused,
        }
      ]
    }),
    checkboxicon: 'mb-1 fw-medium text-white position-absolute filter-header-multiselect__check-icon',
    clearicon: "ms-auto my-auto",
    loadingIcon: 'spinner-border spinner-border-sm border-0',
    itemGroupLabel: "ps-2 fw-bold",
    label: ({ instance } : SelectPassThroughMethodOptions<any>) => ({
      class: [
        'w-100',
        {
          'filter-placeholder': instance.modelValue === undefined
        }
      ]
    })
  }
}
