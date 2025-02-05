import { SelectButtonPassThroughMethodOptions } from "primevue/selectbutton";

export default {
  selectButton: {
    root: () => ({
      class: ['btn-group']
    }),
  },
  toggleButton: {
    
    root: (options: any) => (
      console.log(options),
      {
      class: [
        'btn',
        {
          'btn-primary': options.context.active,
          'btn-outline-primary': !options.context.active
        },
      ]
    }),
  }
}