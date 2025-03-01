export default defineNuxtRouteMiddleware((to, from) => {
    const { user } = useUserSession();
    // If the user is not an admin redirect to the home page
    if (!user.value?.admin) {
        navigateTo('/');
    }
});
