export default {
  // More PassThrough options in component file.
  progressbar: {
    root: () => ({
      class: ['progress']
    }),
    value: () => ({
      class: ['progress-bar']
    }),
    label: () => ({
      class: ['text-white']
    })
  }
}