import { DrawerPassThroughMethodOptions } from "primevue/drawer";

export default {
  drawer: {
    root: ({ props }: DrawerPassThroughMethodOptions) => ({
      class: [
        "d-flex flex-column position-relative border bg-white ",
        {
          "h-100": props.position == "left" || props.position == "right",
          "w-100": props.position == "top" || props.position == "bottom",
          "modal border rounded h-auto m-0 mw-100 vh-100 vw-100 ": props.position == "full",
        },
      ],
    }),
    header: "d-flex align-items-center justify-content-between p-3 flex-shrink-0 border-bottom",
    content: "flex-grow-1 py-2 px-3 overflow-auto",
    pcCloseButton: { 
      root: "btn"
    },
    mask: ({ props }: DrawerPassThroughMethodOptions) => ({
      class: [
        "z-3",
        {
          "modal-open": props.modal && props.visible,
        },
      ],
    }),
  }
}