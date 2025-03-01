export interface ThemeConfig {
  lightPrimary: string;
  lightAccent: string;
  lightSecondary: string;
  lightSuccess: string;
  lightInfo: string;
  lightWarning: string;
  lightError: string;
  darkPrimary: string;
  darkAccent: string;
  darkSecondary: string;
  darkSuccess: string;
  darkInfo: string;
  darkWarning: string;
  darkError: string;
}

let __cachedTheme: ThemeConfig | undefined;

async function fetchTheme(): Promise<ThemeConfig | undefined> {
  const route = "/api/app/about/theme";

  try {
    const response = await fetch(route);
    const data = await response.json();
    return data as ThemeConfig;
  } catch (error) {
    return undefined;
  }
}

export default defineNuxtPlugin(async () => {
  const { $vuetify } = useNuxtApp();
  const config = useRuntimeConfig();
  let theme = __cachedTheme;
  if (!theme) {
    theme = await fetchTheme();
    __cachedTheme = theme;
  }

  if (theme) {
    $vuetify.theme.themes.value.light.colors = {
      ...$vuetify.theme.themes.value.light.colors,
      primary: theme.lightPrimary,
      accent: theme.lightAccent,
      secondary: theme.lightSecondary,
      success: theme.lightSuccess,
      info: theme.lightInfo,
      warning: theme.lightWarning,
      error: theme.lightError,
    };

    $vuetify.theme.themes.value.dark.colors = {
      ...$vuetify.theme.themes.value.dark.colors,
      primary: theme.darkPrimary,
      accent: theme.darkAccent,
      secondary: theme.darkSecondary,
      success: theme.darkSuccess,
      info: theme.darkInfo,
      warning: theme.darkWarning,
      error: theme.darkError,
    };
  }

  if (config.public.useDark) {
    $vuetify.theme.global.name.value = 'dark';
  }
  return {
    provide: {

    }
  }
})
