

export const useLoggedInState = function () {
  const { $auth } = useNuxtApp();
  const route = useRoute();

  const loggedIn = computed(() => $auth.loggedIn);
  const isOwnGroup = computed(() => {
    if (!route.params.groupSlug) {
      return loggedIn.value;
    } else {
      return loggedIn.value && $auth.user?.groupSlug === route.params.groupSlug;
    }
  });

  return { loggedIn, isOwnGroup };
}
