<script setup lang="ts">
import SearchInput from "@/shared/ui/search-input/SearchInput.vue";
import UserList from "@/components/chat/create/user-list/UserList.vue";
import { storeToRefs } from "pinia";
import useUserStore from "@/store/user";
import { onMounted, ref } from "vue";
import _ from "lodash";
import DefaultButton from "@/shared/ui/default-button/DefaultButton.vue";
import useChatStore from "@/store/chat";
import DefaultInput from "@/shared/ui/default-input/DefaultInput.vue";

const { list } = storeToRefs(useUserStore());
const { getList } = useUserStore();
const { create } = useChatStore();
const selectedUsers = ref<number[]>([]);
const title = ref<string | undefined>();
const searchModel = ref('');

const debounceChange = _.debounce(async () => await getList(searchModel.value), 500);

const createChatHandler = async () => {
  await create({
    title: title.value,
    users: selectedUsers.value,
  })
}

const selectUserHandler = (id: number) => {
  if (selectedUsers.value.includes(id)) {
    selectedUsers.value = selectedUsers.value.filter((item: number) => item !== id);
  } else {
    selectedUsers.value.push(id);
  }
}

onMounted(async () => {
  await getList(searchModel.value);
})
</script>

<template>
  <div class="create-chat-page">
    <div class="create-chat-page__header">
      <default-input
        v-model="title"
        id-tag="chat-title"
        type="text"
        placeholder="Title for new chat"
      />

      <div class="add-button">
        <default-button
          text="Add"
          @click="createChatHandler"
        />
      </div>
    </div>

    <search-input
      v-model="searchModel"
      id-tag="user"
      bg-color="bg-white"
      placeholder="Search user"
      @update:model-value="debounceChange"
    />

    <user-list
      :list="list"
      :selected-list="selectedUsers"
      @select-user="selectUserHandler"
    />
  </div>
</template>

<style scoped lang="scss">
.create-chat-page {
  .create-chat-page__header {
    @apply flex space-x-4;
    @apply w-full mb-4;

    .add-button {
      @apply w-[100px]
    }
  }

  @apply w-full h-full;
  @apply p-4;
}
</style>
