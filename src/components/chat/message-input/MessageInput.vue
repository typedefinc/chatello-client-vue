<script setup lang="ts">
import IconButton from "@/shared/ui/icon-button/IconButton.vue";
import { PaperAirplaneIcon } from "@heroicons/vue/24/outline";
import { ref } from "vue";

type Emits = {
  (e: 'createMessage', value: string): void,
}

const emit = defineEmits<Emits>();

const message = ref<string>('');
const messageInput = ref<HTMLElement>();

const logData = (event: Event) => {
  const target = event.target as HTMLElement;

  message.value = target.innerText;
}

const sendMessage = () => {
  if (message.value) {
    emit('createMessage', message.value);

    message.value = '';

    if (messageInput.value) {
      messageInput.value.innerText = '';
    }
  }
}

const enterDownHandler = (event: KeyboardEvent) => {
  if (event.shiftKey) return;

  event.preventDefault();

  sendMessage();
}
</script>

<template>
  <div class="message-input">
    <div
      ref="messageInput"
      class="message-input__textarea"
      contenteditable
      placeholder="Write massage..."
      @input="logData"
      @keydown.enter="enterDownHandler"
    />

    <icon-button @click="sendMessage">
      <paper-airplane-icon class="w-5 h-5 text-gray-500" />
    </icon-button>
  </div>
</template>

<style scoped lang="scss">
.message-input {
  @apply flex items-end space-x-2;
  @apply w-full min-h-[40px];

  .message-input__textarea {
    @apply w-full shadow-sm bg-white;
    @apply dark:bg-gray-700 dark:text-white;
    @apply rounded-md outline-none;
    @apply p-2 text-[14px] min-h-[40px] max-h-[190px];
    @apply overflow-y-scroll;

    resize: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}

[contenteditable]:empty:before {
  content: attr(placeholder);
  opacity: 0.5;
}
</style>
