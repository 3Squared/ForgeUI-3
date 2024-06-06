import { TabPanelPassThroughMethodOptions } from "primevue/tabpanel";

export default {
  tabview: {
    navContainer: () => ({
      class: ['nav nav-tabs position-relative']
    }),
    navContent: () => ({
      class: ['overflow-hidden']
    }),
    nav: () => ({
      class: ['mb-0 list-unstyled d-flex']
    }),
    previousButton: () => ({
      class: ['bg-white btn h-100 position-absolute top-0 d-flex align-items-center justify-content-center']
    }),
    nextButton: () => ({
      class: ['bg-white btn h-100 position-absolute top-0 end-0 d-flex align-items-center justify-content-center']
    })
  },
  tabpanel: {
    root: () => ({
      class: ['nav-item']
    }),
    headerAction: (options: TabPanelPassThroughMethodOptions & { tabpanel: Partial<TabPanelPassThroughMethodOptions> }) => ({
      class: [
        'nav-link cursor-pointer',
        {
          'active': options.tabpanel.context!.active,
          'disabled': options.tabpanel.props?.disabled
        }
      ]
    }),
    content: () => ({
      class: ['p-2']
    })
  }
}