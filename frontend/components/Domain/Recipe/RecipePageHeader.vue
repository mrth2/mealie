<script lang="ts">
export default defineNuxtComponent({
  setup(props) {
    const breakpoint = useDisplay();

    const imageHeight = computed(() => {
      return breakpoint.xs.value ? "200" : "400";
    });


    return {
      imageHeight,
      breakpoint,
    };
  },
});
</script>
