import { MenubarPassThroughMethodOptions } from "primevue/menubar";
import { MenuPassThroughMethodOptions } from "primevue/menu";

export default {
  // More PassThrough options in component file.
  menubar: {
    rootList: ({ instance }: MenubarPassThroughMethodOptions) => ({
      class: [
        'navbar-nav navbar-collapse collapse me-auto',
        {
          'show dropdown shadow-sm': instance.mobileActive
        }
      ]
    }),
    item: ({ context }: MenubarPassThroughMethodOptions) => ({
      class: [
        'nav-item',
        {
          'dropdown': context.item.items?.length > 0,
        }
      ]
    }),
    itemLink: ({ context, instance }: MenubarPassThroughMethodOptions) => ({
      class: [
        'cursor-pointer',
        {
          'active': context.active,
          'nav-link': context.level === 0,
          'dropdown-item': context.level > 0,
          'disabled': context.item.disabled,
          'px-3': instance.mobileActive
        }
      ]
    }),
    separator: ({ instance }: MenubarPassThroughMethodOptions) => ({
      class: [
        {
          'border-bottom w-100': instance.mobileActive || instance.level > 0
        }
      ]
    }),
    submenu: ({ instance } : MenubarPassThroughMethodOptions) => ({
      class: [
        'dropdown-menu w-fit-content flex-column ',
        {
          'position-absolute start-100 top-0': instance.level > 1
        }
      ]
    }),
    button: (options: MenubarPassThroughMethodOptions & { state: { queryMatches: boolean } }) => {
      return {
        class: [
          'ms-auto me-3',
          {
            'd-none': !options.state.queryMatches
          }
        ]
      }

    }
  },
  menu: {
    root: (options : MenuPassThroughMethodOptions) => ({
      class: [
        'dropdown',
        {
          'show': options.state.overlayVisible
        }
      ]
    }),   
    list: (options : MenuPassThroughMethodOptions) => ({
      class: [
        ' dropdown-menu',
        {
          'show': options.state.overlayVisible
        }
      ]
    }),
    item: () => ({
      class: [
        'dropdown-item cursor-pointer'
      ]
    }), 
  },
}