import { DialogPassThroughMethodOptions } from "primevue/dialog";

export default {
  dialog: {
    root: ({parent}: DialogPassThroughMethodOptions<any>) => {
      if(parent.instance.$.type.name == 'ConfirmDialog')
        return {
          class: ["modal", "modal-dialog", "modal-content", "h-auto", "m-0", "modal-sm"]
        }
      return {}
    },
    header: () => ({
      class: ["modal-header"],
    }),
    title: () => ({
      class: ["h5 modal-title text-black"],
    }),
    content: () => ({
      class: ["modal-body"],
    }),
    footer: () => ({
      class: ["modal-footer"],
    }),
    headerIcons: () => ({
      class: ["ms-auto"],
    }),
    icon: () => ({
      class: ["ms-auto"],
    }),
    headerActions: "d-flex ms-auto",
    pcCloseButton: ({ props, parent }: DialogPassThroughMethodOptions<any>) => {
      if(parent.instance.$.type.name == 'ConfirmDialog') {
        return ({
          class: ["btn p-1", "ms-auto"]
        })
      }
      return ({
        root: {
          class: [
            "btn p-1",
            {
              "ms-auto": !props.maximizable,
            },
          ],
        },
      })
    },
    pcMaximizeButton: ({ props }: DialogPassThroughMethodOptions<any>) => ({
      root: {
        class: [
          "btn ms-auto p-1",
          {
            "me-3": props.closable,
          },
        ],
      },
    }),
    mask: ({ props }: DialogPassThroughMethodOptions<any>) => ({
      class: [
        "z-3",
        {
          "modal-open": props.modal && props.visible,
        },
      ],
    }),
  },
};
