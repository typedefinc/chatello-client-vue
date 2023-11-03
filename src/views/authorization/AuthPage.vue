<script setup lang="ts">
import AuthForm from "@/components/auth/AuthForm.vue";
import { useAuthStore } from "@/store/auth";
import InlineButton from "@/shared/ui/inline-button/InlineButton.vue";

const { login: loginHandler } = useAuthStore();
</script>

<template>
  <div class="auth-page">
    <auth-form
      @login="loginHandler"
    />

    <div class="auth-page__actions">
      <router-link to="/forgot-password">
        <inline-button
          text="Forgot password?"
        />
      </router-link>

      <router-link to="/sign-up">
        <inline-button
          text="Registration"
        />
      </router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.auth-page {
  @apply w-full h-full px-4;
  @apply flex flex-col items-center justify-center;

  .auth-page__actions {
    @apply flex justify-center space-x-4;
    @apply mt-4;
  }
}
</style>
