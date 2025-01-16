import { TagPassThroughMethodOptions } from "primevue";

export default {
  tag: {
    root: ({ props }: TagPassThroughMethodOptions) => {
      return {
        class: [
          "badge d-inline-flex align-items-center border me-1 p-1",
          {
            "bg-primary-subtle text-primary border-primary":
              props.severity === null ||
              props.severity === undefined ||
              props.severity === "primary",
            "bg-brand-shade-1 text-brand border-brand":
              props.severity === "brand",
            "bg-secondary-subtle text-secondary border-secondary":
              props.severity === "secondary",
            "bg-success-subtle text-success border-success":
              props.severity === "success",
            "bg-warning-subtle text-warning border-warning":
              props.severity === "warning" || props.severity === "warn",
            "bg-danger-subtle text-danger border-danger":
              props.severity === "danger",
            "bg-info-subtle text-info border-info": props.severity === "info",
          },
          {
            "rounded-pill": props.rounded
          },
        ],
      };
    },
  },
};
