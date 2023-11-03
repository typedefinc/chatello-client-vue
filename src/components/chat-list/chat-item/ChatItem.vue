<script setup lang="ts">
import { UserIcon } from "@heroicons/vue/24/outline";

type Props = {
  address: string,
  title: string,
  lastMassage?: string,
  imageUrl?: string,
}

defineProps<Props>();
</script>

<template>
  <router-link :to="`/chat/${address}`">
    <div class="chat-item">
      <div class="chat-item__image">
        <user-icon
          v-if="!imageUrl"
          class="w-6 h-6 text-gray-500"
        />
        <img
          v-else
          :src="imageUrl"
          :alt="title"
        >
      </div>

      <div class="chat-item__container">
        <div class="chat-item__name">
          {{ title }}
        </div>
        <div class="chat-item__description">
          {{ lastMassage || "Be the first in this chat!" }}
        </div>
      </div>
    </div>
  </router-link>
</template>

<style scoped lang="scss">
.chat-item {
  @apply w-full;
  @apply p-2;
  @apply flex;
  @apply cursor-pointer shadow-md;
  @apply bg-gray-100 rounded-xl;
  @apply dark:bg-gray-800 dark:text-white;

  &:hover {
    @apply bg-gray-700;

    .chat-item__image {
      svg {
        stroke: white;
      }
    }

    .chat-item__container {
      .chat-item__name {
        @apply text-white;
      }
    }
  }

  .chat-item__image {
    @apply flex justify-center items-center;
    @apply w-12 h-12;
    @apply rounded-full overflow-hidden;
    @apply mr-2;
  }

  .chat-item__container {
    @apply flex flex-col justify-around;

    .chat-item__name {
      @apply font-semibold;
      @apply text-[14px];
    }

    .chat-item__description {
      @apply text-[12px];
      @apply text-gray-400;
    }
  }
}
</style>
