import { TabPassThroughMethodOptions } from "primevue";

export default {
  tabList: {
    root: () => ({
      class: ['nav nav-tabs position-relative']
    }),
    tabList: () => ({
      class: ['mb-0 d-flex']
    }),
    prevButton: () => ({
      class: ['bg-white btn h-100 position-absolute top-0 d-flex align-items-center justify-content-center']
    }),
    nextButton: () => ({
      class: ['bg-white btn h-100 position-absolute top-0 end-0 d-flex align-items-center justify-content-center']
    }),
  },
  tab: {
    root:  ({ context }: TabPassThroughMethodOptions) => ({ class: ['nav-link p-2 ', {'active': context.active}] 
    }),
  },
  tabPanel: {
    root: () => ({
      class: ['p-2']
    })
  }
}