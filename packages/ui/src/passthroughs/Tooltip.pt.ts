import { TooltipPassThroughMethodOptions } from "primevue/tooltip";

export default {
  tooltip: {
    root: ({ context }: TooltipPassThroughMethodOptions) => ({
      class: [
        'tooltip show position-absolute',
        {
          'bs-tooltip-end ms-1': context?.right || (!context?.right && !context?.left && !context?.top && !context?.bottom),
          'bs-tooltip-start me-1': context?.left,
          'bs-tooltip-top': context?.top,
          'bs-tooltip-bottom': context?.bottom
        }
      ]
    }),
    arrow: () => ({
      class: [
        'tooltip-arrow position-absolute',
      ]
    }),
    text: {
      class: ['tooltip-inner']
    }
  }
}