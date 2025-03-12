<template>
  <div @click.prevent>
    <!-- User Rating -->
    <v-hover v-slot="{ isHovering }">
      <v-rating v-if="isOwnGroup && (userRating || isHovering || !ratingsLoaded)" :model-value="userRating"
        color="secondary" bg-color="secondary lighten-3" length="5" :density="small ? 'compact' : 'default'"
        :size="small ? 15 : undefined" hover clearable @update:model-value="updateRating(+$event)"
        @click="updateRating" />
      <!-- Group Rating -->
      <v-rating v-else :model-value="groupRating" :half-increments="true" readonly active-color="grey darken-1"
        color="secondary" bg-color="secondary lighten-3" length="5" :density="small ? 'comfortable' : 'default'"
        :size="small ? 15 : undefined" hover />
    </v-hover>
  </div>
</template>

<script lang="ts">
import { useLoggedInState } from "~/composables/use-logged-in-state";
import { useUserSelfRatings } from "~/composables/use-users";
export default defineNuxtComponent({
  props: {
    emitOnly: {
      type: Boolean,
      default: false,
    },
    recipeId: {
      type: String,
      default: "",
    },
    slug: {
      type: String,
      default: "",
    },
    modelValue: {
      type: Number,
      default: 0,
    },
    small: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const { isOwnGroup } = useLoggedInState();
    const { userRatings, setRating, ready: ratingsLoaded } = useUserSelfRatings();

    const userRating = computed(() => {
      return userRatings.value.find((r) => r.recipeId === props.recipeId)?.rating ?? undefined;
    });

    // if a user unsets their rating, we don't want to fall back to the group rating since it's out of sync
    const hideGroupRating = ref(!!userRating.value);
    watch(
      () => userRating.value,
      () => {
        if (userRating.value) {
          hideGroupRating.value = true;
        }
      },
    )

    const groupRating = computed(() => {
      return hideGroupRating.value ? 0 : props.modelValue;
    });

    function updateRating(val?: number) {
      if (!isOwnGroup.value) {
        return;
      }

      if (!props.emitOnly) {
        setRating(props.slug, val || 0, null);
      }
      context.emit("update:modelValue", val);
    }

    return {
      isOwnGroup,
      ratingsLoaded,
      groupRating,
      userRating,
      updateRating,
    };
  },
});
</script>

<style lang="scss" scoped></style>
