export default defineNuxtRouteMiddleware((to, from) => {
    const { user } = useUserSession();
    // If the user is not allowed to organize data redirect to the home page
    if (!user.value?.canOrganize) {
        console.warn("User is not allowed to organize data");
        navigateTo('/');
    }
});
