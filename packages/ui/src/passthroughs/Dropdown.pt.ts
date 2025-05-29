import { SelectPassThroughMethodOptions } from "primevue/select";

export default {
  select: {
    root: ({ props }: SelectPassThroughMethodOptions<any>) => {
      return {
        class: [
          'form-select flex-1 d-flex cursor-pointer position-relative',
          {
            'disabled': props.disabled
          }
        ]
      }
    },
    dropdown: () => {
      return {
        class: [
          'd-none my-auto filter-trigger'
        ],
      }
    },
    list: ({ props }: SelectPassThroughMethodOptions<any>) => ({
      class: ['list-unstyled mb-0 overflow-y-auto'],
      style: "max-height:" + (props.scrollHeight ? props.scrollHeight : "200px")
    }),
    option: ({ context }: SelectPassThroughMethodOptions<any>) => ({
      class: [
        'dropdown-item d-flex cursor-pointer text-wrap',
        {
          'bg-primary text-white': context.selected
        }
      ],
    }),
    overlay: 'dropdown-menu overflow-y-auto show',
    header: 'p-2 w-100',
    pcFilter: 'form-control w-100',
    pcFilterIconContainer: {
      root: {
        class: ['position-absolute bottom-0 end-0 me-3'],
        style: "top: 8%;"
      }
    },
    clearIcon: "ms-auto my-auto",
    loadingIcon: 'spinner-border spinner-border-sm border-0',
    optionGroupLabel: "ps-2 fw-bold",
    emptyMessage: 'mx-3 my-2',
    filterIcon: "d-none",
    label: ({ instance }: SelectPassThroughMethodOptions<any>) => ({
      class: [
        'w-100 ellipsis-overflow',
        {
          'filter-placeholder': instance.modelValue === undefined
        }
      ]
    }),
  },
}
