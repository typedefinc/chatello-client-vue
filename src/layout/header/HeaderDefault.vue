<script setup lang="ts">
import { ArrowLeftOnRectangleIcon, SunIcon, MoonIcon } from "@heroicons/vue/24/outline";
import { useAuthStore } from "@/store/auth";
import IconButton from "@/shared/ui/icon-button/IconButton.vue";
import useTheme from "@/composables/theme/useTheme.ts";
import { storeToRefs } from "pinia";

const { logout: logoutHandler } = useAuthStore();
const { changeTheme, darkMode } = useTheme();
const { user } = storeToRefs(useAuthStore());
</script>

<template>
  <div class="header-default">
    <div class="header-default__title">
      Chatello
    </div>

    <div class="header-default__actions">
      <div class="header-default__user">
        <div>{{ user?.name }}</div>
      </div>

      <icon-button @click="changeTheme">
        <sun-icon
          v-if="darkMode"
          class="w-6 h-6 text-gray-500"
        />
        <moon-icon
          v-else
          class="w-6 h-6 text-gray-500"
        />
      </icon-button>

      <icon-button @click="logoutHandler">
        <arrow-left-on-rectangle-icon class="w-6 h-6 text-gray-500" />
      </icon-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header-default {
  @apply flex items-center justify-between;
  @apply w-full h-16 px-4;
  @apply shadow-md bg-gray-100;
  @apply dark:bg-gray-800;
  @apply dark:text-white;

  .header-default__title {
    @apply font-bold text-2xl;
  }

  .header-default__actions {
    @apply flex space-x-2;
    @apply items-center;

    .header-default__user {
      @apply font-bold;
    }
  }
}
</style>
