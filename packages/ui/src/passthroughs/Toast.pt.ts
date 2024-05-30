import { ToastPassThroughMethodOptions } from "primevue/toast";

export default {
  toast: {
    message: () => ({
      class: ['toast-container w-100 position-relative'],
    }),
    content: () => ({
      class: ['toast-body d-flex align-items-center gap-2']
    }),
    container: () => ({
      class: ['toast bg-white show']
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
    summary: () => ({
      class: ['toast-body ps-1']
    }),
    icon: ({ props } : ToastPassThroughMethodOptions) => ({
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