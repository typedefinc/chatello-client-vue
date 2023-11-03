<script setup lang="ts">
type Props = {
  text: string,
}

defineProps<Props>();
</script>

<template>
  <button class="inline-button">
    {{ text }}
  </button>
</template>

<style scoped lang="scss">
.inline-button {
  @apply underline;
  @apply text-[12px] text-gray-600;
}
</style>
