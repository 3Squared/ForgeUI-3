import {
  TabPassThroughMethodOptions,
  TagPassThroughMethodOptions,
} from "primevue";
import { ButtonPassThroughMethodOptions } from "primevue/button";

export default {
  tag: {
    root: ({ props }: TagPassThroughMethodOptions) => {
      return {
        class: [
          "badge rounded d-inline-flex align-items-center border me-1 p-1",
          {
            "bg-primary-subtle text-primary border-primary":
              props.severity === null ||
              props.severity === undefined ||
              props.severity === "primary",
            "bg-primary-brand text-brand border-brand":
              props.severity === "brand",
            "bg-primary-secondary text-secondary border-secondary":
              props.severity === "secondary",
            "bg-primary-success text-success border-success":
              props.severity === "success",
            "bg-primary-warning text-warning border-warning":
              props.severity === "warning" || props.severity === "warn",
            "bg-primary-danger text-danger border-danger":
              props.severity === "danger",
            "bg-primary-info text-info border-info": props.severity === "info",
          },
        ],
      };
    },
  },
};
