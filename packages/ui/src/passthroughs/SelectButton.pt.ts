export default {
  selectButton: {
    root: () => ({
      class: ['btn-group']
    }),
  },
  toggleButton: {
    root: (options: any) => ({
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