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
        'nav-item cursor-pointer',
        {
          'dropdown': context.item.items?.length > 0,
        }
      ]
    }),
    itemLink: ({ context, instance }: MenubarPassThroughMethodOptions) => ({
      class: [
        {
          'active': context.active,
          'nav-link': context.level === 0,
          'dropdown-item': context.level > 0,
          'disabled': context.item.item?.disabled,
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
        'dropdown-menu w-fit-content',
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

    },
    submenuicon: 'ms-1'
  },
  menu: {
    menu: (options : MenuPassThroughMethodOptions) => ({
      class: [
        'dropdown dropdown-menu',
        {
          'show': options.state.overlayVisible
        }
      ]
    }),
    menuitem: () => ({
      class: [
        'dropdown-item cursor-pointer'
      ]
    })
  },
}