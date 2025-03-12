<script lang="ts">
export default defineNuxtComponent({
  setup(props) {
    const { $vuetify } = useNuxtApp();
    const imageHeight = computed(() => {
      return $vuetify.display.xs.value ? "200" : "400";
    });

    return {
      imageHeight,
    };
  },
});
</script>
