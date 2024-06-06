import { DialogPassThroughMethodOptions } from "primevue/dialog";

export default {
  dialog: {
    header: () => ({
      class: ['modal-header']
    }),
    headerTitle: () => ({
      class: ['h5 modal-title text-black']
    }),
    content: () => ({
      class: ['modal-body']
    }),
    footer: () => ({
      class: ['modal-footer']
    }),
    headerIcons: () => ({
      class: ['ms-auto']
    }),
    icons: 'd-flex ms-auto',
    closeButton: ({ props } : DialogPassThroughMethodOptions<any>) => ({
      class: [
        'btn p-0',
        {
          'ms-auto': !props.maximizable
        }
      ]
    }),
    maximizableButton: ({ props } : DialogPassThroughMethodOptions<any>) => ({
      class: [
        'btn ms-auto p-0',
        {
          "me-3": props.closable
        }
      ]
    }),
    mask: ({ props } : DialogPassThroughMethodOptions<any>) => ({
      class: [{
        'modal-open': props.modal && props.visible
      }]
    })
  }
}