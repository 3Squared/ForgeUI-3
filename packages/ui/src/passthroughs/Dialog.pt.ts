import { DialogPassThroughMethodOptions } from "primevue/dialog";

export default {
  dialog: {
    header: () => ({
      class: ["modal-header"],
    }),
    headerTitle: () => ({
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
    headerActions: "d-flex ms-auto",
    pcCloseButton: ({ props }: DialogPassThroughMethodOptions<any>) => ({
      root: {
        class: [
          "btn p-1",
          {
            "ms-auto": !props.maximizable,
          },
        ],
      },
    }),
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
