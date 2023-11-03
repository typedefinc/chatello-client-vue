<script setup lang="ts">
import { UserIcon, CheckIcon, PlusIcon } from "@heroicons/vue/24/outline";

type Props = {
  id: number,
  name: string,
  email: string,
  imgUrl?: string,
  active: boolean,
}

defineProps<Props>();
</script>

<template>
  <div
    class="user-item"
    :class="{ active }"
  >
    <div class="user-item__image">
      <user-icon
        v-if="!imgUrl"
        class="w-6 h-6 text-gray-500"
      />
      <img
        v-else
        :src="imgUrl"
        :alt="name"
      >
    </div>

    <div class="user-item__container">
      <div class="user-item__name">
        {{ name }}
      </div>

      <div class="user-item__description">
        {{ email }}
      </div>
    </div>

    <div class="user-item__choice">
      <check-icon
        v-if="active"
        class="w-5 h-5 text-white"
      />
      <plus-icon
        v-else
        class="w-5 h-5 text-gray-500"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.user-item {
  @apply w-full;
  @apply p-2;
  @apply flex relative;
  @apply cursor-pointer shadow-md;
  @apply bg-white rounded-xl;
  @apply dark:bg-gray-600;
  @apply dark:text-white;

  &:hover, &.active {
    @apply bg-gray-700;

    svg {
      stroke: white;
    }

    .user-item__container {
      .user-item__name {
        @apply text-white;
      }
    }
  }

  .user-item__image {
    @apply flex justify-center items-center;
    @apply min-w-[40px] min-h-[40px];
    @apply rounded-full overflow-hidden;
    @apply mr-2;
  }

  .user-item__container {
    @apply flex flex-col justify-around;

    .user-item__name {
      @apply font-semibold;
      @apply text-[14px];
    }

    .user-item__description {
      @apply text-[12px];
      @apply text-gray-400;
    }
  }

  .user-item__choice {
    @apply absolute;
    @apply right-2 top-[50%] translate-y-[-50%];
  }
}
</style>
