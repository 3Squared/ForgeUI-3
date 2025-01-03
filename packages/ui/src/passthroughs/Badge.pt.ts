import { BadgePassThroughMethodOptions } from "primevue/badge";

export default {
  badge: {
    root: ({ props } : BadgePassThroughMethodOptions<any>) => {
      return {
        class: [
          'badge',
          {
            "badge-primary": props.severity === 'primary' || props.severity === null || props.severity === undefined ,
            "badge-brand": props.severity === 'brand',
            "badge-secondary": props.severity === 'secondary',
            "badge-success": props.severity === "success",
            "badge-warning": props.severity === "warning" || props.severity === "warn",
            "badge-danger": props.severity === "danger",
            "badge-info": props.severity === "info"
          },
          {
            'badge-xl fs-4 lh-sm': props.size === 'xlarge',
            'badge-lg fs-5 lh-1': props.size === 'large'
          }
        ]
      }
    }
  }
}