import { ButtonPassThroughMethodOptions } from "primevue/button";

export default {
  button: {
    root: ({ props } : ButtonPassThroughMethodOptions<any>) => ({
      class: [
        'btn',
        // Brand
        {
          "btn-brand": (props.severity === null || props.severity === "brand") && !props.outlined && !props.link && !props.text,
          "btn-outline-brand": (props.severity === null || props.severity === "brand") && props.outlined,
          "text-brand fw-bold btn-text-brand": (props.severity === null || props.severity === "brand") && props.text,
        },
        // Primary
        {
          "btn-primary": (props.severity === null || props.severity === "primary") && !props.outlined && !props.link && !props.text,
          "btn-outline-primary": (props.severity === null || props.severity === "primary") && props.outlined,
          "text-primary fw-bold btn-text-primary": (props.severity === null || props.severity === "primary") && props.text,
        },
        // Secondary
        {
          "btn-secondary": props.severity === "secondary" && !props.outlined && !props.link && !props.text,
          "btn-outline-secondary": props.severity === "secondary" && props.outlined,
          "text-secondary fw-bold btn-text-secondary": props.severity === "secondary" && props.text,
        },
        // Success
        {
          "btn-success text-white": props.severity === "success" && !props.outlined && !props.link && !props.text,
          "btn-outline-success": props.severity === "success" && props.outlined,
          "text-success fw-bold btn-text-success": props.severity === "success" && props.text,
        },
        // Warning
        {
          "btn-warning text-white": props.severity === "warning" && !props.outlined && !props.link && !props.text,
          "btn-outline-warning": props.severity === "warning" && props.outlined,
          "text-warning fw-bold btn-text-warning": props.severity === "warning" && props.text
        },
        // Danger
        {
          "btn-danger text-white": props.severity === "danger" && !props.outlined && !props.link && !props.text,
          "btn-outline-danger": props.severity === "danger" && props.outlined,
          "text-danger fw-bold btn-text-danger": props.severity === "danger" && props.text,
        },
        // Info
        {
          "btn-info text-white": props.severity === "info" && !props.outlined && !props.link && !props.text,
          "btn-outline-info": props.severity === "info" && props.outlined,
          "text-info fw-bold btn-text-info": props.severity === "info" && props.text
        },
        // Misc
        {
          "btn-link": props.link,
          "shadow": props.raised,
          "rounded-pill": props.rounded,
          "btn-lg": props.size == "large",
          "btn-sm": props.size == "small"
        }
      ]
    }),
    loadingIcon: () => ({
      class: ['spinner-border spinner-border-sm border-0 me-2']
    }),
    badge: ({ props } : ButtonPassThroughMethodOptions<any>) => {
      return {
        class: [
          {
            "button-badge-primary": (props.severity === 'primary' || props.severity === null) && !props.outlined,
            "button-badge-secondary": props.severity === 'secondary' && !props.outlined,
            "button-badge-success": props.severity === 'success' && !props.outlined,
            "button-badge-warning": (props.severity === 'warning' || props.severity === 'warn') && !props.outlined,
            "button-badge-danger": props.severity === 'danger' && !props.outlined,
            'button-badge-info': props.severity === 'info' && !props.outlined
          },
          {
            "button-badge-primary outlined": (props.severity === 'primary' || props.severity === null) && props.outlined,
            "button-badge-secondary outlined": props.severity === 'secondary' && props.outlined,
            "button-badge-success outlined": props.severity === 'success' && props.outlined,
            "button-badge-warning outlined": (props.severity === 'warning' || props.severity === 'warn') && props.outlined,
            "button-badge-danger outlined": props.severity === 'danger' && props.outlined,
            'button-badge-info outlined': props.severity === 'info' && props.outlined
          },
          "rounded-pill ms-2"
        ]
      }
    }
  }
}