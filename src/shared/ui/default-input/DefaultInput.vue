<script setup lang="ts">
type Props = {
  type: 'text' | 'password',
  idTag: string,
  placeholder?: string,
  label?: string,
  modelValue?: string,
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
</script>

<template>
  <label
    :for="`default-input-${type}-${idTag}`"
    class="w-full"
  >
    <input
      class="default-input"
      :id="`default-input-${type}-${idTag}`"
      :name="`default-input-${type}-${idTag}`"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="inputHandler"
    >
  </label>
</template>

<style scoped lang="scss">
.default-input {
  @apply outline-none;
  @apply border-2 rounded-full;
  @apply h-[40px] w-full border-none;
  @apply shadow-md text-sm;
  @apply px-4 bg-white;
  @apply dark:bg-gray-700;
}
</style>
