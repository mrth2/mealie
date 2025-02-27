
import { useAsyncKey } from "../use-utils";
import { AppInfo } from "~/lib/api/types/admin";

export function useAppInfo(): Ref<AppInfo | null> {
  const appInfo = ref<null | AppInfo>(null);

  const { $axios, i18n } = useNuxtApp();
  $axios.setHeader("Accept-Language", i18n.locale);

  useAsync(async () => {
    const data = await $axios.get<AppInfo>("/api/app/about");
    appInfo.value = data.data;
  }, useAsyncKey());

  return appInfo;
}
