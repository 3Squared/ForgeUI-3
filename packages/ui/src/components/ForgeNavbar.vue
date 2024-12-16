<template>
  <Menubar v-bind="{...props, ...$attrs}" :pt="pt" data-cy="navbar">
    <template #start >
      <a :href="logoUrl" class="navbar-brand ms-3" data-cy="logo">
        <slot name="logo">
          Logo
        </slot>
      </a>
    </template>

    <template #buttonicon>
      <slot name="buttonIcon">
        <Icon icon="bi:list" :class="props.severity === 'light' ? 'text-black' : 'text-white'" height="24" data-cy="burger-icon" />
      </slot>
    </template>
    
    <template v-for="(_, slot) of $slots as unknown as MenubarSlots" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </Menubar>
</template>

<script setup lang="ts">
  import { Icon } from "@iconify/vue";
  import Menubar from "primevue/menubar";
  import { MenubarPassThroughOptions, MenubarProps, MenubarSlots } from "primevue/menubar";
  import { ForgeNavbarPosition, Severity } from "../types/forge-types";
  import { computed } from "vue";

  export interface ForgeNavbarProps extends /* vue-ignore */ Omit<MenubarProps, "aria-label" | "aria-labelledby"> {
    severity?: Severity | 'light' | 'dark',
    logoUrl?: string,
    position?: ForgeNavbarPosition
  }

  const props = withDefaults(defineProps<ForgeNavbarProps>(), {
    severity: "light",
    logoUrl: "#"
  })
  
  const pt = computed<MenubarPassThroughOptions>(() => ({
    root: () => ({
      class: [
        'navbar container-fluid navbar-expand-lg',
        {
          'bg-light': props.severity === 'light',
          'bg-dark': props.severity === 'dark',
          'bg-primary': props.severity === 'primary',
          'bg-brand': props.severity === 'brand',
          'bg-secondary': props.severity === 'secondary',
          'bg-success': props.severity === 'success',
          'bg-warning': props.severity === 'warning',
          'bg-danger': props.severity === 'danger',
          'bg-info': props.severity === 'info'
        },
        {
          'navbar-light': props.severity === 'light',
          'navbar-dark': props.severity !== 'light'
        },
        {
          "fixed-top": props.position === "fixed-top",
          "fixed-bottom": props.position === "fixed-bottom",
          "sticky-top": props.position === "sticky-top"
        }
      ]
    })
  }))
  
</script>