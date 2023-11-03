<script setup lang="ts">
import MessageInput from "@/components/chat/message-input/MessageInput.vue";
import { useRoute } from "vue-router";
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import useSocket from "@/composables/ws/useSocket.ts";
import useChatStore from "@/store/chat";
import { storeToRefs } from "pinia";
import MessageItem from "@/components/message/MessageItem.vue";
import { MessageType } from "@/api/message.api.ts";
import { useAuthStore } from "@/store/auth";
import useMessageStore from "@/store/message";

const route = useRoute();

const { getChatInfo } = useChatStore();
const { getMessageList } = useMessageStore();
const { chatInfo } = storeToRefs(useChatStore());
const { list } = storeToRefs(useMessageStore());

const { user } = storeToRefs(useAuthStore());

const messages = ref<MessageType[]>([]);
const socket = ref<WebSocket | null>();
const messageList = ref<HTMLElement>();

const createSocket = async () => {
  socket.value = useSocket(`${import.meta.env.VITE_SOCKET_URL}/${route.params.id}`)

  socket.value.onmessage = ({ data }) => {
    const message = JSON.parse(data);

    messages.value.push(message)

    nextTick(() => {
      messageList.value?.scrollBy({
        top: messageList.value?.offsetHeight,
        behavior: 'smooth',
      })
    })
  }

  await getChatInfo(route.params.id as string)
  await getMessageList(route.params.id as string)

  messages.value = list.value;

  await nextTick(() => {
    messageList.value?.scrollTo(0, messageList.value?.offsetHeight)
  })
}

const sendMessageHandler = (message: string) => {
  socket.value?.send(JSON.stringify({
    userId: user.value?.id,
    chatId: route.params.id,
    content: message,
  }))
}

onMounted(async () => {
  await createSocket();
})

onUnmounted(() => {
  socket.value?.close();
})

watch(() => route.params.id, () => {
  socket.value?.close();

  createSocket();
});
</script>

<template>
  <div class="chat-page">
    <div class="chat-info">
      {{ chatInfo?.title }}
    </div>

    <div
      class="message-list"
      ref="messageList"
    >
      <message-item
        v-for="item in messages"
        :key="item.id"
        :content="item.text"
        :side="item.userId === user?.id ? 'right' : 'left'"
      />
    </div>

    <message-input
      @create-message="sendMessageHandler"
    />
  </div>
</template>

<style scoped lang="scss">
.chat-page {
  @apply flex flex-col justify-between;
  @apply w-full h-full;
  @apply p-4 relative;

  .chat-info {
    @apply flex items-center;
    @apply w-full dark:text-white;
    @apply font-semibold;
  }

  .message-list {
    @apply flex flex-col space-y-2;
    @apply overflow-y-scroll py-2;


    &::-webkit-scrollbar {
      width: 0;
    }

    height: calc(100% - 80px);
    max-height: calc(100% - 80px);
  }
}
</style>
