<template>
  <div class="d-flex justify-content-between pb-2">
    <h3 data-cy="title" class="my-auto">{{ props.title }}</h3>
    <div data-cy="slot" class="d-flex align-items-center">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
export interface ForgePageHeaderProps {
  title: string
}

/**
 *   The Forge Page Header is a component that you can put at the top of every page with the title on the left and the buttons on the right
 * @displayName Page Header
 **/
const props = defineProps<ForgePageHeaderProps>();
</script>
