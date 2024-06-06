import { SelectButtonPassThroughMethodOptions } from "primevue/selectbutton";

export default {
  selectbutton: {
    root: () => ({
      class: ['btn-group']
    }),
    button: ({ context, props, }: SelectButtonPassThroughMethodOptions) => ({
      class: [
        'btn',
        {
          'btn-primary': context.active,
          'btn-outline-primary': !context.active
        },
        {
          'disabled w-auto': props.disabled || props.optionDisabled === context.option
        }
      ]
    })
    
  }
}