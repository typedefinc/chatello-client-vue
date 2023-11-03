<script setup lang="ts">
import ChatItem from "@/components/chat-list/chat-item/ChatItem.vue";
import SearchInput from "@/shared/ui/search-input/SearchInput.vue";
import { onMounted, ref } from "vue";
import DefaultButton from "@/shared/ui/default-button/DefaultButton.vue";
import useChatStore from "@/store/chat";
import { storeToRefs } from "pinia";


const searchModel = ref('');
const { getList } = useChatStore();
const { list } = storeToRefs(useChatStore());

onMounted(async () => {
  await getList();
})
</script>

<template>
  <div class="chat-list">
    <div class="chat-list-header">
      <div class="chat-list-header__title">
        Chats
      </div>

      <div class="chat-list-header__button">
        <router-link to="/create-chat">
          <default-button
            text="Create"
          />
        </router-link>
      </div>
    </div>

    <search-input
      v-model="searchModel"
      type="text"
      id-tag="search"
      placeholder="Search chat"
      bg-color="bg-gray-100"
    />

    <chat-item
      v-for="chat of list"
      :key="chat.id"
      :address="chat.address"
      :image-url="chat.imgUrl"
      :title="chat.title"
      :last-massage="chat.lastMessage"
    />
  </div>
</template>

<style scoped lang="scss">
.chat-list {
  @apply flex flex-col;
  @apply space-y-4;
  @apply w-full md:max-w-[300px] xl:max-w-[450px] min-h-full;
  @apply relative;

  .chat-list-header {
    @apply flex justify-between items-center;

    .chat-list-header__title {
      @apply font-bold text-[32px];
      @apply dark:text-white;
    }

    .chat-list-header__button {
      @apply w-[120px];
    }
  }
}
</style>
