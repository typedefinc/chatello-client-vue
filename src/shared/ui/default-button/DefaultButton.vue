<script setup lang="ts">
type Props = {
  text: string,
}

defineProps<Props>();
</script>

<template>
  <button class="default-button">
    {{ text }}
  </button>
</template>

<style scoped lang="scss">
.default-button {
  @apply h-[40px] w-full text-white;
  @apply font-semibold;
  @apply bg-gray-900 rounded-full;
  @apply dark:bg-gray-600;
  @apply shadow-md;
  @apply hover:bg-gray-800;
  @apply dark:hover:bg-gray-700;
}
</style>
