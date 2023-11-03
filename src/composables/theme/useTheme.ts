import { onMounted, ref } from "vue";

export default function useTheme() {
  const darkMode = ref<boolean>(Boolean(Number(localStorage.getItem('darkMode') || 0)));

  const changeClass = () => {
    const html = document.querySelector('html') as HTMLElement;

    if (darkMode.value) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
  }

  onMounted(() => {
    changeClass();
  })

  return {
    changeTheme() {
      darkMode.value = !darkMode.value;

      changeClass();

      localStorage.setItem('darkMode', String(Number(darkMode.value)));
    },
    darkMode,
  }
}
