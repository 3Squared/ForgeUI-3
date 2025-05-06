import { SplitButtonPassThroughMethodOptions } from "primevue/splitbutton";
import { TieredMenuPassThroughMethodOptions } from "primevue";

export default {
  splitbutton: {
    root: () => ({
      class: ["btn-group"]
    }),
    pcDropdown: {
      root: ({ props }: SplitButtonPassThroughMethodOptions) => ({
        class: [
          "btn dropdown-toggle-split",
          {
            "btn-primary": (props.severity === undefined || props.severity === "primary" || props.severity === null) && !props.outlined,
            "btn-brand": props.severity === "brand" && !props.outlined,
            "btn-secondary": props.severity === "secondary" && !props.outlined,
            "btn-success": props.severity === "success" && !props.outlined,
            "btn-success-alternate": props.severity === "success-alternate" && !props.outlined,
            "btn-warning": (props.severity === "warning" || props.severity === "warn") && !props.outlined,
            "btn-danger": props.severity === "danger" && !props.outlined,
            "btn-info": props.severity === "info" && !props.outlined
          },
          {
            "btn-outline-primary ": (props.severity === undefined || props.severity === "primary" || props.severity === null) && props.outlined,
            "btn-outline-brand": props.severity === "brand" && props.outlined,
            "btn-outline-secondary": props.severity === "secondary" && props.outlined,
            "btn-outline-success": props.severity === "success" && props.outlined,
            "btn-outline-success-alternate": props.severity === "success-alternate" && props.outlined,
            "btn-outline-warning": (props.severity === "warning" || props.severity === "warn") && props.outlined,
            "btn-outline-danger": props.severity === "danger" && props.outlined,
            "btn-outline-info": props.severity === "info" && props.outlined
          }
        ]
      })
    },
    pcMenu: {
      rootList: ({ instance }: TieredMenuPassThroughMethodOptions<any>) => {
        const classes = ["dropdown-menu show"];
        // We do some calculations here to figure out if the dropdown expands beyond the page width
        // this can happen often if the splitbutton is positioned towards the right of the page and then gets fed in long worded options
        // without this tweak, the page will expand outwards, which looks wrong
        // this fix adds another css class which aligns the dropdown to the right side, causing long options to expand into the page, instead of outwards
        // in every other scenario, the dropdown expands as it did before
        const ul = document.querySelector(`ul[teleported-from=${instance.$el.parentElement.id}]`);
        if (ul?.parentElement?.offsetLeft + ul?.offsetWidth > window.innerWidth)
          classes.push("dropdown-menu-end");
        return {
          "teleported-from": instance.$el.parentElement.id,
          "data-bs-popper": "",
          class: classes
        };
      },
      itemLink: ({ props }: SplitButtonPassThroughMethodOptions) => ({
        class: [
          "dropdown-item",
          { "cursor-pointer": !props.disabled }
        ]
      }),
      separator: "border-bottom"
    }
  }
};