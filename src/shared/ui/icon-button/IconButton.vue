<script setup lang="ts">

</script>

<template>
  <button class="icon-button">
    <slot />
  </button>
</template>

<style scoped lang="scss">
.icon-button {
  @apply flex items-center justify-center;
  @apply min-w-[40px] min-h-[40px];
  @apply rounded-full;
  @apply hover:bg-gray-200;
  @apply dark:hover:bg-gray-700;
}
</style>
