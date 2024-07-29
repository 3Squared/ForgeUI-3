import { DropdownPassThroughMethodOptions } from "primevue/dropdown";

export default {
  dropdown: {
    root: ({ props }: DropdownPassThroughMethodOptions<any>) => ({
      class: [
        'form-control d-flex cursor-pointer',
        {
          'disabled': props.disabled
        }
      ]
    }),
    trigger: (options : DropdownPassThroughMethodOptions<any>) => ({
      class: [
        'my-auto',
        {
          'ms-auto' : !options.props.showClear,
          'ms-2': options.props.showClear
        }
      ]
    }),
    list: 'list-unstyled mb-0 dropdown-menu show w-100',
    item: ({ context } : DropdownPassThroughMethodOptions<any>) => ({
      class: [
        'dropdown-item d-flex cursor-pointer',
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
    filtercontainer: 'd-flex position-relative mt-1 ps-2 w-100',
    filterinput: 'form-control w-100',
    filtericon: {
      class: ['position-absolute bottom-0 end-0 me-3'],
      style: "top: 35%;"
    },
    closebutton: 'btn',
    checkbox: (options: DropdownPassThroughMethodOptions<any>) => ({
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
    input: 'w-100'
  }
}
