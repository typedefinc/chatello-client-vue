<script setup lang="ts">
import UserItem from "@/components/chat/create/user-list/user-item/UserItem.vue";
import { UserType } from "@/api/user.api.ts";

type Props = {
  list: UserType[],
  selectedList: number[],
}

type Emits = {
  (e: 'selectUser', id: number): void,
}

const emit = defineEmits<Emits>();

const selectUser = (id: number) => {
  emit('selectUser', id);
}

defineProps<Props>();
</script>

<template>
  <div class="user-list">
    <user-item
      v-for="user of list"
      :key="user.id"
      :id="user.id"
      :name="user.name"
      :email="user.email"
      :active="selectedList.includes(user.id)"
      @click="selectUser(user.id)"
    />
  </div>
</template>

<style scoped lang="scss">
.user-list {
  @apply w-full mt-4;
  @apply grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4;
  @apply gap-4;
}
</style>
