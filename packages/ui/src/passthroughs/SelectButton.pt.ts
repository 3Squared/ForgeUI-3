import { ToggleButtonPassThroughMethodOptions } from "primevue/togglebutton";

export default {
  selectButton: {
    root: () => ({
      class: ['btn-group']
    }),
  },
  toggleButton: {
    root: (options: ToggleButtonPassThroughMethodOptions) => ({
      class: [
        'btn',
        {
          'btn-primary': options.context.active,
          'border-danger': options.parent.props.invalid,
          'btn-outline-primary': !options.context.active
        },
      ]
    }),
  }
}