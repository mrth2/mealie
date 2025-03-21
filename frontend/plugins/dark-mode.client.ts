import { useDark } from "@vueuse/core";

export default defineNuxtPlugin(() => {
  const isDark = useDark();
  // const { $vuetify } = useNuxtApp();

  // // Vuetify metadata is bugged and doesn't render dark mode fully when called immediately
  // // Adding a delay fixes this problem
  // // https://stackoverflow.com/questions/69399797/vuetify-darkmode-colors-wrong-after-page-reload
  // const toggleDarkThemePolling = () => {
  //   if ($vuetify) {
  //     $vuetify.theme.global.name.value = isDark.value ? 'dark' : 'light';
  //   }
  //   else setTimeout(toggleDarkThemePolling, 200);
  // }
  // toggleDarkThemePolling();
  return {
    provide: {
      isDark,
    },
  };
});
