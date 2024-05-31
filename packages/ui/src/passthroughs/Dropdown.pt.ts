import { DropdownPassThroughMethodOptions } from "primevue/dropdown";

export default {
  dropdown: {
    root: {
      class: ['form-control d-flex cursor-pointer']
    },
    trigger: {
      class: ['ms-auto']
    },
    panel: {
      class: ['border rounded-bottom bg-white']
    },
    list: {
      class: ['p-2 mb-0 list-unstyled']
    },
    item: {
      class: ['dropdown-item d-flex']
    },
    header: {
      class: "d-flex border-bottom pb-2"
    },
    headercheckboxcontainer: {
      class: ['form-check ms-2 mt-2']
    },
    headercheckbox: (options: any) => {
      return {
        class: [
          'form-check-input px-2 py-2 rounded position-relative',
          {
            'bg-primary': options.instance.allSelected
          }
        ]
      }
    },
    headercheckboxicon: {
      class: 'mb-1 fw-medium text-white position-absolute filter-header-multiselect__check-icon'
    },
    filtercontainer: {
      class: ['d-flex position-relative mt-1 ps-2']
    },
    filterinput: {
      class: ['form-control']
    },
    filtericon: {
      class: ['position-absolute bottom-0 end-0'],
      style: "top: 35%; left: 87%;"
    },
    closebutton: {
      class: 'btn'
    },
    checkbox: (options: DropdownPassThroughMethodOptions<any>) => {
      return {
        class: [
          'form-check-input px-2 py-2 rounded position-relative',
          {
            'bg-primary': options.context.selected,
            'form-check-input__focus': options.state.focused,
          }
        ]
      }
    },
    checkboxicon: {
      class: 'mb-1 fw-medium text-white position-absolute filter-header-multiselect__check-icon'
    }
    
  }
}