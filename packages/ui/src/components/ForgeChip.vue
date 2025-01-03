<template>
  <Chip v-bind="{ ...$attrs, ...$props }" :pt="chipPt">
    <slot v-for="(_, name) in $slots" :slot="name" :name="name" />
  </Chip>
</template>

<script setup lang="ts">
import { ChipProps } from "primevue/chip";
import { Severity } from "../types/forge-types";
import { computed } from "vue";

export interface ForgeChipProps
  extends /* vue-ignore */ Omit<ChipProps, "aria-label" | "aria-labelledby"> {
  chipSeverity?: Severity;
  pill?: boolean;
}

const props = withDefaults(defineProps<ForgeChipProps>(), {
  chipSeverity: "primary",
  pill: false,
});

const chipPt = computed(() => ({
  root: [
    "badge d-inline-flex align-items-center border me-1 p-1",
    {
      "rounded-pill": props.pill,
    },
    {
      "bg-primary-subtle border-primary text-primary":
        props.chipSeverity === undefined || props.chipSeverity === "primary",
      "bg-brand-subtle border-brand text-brand": props.chipSeverity === "brand",
      "bg-secondary-subtle border-secondary text-secondary":
        props.chipSeverity === "secondary",
      "bg-success-subtle border-success text-success":
        props.chipSeverity === "success",
      "bg-warning-subtle border-warning text-warning":
        props.chipSeverity === "warning",
      "bg-danger-subtle border-danger text-danger":
        props.chipSeverity === "danger",
      "bg-info-subtle border-info text-info": props.chipSeverity === "info",
    },
  ],
}));
</script>
