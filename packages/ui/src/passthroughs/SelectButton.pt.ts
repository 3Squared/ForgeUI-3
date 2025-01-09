import { SelectButtonPassThroughMethodOptions } from "primevue/selectbutton";

export default {
  selectButton: {
    root: () => ({
      class: ['btn-group']
    }),
  },
  toggleButton: {
    root: ({ context }: SelectButtonPassThroughMethodOptions) => ({
      class: [
        'btn',
        {
          'btn-primary': context.active,
          'btn-outline-primary': !context.active
        },
      ]
    }),
  }
}