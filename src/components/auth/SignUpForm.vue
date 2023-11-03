<script setup lang="ts">
import DefaultInput from "@/shared/ui/default-input/DefaultInput.vue";
import DefaultButton from "@/shared/ui/default-button/DefaultButton.vue";
import { ref } from "vue";
import { SignUpDto } from "@/api/auth.api.ts";

type Emits = {
  (e: 'signup', value: SignUpDto): void,
}

const authData = ref<SignUpDto>({
  email: '',
  name: '',
  password: '',
});

const emit = defineEmits<Emits>();

const signUpHandler = () => {
  if (authData.value.password && authData.value.email && authData.value.name) {
    emit('signup', authData.value);
  }
}
</script>

<template>
  <div
    class="signup-form"
    @keydown.enter="signUpHandler"
  >
    <h1 class="signup-form__title">
      Sign Up
    </h1>

    <default-input
      v-model="authData.email"
      type="text"
      id-tag="sign-up-email"
      placeholder="Enter email"
      label="Email"
    />

    <default-input
      v-model="authData.name"
      type="text"
      id-tag="sign-up-name"
      placeholder="Enter name"
      label="Name"
    />

    <default-input
      v-model="authData.password"
      type="password"
      id-tag="sign-up-password"
      placeholder="Enter password"
      label="Password"
    />

    <default-button
      text="Sign Up"
      @click="signUpHandler"
    />
  </div>
</template>

<style scoped lang="scss">
.signup-form {
  @apply flex flex-col;
  @apply w-full max-w-[400px] space-y-4;

  .signup-form__title {
    @apply text-[24px];
    @apply font-bold;
  }
}
</style>
