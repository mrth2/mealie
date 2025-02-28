import { alert } from "~/composables/use-toast";

export default defineNuxtPlugin(() => {
  const { $axios } = useNuxtApp();
  $axios.interceptors.response.use(res => {
    if (res?.data?.message) {
      alert.info(res.data.message as string);
    }
    return res;
  }, err => {
    if (err?.response?.data?.detail?.message) {
      alert.error(err.response.data.detail.message as string);
    }
    return Promise.reject(err);
  });
  return {}
});
