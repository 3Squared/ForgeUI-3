import { MessagePassThroughMethodOptions } from "primevue/message";

export default {
  message: {
    root: ({ props }: MessagePassThroughMethodOptions) => ({
      class: [
        'alert',
        {
          'alert-primary': props.severity === 'primary' || props.severity === undefined,
          'alert-brand': props.severity === 'brand',
          'alert-secondary': props.severity === 'secondary',
          'alert-success': props.severity === 'success',
          'alert-success-alternate': props.severity === 'success-alternate',
          'alert-warning': props.severity === 'warning' || props.severity === 'warn',
          'alert-danger': props.severity === 'danger' || props.severity === 'error',
          'alert-info': props.severity === 'info'
        }
      ]
    }),
    text: () => ({
      class: ['my-auto']
    }),
    content: () => ({
      class: ['d-flex']
    }),
    icon: () => ({
      class: ['alert-icon my-auto me-2 pe-1']
    }),
    closeButton: () => ({
      class: ['px-0 ms-2 btn d-flex']
    })
  }
}