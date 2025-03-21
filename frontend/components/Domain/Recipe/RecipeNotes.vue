<template>
  <div
    v-if="modelValue.length > 0 || edit"
    class="mt-8"
  >
    <h2 class="my-4">
      {{ $t("recipe.note") }}
    </h2>
    <div
      v-for="(note, index) in modelValue"
      :id="'note' + index"
      :key="'note' + index"
      class="mt-1"
    >
      <v-card v-if="edit">
        <v-card-text>
          <div class="d-flex align-center">
            <v-text-field
              v-model="modelValue[index]['title']"
              :label="$t('recipe.title')"
            />
            <v-btn
              icon
              class="mr-2"
              elevation="0"
              @click="removeByIndex(modelValue, index)"
            >
              <v-icon>{{ $globals.icons.delete }}</v-icon>
            </v-btn>
          </div>
          <v-textarea
            v-model="modelValue[index]['text']"
            auto-grow
            :placeholder="$t('recipe.note')"
          />
        </v-card-text>
      </v-card>
      <div v-else>
        <v-card-title class="text-subtitle-1 font-weight-medium py-1">
          {{ note.title }}
        </v-card-title>
        <v-card-text>
          <SafeMarkdown :source="note.text" />
        </v-card-text>
      </div>
    </div>

    <div
      v-if="edit"
      class="d-flex justify-end"
    >
      <BaseButton
        class="ml-auto my-2"
        @click="addNote"
      >
        {{ $t("general.add") }}
      </BaseButton>
    </div>
  </div>
</template>

<script lang="ts">
import type { RecipeNote } from "~/lib/api/types/recipe";

export default defineNuxtComponent({
  props: {
    modelValue: {
      type: Array as () => RecipeNote[],
      required: false,
      default: () => [],
    },

    edit: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    function addNote() {
      const newNotes = [...props.modelValue, { title: "", text: "" }];
      emit("update:modelValue", newNotes);
    }

    function removeByIndex(list: RecipeNote[], index: number) {
      const newNotes = [...props.modelValue];
      newNotes.splice(index, 1);
      emit("update:modelValue", newNotes);
    }

    return {
      addNote,
      removeByIndex,
    };
  },
});
</script>

<style></style>
