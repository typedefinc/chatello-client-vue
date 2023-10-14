<template>
  <div class="application-wrapper">
    <div class="router-window">
      <router-view />
    </div>
  </div>
</template>

<style scoped lang="scss">
.application-wrapper {
  @apply w-[100vw] h-[100vh];
  @apply bg-gray-800;
  @apply flex items-center justify-center;

  .router-window {
    @apply w-2/3 h-2/3;
    @apply bg-gray-700;
    @apply rounded-xl shadow-xl;
    @apply text-white;
  }
}
</style>
