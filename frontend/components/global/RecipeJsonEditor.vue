<template>
  <JsonEditorVue
    v-model="modelValue"
    v-bind="$attrs"
    :style="{ height }"
    @input="$emit('update:modelValue', $event)"
  />
</template>

<script lang="ts">
import JsonEditorVue from 'json-editor-vue'

export default defineNuxtComponent({
  components: { JsonEditorVue },
  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },
    height: {
      type: String,
      default: "1500px",
    },
  },
  emits: ["update:modelValue"],
});
</script>
