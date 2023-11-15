<script setup lang="ts">
import DefaultInput from "@/shared/ui/default-input/DefaultInput.vue";
import DefaultButton from "@/shared/ui/default-button/DefaultButton.vue";
import { ref } from "vue";
import { AuthDto } from "@/api/auth.api.ts";

type Emits = {
  (e: 'login', value: AuthDto): void,
}

const authData = ref<AuthDto>({
  email: '',
  password: '',
});

const emit = defineEmits<Emits>();

const loginHandler = () => {
  if (authData.value.password && authData.value.email) {
    emit('login', authData.value);
  }
}
</script>

<template>
  <div class="auth-form" @keydown.enter="loginHandler">
    <h1 class="auth-form__title">
      Authorization
    </h1>

    <default-input v-model="authData.email" type="text" id-tag="auth-email" placeholder="Enter email" label="Email" />
    <default-input v-model="authData.password" type="password" id-tag="auth-password" placeholder="Enter password"
                   label="Password" />

    <default-button text="Log in" @click="loginHandler" />
  </div>
</template>

<style scoped lang="scss">
.auth-form {
  @apply flex flex-col;
  @apply w-full max-w-[400px] space-y-4;

  .auth-form__title {
    @apply text-[24px];
    @apply font-bold;
  }
}
</style>
