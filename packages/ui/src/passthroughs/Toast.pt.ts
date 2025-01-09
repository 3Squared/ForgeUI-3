import { ToastPassThroughMethodOptions } from "primevue/toast";

export default {
  toast: {
    message: () => ({
      class: ['toast-container w-100 position-relative'],
    }),
    messageContent: () => ({
      class: ['toast bg-white show overflow-hidden text-break toast-body d-flex align-items-center gap-2']
    }),
    buttonContainer: () => ({
      class: ['ms-auto']
    }),
    closeButton: () => ({
      class: ['btn-close toast-close-icon']
    }),
    closeIcon: () => ({
      class: 'd-none'
    }),
    messageText: () => ({
      class: ['ps-1']
    }),
    messageIcon: ({ props } : ToastPassThroughMethodOptions) => ({
      class: [
        'toast-icon',
        {
          'text-primary': props.message?.severity === 'info',
          'text-success': props.message?.severity === 'success',
          'text-danger': props.message?.severity === 'error',
          'text-warning': props.message?.severity === 'warn',
        }
      ]
    }),
  }
}