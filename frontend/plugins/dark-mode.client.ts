import { useDark } from "@vueuse/core";

export default defineNuxtPlugin(() => {
  const isDark = useDark();
  const { $vuetify } = useNuxtApp();

  // Vuetify metadata is bugged and doesn't render dark mode fully when called immediately
  // Adding a delay fixes this problem
  // https://stackoverflow.com/questions/69399797/vuetify-darkmode-colors-wrong-after-page-reload
  setTimeout(() => { $vuetify.theme.dark = isDark.value; }, 200);
  return {
    provide: {
      isDark,
    }
  }
})
