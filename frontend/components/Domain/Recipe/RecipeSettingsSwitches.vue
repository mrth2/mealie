<template>
  <div>
    <v-switch
      v-for="(_, key) in modelValue"
      :key="key"
      v-model="modelValue[key]"
      color="primary"
      xs
      density="compact"
      :disabled="key == 'locked' && !isOwner"
      class="my-1"
      :label="labels[key]"
      hide-details
    />
  </div>
</template>

<script lang="ts">
import type { RecipeSettings } from "~/lib/api/types/recipe";

export default defineNuxtComponent({
  props: {
    modelValue: {
      type: Object as () => RecipeSettings,
      required: true,
    },
    isOwner: {
      type: Boolean,
      required: false,
    },
  },
  setup() {
    const i18n = useI18n();
    const labels: Record<keyof RecipeSettings, string> = {
      public: i18n.t("recipe.public-recipe"),
      showNutrition: i18n.t("recipe.show-nutrition-values"),
      showAssets: i18n.t("asset.show-assets"),
      landscapeView: i18n.t("recipe.landscape-view-coming-soon"),
      disableComments: i18n.t("recipe.disable-comments"),
      disableAmount: i18n.t("recipe.disable-amount"),
      locked: i18n.t("recipe.locked"),
    };

    return {
      labels,
    };
  },
});
</script>

<style lang="scss" scoped></style>
