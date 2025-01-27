import { PanelPassThroughOptions } from "primevue/panel";

export default {
  panel: {
    root: "card w-100",
    header: "h4 d-flex justify-content-between align-items-center fw-600 ms-4 me-3 my-2",
    pcToggleButton: {
      root: {
        class: [
          "btn",
        ]
      }
    },
    contentContainer: "mt-2 mx-4 mb-4",
  } as PanelPassThroughOptions
}
