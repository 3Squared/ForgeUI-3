import { PrimeVuePTOptions } from "primevue/config";
import { ButtonPassThroughMethodOptions } from "primevue/button";

export default {
  button: {
    root: (options: ButtonPassThroughMethodOptions) => ({
      class: [
        'btn',
        {
          "btn btn-link": options.props.link,
          "btn-outline-primary": (options.props.severity === null || options.props.severity === "primary") && options.props.outlined,
          "btn-primary": (options.props.severity === null || options.props.severity === "primary") && !options.props.outlined && !options.props.link,
          "btn-secondary": options.props.severity === "secondary" && !options.props.outlined && !options.props.link,
          "btn-outline-secondary": options.props.severity === "secondary" && options.props.outlined,
          "btn-success": options.props.severity === "success" && !options.props.outlined && !options.props.link,
          "btn-outline-success": options.props.severity === "success" && options.props.outlined,
          "btn-info": options.props.severity === "info" && !options.props.outlined && !options.props.link,
          "btn-outline-info": options.props.severity === "info" && options.props.outlined,
          "btn-warning": options.props.severity === "warning" && !options.props.outlined && !options.props.link,
          "btn-outline-warning": options.props.severity === "warning" && options.props.outlined,
          "btn-danger": options.props.severity === "danger" && !options.props.outlined && !options.props.link,
          "btn-outline-danger": options.props.severity === "danger" && options.props.outlined,
        }
      ]
    })
  },
} as PrimeVuePTOptions