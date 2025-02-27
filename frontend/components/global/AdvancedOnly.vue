<template>
  <div scoped-slot></div>
</template>

<script lang="ts">
/**
 * Renderless component that only renders if the user is logged in.
 * and has advanced options toggled.
 */
export default defineNuxtComponent({
  setup(_, ctx) {
    const { $auth } = useNuxtApp();

    const r = $auth?.user?.advanced || false;

    return () => {
      return r ? ctx.slots.default?.() : null;
    };
  },
});
</script>
