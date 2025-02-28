import type { NuxtAxiosInstance } from "@nuxtjs/axios";
import { alert } from "~/composables/use-toast";

const toastPlugin: Plugin = ({ $axios }: { $axios: NuxtAxiosInstance }) => {

};

export default defineNuxtPlugin(() => {
  const { $axios } = useNuxtApp();
  $axios.onResponse((response) => {
    if (response?.data?.message) {
      alert.info(response.data.message as string);
    }
  });
  $axios.onError((error) => {
    if (error.response?.data?.detail?.message) {
      alert.error(error.response.data.detail.message as string);
    }
  });
  return {}
});
