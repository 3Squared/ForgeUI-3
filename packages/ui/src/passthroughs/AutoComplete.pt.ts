import { AutoCompletePassThroughMethodOptions } from "primevue/autocomplete";

export default {
  autoComplete: {
    root: ({ props }: AutoCompletePassThroughMethodOptions) => {
      return {
        class: [
          'd-flex form-control p-0',
          {
            'disabled': props.disabled
          }
        ]
      }
    },
    chipItem: 'mt-1 ms-1 mb-1',
    pcInputText: 'form-control',
    overlay: 'dropdown-menu overflow-y-auto show',
    list: ({ props }: AutoCompletePassThroughMethodOptions) => ({
      class: [ 'list-unstyled mb-0 overflow-y-auto'],
      style: "max-height:" + (props.scrollHeight ? props.scrollHeight : "200px")
    }),
    inputMultiple: "list-unstyled d-flex align-items-center w-100 mb-0 flex-wrap",
    option: ({ context }: AutoCompletePassThroughMethodOptions) => ({
      class: [
        'dropdown-item d-flex cursor-pointer text-wrap',
        {
          'bg-primary text-white': context.selected,
          'bg-secondary-subtle': context.focused
        }
      ],
    }),
    emptyMessage: 'mx-3 my-2',
  }
}