
import type { LocaleObject } from "@nuxtjs/i18n";
import { LOCALES } from "./available-locales";

export const useLocales = () => {
  const i18n = useI18n();

  function getLocale(value: string) {
    const currentLocale = LOCALES.filter((locale) => locale.value === value);
    return currentLocale.length ? currentLocale[0] : null;
  }
  const { isRtl } = useRtl();
  const { current } = useLocale();

  const locale = computed<LocaleObject['code']>({
    get() {
      // dirty hack
      const currentLocale = getLocale(current.value);
      if (currentLocale) {
        isRtl.value = currentLocale.dir === "rtl";
      }

      return i18n.locale.value;
    },
    set(value) {
      i18n.setLocale(value);

      // this does not persist after window reload :-(
      current.value = value;
      const currentLocale = getLocale(value);
      if (currentLocale) {
        isRtl.value = currentLocale.dir === "rtl";
      }

      // Reload the page to update the language - not all strings are reactive
      window.location.reload();
    },
  });

  return {
    locale,
    locales: LOCALES,
    i18n,
  };
};
