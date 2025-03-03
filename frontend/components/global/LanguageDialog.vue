<template>
  <BaseDialog v-model="dialog" :icon="$globals.icons.translate" :title="$t('language-dialog.choose-language')">
    <v-card-text>
      {{ $t("language-dialog.select-description") }}
      <v-autocomplete v-model="locale" :items="locales" item-text="name" class="my-3" hide-details outlined offset>
        <template #item="{ item }">
          <div>
            <v-list-item-title> {{ item.name }} </v-list-item-title>
            <v-list-item-subtitle> {{ item.progress }}% {{ $t("language-dialog.translated") }} </v-list-item-subtitle>
          </div>
        </template>
      </v-autocomplete>
      <i18n-t keypath="language-dialog.how-to-contribute-description">
        <template #read-the-docs-link>
          <a href="https://docs.mealie.io/contributors/translating/" target="_blank">{{
            $t("language-dialog.read-the-docs")
          }}</a>
        </template>
      </i18n-t>
    </v-card-text>
  </BaseDialog>
</template>

<script lang="ts">

import type { LocaleObject } from "@nuxtjs/i18n";
import { useLocales } from "~/composables/use-locales";

export default defineNuxtComponent({
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const dialog = computed<boolean>({
      get() {
        return props.value;
      },
      set(val) {
        context.emit("input", val);
      },
    });

    const { locales: LOCALES, locale, i18n } = useLocales();

    const locales = LOCALES.filter((locale) =>
      (i18n.locales.value as LocaleObject[]).map((i18nLocale) => i18nLocale.code).includes(locale.value)
    );

    return {
      dialog,
      i18n,
      locales,
      locale,
    };
  },
});
</script>

<style scoped></style>
