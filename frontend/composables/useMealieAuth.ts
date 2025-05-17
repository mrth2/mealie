import { ref, watch, computed } from "vue";
import type { UserOut } from "~/lib/api/types/user";

const USER_CACHE_KEY = "mealie_user";

export const useMealieAuth = function () {
  const auth = useAuth();
  const { setToken } = useAuthState();
  const { $axios } = useNuxtApp();

  // Try to restore user from cache
  const cachedUser = localStorage.getItem(USER_CACHE_KEY);
  const lastUser = ref<UserOut | null>(cachedUser ? JSON.parse(cachedUser) : null);

  watch(
    () => auth.data.value,
    (val) => {
      if (val) {
        lastUser.value = val as UserOut;
        localStorage.setItem(USER_CACHE_KEY, JSON.stringify(val));
      }
      else {
        localStorage.removeItem(USER_CACHE_KEY);
      }
    },
    { immediate: true },
  );

  const user = computed(() => lastUser.value);
  const loggedIn = computed(() => auth.status.value === "authenticated");

  async function signIn(...params: Parameters<typeof auth.signIn>) {
    await auth.signIn(...params);
    refreshCookie(useRuntimeConfig().public.AUTH_TOKEN);
  }

  async function oauthSignIn() {
    const params = new URLSearchParams(window.location.search);
    const { data: token } = await $axios.get<{ access_token: string; token_type: "bearer" }>("/api/auth/oauth/callback", { params });
    setToken(token.access_token);
    await auth.getSession();
  }

  return {
    user,
    loggedIn,
    signIn,
    signOut: auth.signOut,
    signUp: auth.signUp,
    refresh: auth.refresh,
    oauthSignIn,
  };
};
