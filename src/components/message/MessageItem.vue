<script setup lang="ts">
type Props = {
  userName: string,
  content: string,
  side: 'left' | 'right'
}

defineProps<Props>();
</script>

<template>
  <div
    class="message-wrapper"
    :class="side"
  >
    <div class="message-item">
      <div class="message-title">
        {{ userName }}
      </div>
      {{ content }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.message-wrapper {
  @apply flex w-full;

  &.left {
    @apply justify-start;
  }

  &.right {
    @apply justify-end;
  }

  .message-item {
    @apply w-fit;
    @apply min-h-[40px] max-w-[100%];
    @apply bg-white dark:bg-gray-600 rounded-md break-all;
    @apply p-2 shadow-md dark:text-white;

    .message-title {
      @apply text-sm font-semibold;
    }
  }
}
</style>
