import { SplitButtonPassThroughMethodOptions } from "primevue/splitbutton";

export default {
  splitbutton: {
    root: () => ({
      class: ['btn-group']
    }),
    pcDropdown: {
      root: ({ props }: SplitButtonPassThroughMethodOptions) => ({
        class: [
          'btn dropdown-toggle-split', 
          {
            "btn-primary": (props.severity === undefined || props.severity === 'primary' || props.severity === null)&& !props.outlined,
            "btn-brand": props.severity === 'brand' && !props.outlined,
            "btn-secondary": props.severity === 'secondary'&& !props.outlined,
            "btn-success": props.severity === 'success'&& !props.outlined,
            "btn-warning": (props.severity === 'warning' || props.severity === 'warn')&& !props.outlined,
            "btn-danger": props.severity === 'danger'&& !props.outlined,
            'btn-info': props.severity === 'info'&& !props.outlined
          },
          {
            "btn-outline-primary ": (props.severity === undefined || props.severity === 'primary' || props.severity === null) && props.outlined,
            "btn-outline-brand": props.severity === 'brand' && props.outlined,
            "btn-outline-secondary": props.severity === 'secondary' && props.outlined,
            "btn-outline-success": props.severity === 'success' && props.outlined,
            "btn-outline-warning": (props.severity === 'warning' || props.severity === 'warn') && props.outlined,
            "btn-outline-danger": props.severity === 'danger' && props.outlined,
            'btn-outline-info': props.severity === 'info' && props.outlined
          }
        ]
      })
    },
    pcMenu: {
      rootList: 'dropdown-menu show w-100',
      item: 'dropdown-item',
      separator: 'border-bottom w-100'
    }
  }
}