<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
import SignUpForm from "@/components/auth/SignUpForm.vue";
import InlineButton from "@/shared/ui/inline-button/InlineButton.vue";

const { signup: signupHandler } = useAuthStore();

</script>

<template>
  <div class="sign-up-page">
    <sign-up-form
      @signup="signupHandler"
    />

    <div class="sign-up__actions">
      <router-link to="/auth">
        <inline-button
          text="Log in"
        />
      </router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sign-up-page {
  @apply w-full h-full px-4;
  @apply flex flex-col items-center justify-center;

  .sign-up__actions {
    @apply flex justify-center space-x-4;
    @apply mt-4;
  }
}
</style>
