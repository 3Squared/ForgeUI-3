import { OverlayPanelPassThroughMethodOptions } from "primevue/overlaypanel";

export default {
  overlaypanel: {
    root: (options : OverlayPanelPassThroughMethodOptions) => ({
      class: [
        "card w-fit-content m-0",
        {
          'p-4': options.props.showCloseIcon,
          'p-3': !options.props.showCloseIcon
        }
      ]
    }),
    content: "d-flex position-relative",
    closeButton: 'position-absolute top-0 end-0 p-1 btn btn-link text-black ms-2'

  }
}