import { PopoverPassThroughMethodOptions } from "primevue/popover";

export default {
  popover: {
    root: (options : PopoverPassThroughMethodOptions) => ({
      class: [
        "card w-fit-content m-0",
        {
          'p-4': options.props.dismissable,
          'p-3': !options.props.dismissable
        }
      ]
    }),
    content: "d-flex position-relative",
    closeButton: 'position-absolute top-0 end-0 p-1 btn btn-link text-black ms-2'

  }
}