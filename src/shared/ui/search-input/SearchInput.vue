<script setup lang="ts">
import { XCircleIcon, MagnifyingGlassIcon } from "@heroicons/vue/24/outline";

type Props = {
  idTag: string,
  placeholder?: string,
  label?: string,
  modelValue?: string,
  bgColor: string,
}

type Emit = {
  (event: 'update:modelValue', value: string | null): void
}

defineProps<Props>();
const emit = defineEmits<Emit>();

const inputHandler = (event: Event) => {
  const target: HTMLInputElement = event.target as HTMLInputElement;

  emit('update:modelValue', target.value);
}

const clear = () => {
  emit('update:modelValue', '');
}
</script>

<template>
  <label
    class="relative w-full"
    :for="`search-input-text-${idTag}`"
  >
    <i class="search-icon">
      <magnifying-glass-icon class="w-5 h-5 text-gray-500" />
    </i>

    <input
      class="search-input"
      :class="bgColor"
      type="text"
      :id="`search-input-text-${idTag}`"
      :placeholder="placeholder"
      :value="modelValue"
      @input="inputHandler"
    >

    <button
      v-if="!!modelValue"
      class="clear-button"
      @click="clear"
    >
      <x-circle-icon class="w-5 h-5 text-gray-500" />
    </button>
  </label>
</template>

<style scoped lang="scss">
.search-input {
  @apply outline-none;
  @apply border-2 rounded-full;
  @apply h-[40px] w-full border-none;
  @apply shadow-md text-sm;
  @apply px-4 pl-10;
  @apply dark:bg-gray-700;
  @apply dark:text-white;
}

.search-icon {
  @apply absolute left-3;
  @apply top-[50%] translate-y-[-50%];
}

.clear-button {
  @apply absolute right-3;
  @apply top-[50%] translate-y-[-50%];
}
</style>
