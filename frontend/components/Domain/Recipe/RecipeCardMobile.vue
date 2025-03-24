<template>
  <div :style="`height: ${height}`">
    <v-expand-transition>
      <v-card
        :ripple="false"
        :class="isFlat ? 'mx-auto flat' : 'mx-auto'"
        :style="{ cursor }"
        hover
        :to="$attrs.selected ? undefined : recipeRoute"
        @click="$emit('selected')"
      >
        <v-img
          v-if="vertical"
          class="rounded-sm"
          cover
        >
          <RecipeCardImage
            :icon-size="100"
            :slug="slug"
            :recipe-id="recipeId"
            size="small"
            :image-version="image"
          />
        </v-img>
        <v-list-item
          lines="three"
          class="py-0"
          :class="vertical ? 'px-2' : 'px-0'"
          item-props
        >
          <template #prepend>
            <slot
              v-if="!vertical"
              name="avatar"
            >
              <v-img
                tile
                height="100%"
                :min-height="height"
                width="125"
                cover
                class="v-mobile-img rounded-sm mt-n2"
              >
                <RecipeCardImage
                  :icon-size="100"
                  :slug="slug"
                  :recipe-id="recipeId"
                  :image-version="image"
                  size="small"
                />
              </v-img>
            </slot>
          </template>
          <div class="pl-4 d-flex flex-column justify-space-between align-stretch pr-2">
            <v-list-item-title class="mt-1 mb-1 text-top text-truncate w-100">
              {{ name }}
            </v-list-item-title>
            <v-list-item-subtitle class="ma-0 text-top">
              <SafeMarkdown v-if="description" :source="description" />
              <p v-else>
                <br>
                <br>
                <br>
              </p>
            </v-list-item-subtitle>
            <div class="d-flex flex-wrap justify-start ma-0">
              <RecipeChips
                :truncate="true"
                :items="tags"
                :title="false"
                :limit="2"
                small
                url-prefix="tags"
                v-on="$attrs"
              />
            </div>
          </div>
          <slot name="actions">
            <v-card-actions class="pl-3 pr-5 w-100">
              <RecipeFavoriteBadge
                v-if="isOwnGroup && showRecipeContent"
                :recipe-id="recipeId"
                show-always
              />
              <RecipeRating
                v-if="showRecipeContent"
                :class="isOwnGroup ? 'ml-auto' : 'ml-auto pb-2'"
                :value="rating"
                :recipe-id="recipeId"
                :slug="slug"
                small
              />

              <!-- If we're not logged-in, no items display, so we hide this menu -->
              <!-- We also add padding to the v-rating above to compensate -->
              <RecipeContextMenu
                v-if="isOwnGroup && showRecipeContent"
                :slug="slug"
                :menu-icon="$globals.icons.dotsHorizontal"
                :name="name"
                :recipe-id="recipeId"
                :use-items="{
                  delete: false,
                  edit: false,
                  download: true,
                  mealplanner: true,
                  shoppingList: true,
                  print: false,
                  printPreferences: false,
                  share: true,
                }"
                @deleted="$emit('delete', slug)"
              />
            </v-card-actions>
            </slot>
        </v-list-item>
        <slot />
      </v-card>
    </v-expand-transition>
  </div>
</template>

<script lang="ts">
import RecipeFavoriteBadge from "./RecipeFavoriteBadge.vue";
import RecipeContextMenu from "./RecipeContextMenu.vue";
import RecipeCardImage from "./RecipeCardImage.vue";
import RecipeRating from "./RecipeRating.vue";
import RecipeChips from "./RecipeChips.vue";
import { useLoggedInState } from "~/composables/use-logged-in-state";

export default defineNuxtComponent({
  components: {
    RecipeFavoriteBadge,
    RecipeContextMenu,
    RecipeRating,
    RecipeCardImage,
    RecipeChips,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      required: false,
      default: "abc123",
    },
    tags: {
      type: Array,
      default: () => [],
    },
    recipeId: {
      type: String,
      required: true,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
    isFlat: {
      type: Boolean,
      default: false,
    },
    height: {
      type: [Number, String],
      default: 150,
    },
    imageHeight: {
      type: [Number, String],
      default: "fill-height",
    },
  },
  emits: ["selected", "delete"],
  setup(props) {
    const $auth = useMealieAuth();
    const { isOwnGroup } = useLoggedInState();

    const route = useRoute();
    const groupSlug = computed(() => route.params.groupSlug || $auth.user.value?.groupSlug || "");
    const showRecipeContent = computed(() => props.recipeId && props.slug);
    const recipeRoute = computed<string>(() => {
      return showRecipeContent.value ? `/g/${groupSlug.value}/r/${props.slug}` : "";
    });
    const cursor = computed(() => showRecipeContent.value ? "pointer" : "auto");

    return {
      isOwnGroup,
      recipeRoute,
      showRecipeContent,
      cursor,
    };
  },
});
</script>

<style scoped>
:deep(.v-list-item__prepend) {
  height: 100%;
}
.v-mobile-img {
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 0;
}
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.8;
  position: absolute;
  width: 100%;
}
.v-card--text-show {
  opacity: 1 !important;
}
.headerClass {
  white-space: nowrap;
  word-break: normal;
  overflow: hidden;
  text-overflow: ellipsis;
}

.text-top {
  align-self: start !important;
}

.flat,
.theme--dark .flat {
  box-shadow: none !important;
  background-color: transparent !important;
}
</style>
