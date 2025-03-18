import type { UserOut } from "~/lib/api/types/user";
import AuthService from "~/services/auth-service";

export const useMealieAuth = function () {
  const auth = useAuth();

  const user = computed(() => auth.data.value as UserOut);
  const loggedIn = computed(() => auth.status.value === "authenticated");

  async function signIn(...params: Parameters<typeof auth.signIn>) {
    await auth.signIn(...params);
    refreshCookie(useRuntimeConfig().public.AUTH_TOKEN); // refresh token after login
  }

  return {
    user,
    loggedIn,
    signIn,
    signOut: auth.signOut,
    signUp: auth.signUp,
    refresh: auth.refresh,
  }
};

export const useMealieOidc = function () {
  const $auth = new AuthService();
  return {
    $auth,
  }
}
