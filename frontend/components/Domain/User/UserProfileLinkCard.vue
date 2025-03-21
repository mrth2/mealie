<template>
  <v-card
    variant="outlined"
    nuxt
    :to="link.to"
    height="100%"
    class="d-flex flex-column"
  >
    <div
      v-if="$vuetify.display.smAndDown"
      class="pa-2 mx-auto"
    >
      <v-img
        max-width="150px"
        max-height="125"
        :src="image"
      />
    </div>
    <div class="d-flex justify-space-between">
      <div>
        <v-card-title class="headline pb-0">
          <slot name="title" />
        </v-card-title>
        <div class="d-flex justify-center align-center">
          <v-card-text class="d-flex flex-row mb-auto">
            <slot name="default" />
          </v-card-text>
        </div>
      </div>
      <div
        v-if="$vuetify.display.mdAndUp"
        class="py-2 px-10 my-auto"
      >
        <v-img
          max-width="150px"
          max-height="125"
          :src="image"
        />
      </div>
    </div>
    <v-divider class="mt-auto" />
    <v-card-actions>
      <v-btn
        variant="text"
        color="info"
        :to="link.to"
      >
        {{ link.text }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
interface LinkProp {
  text: string;
  url?: string;
  to: string;
}

export default defineNuxtComponent({
  props: {
    link: {
      type: Object as () => LinkProp,
      required: true,
    },
    image: {
      type: String,
      required: false,
      default: "",
    },
  },
});
</script>
