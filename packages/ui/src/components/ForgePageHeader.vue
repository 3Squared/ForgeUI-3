<template>
  <div class="d-flex justify-content-between pb-2">
    <h1 data-cy="title" class="h3">{{ props.title }}</h1>
    <div data-cy="slot" class="d-flex align-items-center">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
/**
 *   The Forge Page Header is a component that you can put at the top of every page with the title on the left and the buttons on the right
 * @displayName Page Header
 **/
const props = defineProps<ForgePageHeaderProps>();

export interface ForgePageHeaderProps {
  title: string
}
</script>
