<script setup lang="ts">
import HeaderDefault from "@/layout/header/HeaderDefault.vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/auth";
import ChatList from "@/components/chat-list/ChatList.vue";
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";

const { isAuth } = storeToRefs(useAuthStore());
const route = useRoute();
const authStore = useAuthStore();

const isMobile = computed(() => {
  return window.innerWidth <= 765;
});

const isMainPage = computed(() => {
  return route.path === '/';
});

const showSidebar = computed(() => {
  if (!isMobile.value) {
    return true;
  }

  return isMainPage.value;
});

const showPage = computed(() => {
  if (!isMobile.value) {
    return true;
  }

  return !isMainPage.value;
});

onMounted(async () => {
  await authStore.getUser();
})
</script>

<template>
  <div class="application-wrapper">
    <header-default v-if="isAuth" />

    <div class="work-area">
      <chat-list v-if="isAuth && showSidebar" />

      <div v-if="showPage" class="page-wrapper">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.application-wrapper {
  @apply flex flex-col;
  @apply w-[100vw] h-[100vh];
  @apply bg-gray-200 dark:bg-gray-900;
  @apply flex items-center justify-center;

  .work-area {
    @apply flex space-x-4;
    @apply w-full;
    @apply p-4;

    height: calc(100vh - 64px);

    .page-wrapper {
      @apply w-full shadow-md;
      @apply bg-gray-100 rounded-xl;
      @apply dark:bg-gray-800;
    }
  }
}
</style>
