import type { UserOut } from "~/lib/api/types/user";

export const useMealieAuth = function () {
  const auth = useAuth();
  const { setToken } = useAuthState();
  const { $axios } = useNuxtApp();

  const user = computed(() => auth.data.value as UserOut);
  const loggedIn = computed(() => auth.status.value === "authenticated");

  async function signIn(...params: Parameters<typeof auth.signIn>) {
    await auth.signIn(...params);
    refreshCookie(useRuntimeConfig().public.AUTH_TOKEN); // refresh token after login
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
