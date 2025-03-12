<template>
  <v-tooltip location="bottom" nudge-right="50" :color="buttonStyle ? 'info' : 'secondary'">
    <template #activator="{ props }">
      <v-btn v-if="isFavorite || showAlways" size="small" :color="buttonStyle ? 'info' : 'secondary'" :icon="!buttonStyle"
        :fab="buttonStyle" v-bind="props" @click.prevent="toggleFavorite">
        <v-icon :size="!buttonStyle ? 'small' : undefined" :color="buttonStyle ? 'white' : 'secondary'">
          {{ isFavorite ? $globals.icons.heart : $globals.icons.heartOutline }}
        </v-icon>
      </v-btn>
    </template>
    <span>{{ isFavorite ? $t("recipe.remove-from-favorites") : $t("recipe.add-to-favorites") }}</span>
  </v-tooltip>
</template>

<script lang="ts">
import { useUserSelfRatings } from "~/composables/use-users";
import { useUserApi } from "~/composables/api";
import type { UserOut } from "~/lib/api/types/user";
export default defineNuxtComponent({
  props: {
    recipeId: {
      type: String,
      default: "",
    },
    showAlways: {
      type: Boolean,
      default: false,
    },
    buttonStyle: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const api = useUserApi();
    const $auth = useMealieAuth();
    const { userRatings, refreshUserRatings } = useUserSelfRatings();

    const isFavorite = computed(() => {
      const rating = userRatings.value.find((r) => r.recipeId === props.recipeId);
      return rating?.isFavorite || false;
    });

    async function toggleFavorite() {
      if (!$auth.user.value) return;
      if (!isFavorite.value) {
        await api.users.addFavorite($auth.user.value?.id, props.recipeId);
      } else {
        await api.users.removeFavorite($auth.user.value?.id, props.recipeId);
      }
      await refreshUserRatings();
    }

    return { isFavorite, toggleFavorite };
  },
});
</script>
