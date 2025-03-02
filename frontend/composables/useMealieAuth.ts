import type { UserOut } from "~/lib/api/types/user";

export const useMealieAuth = function () {
  const auth = useAuth();

  const user = computed(() => auth.data.value as UserOut);
  const loggedIn = computed(() => auth.status.value === "authenticated");

  return {
    user,
    loggedIn,
    signIn: auth.signIn,
    signOut: auth.signOut,
    signUp: auth.signUp,
  }
};
