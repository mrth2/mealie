<template>
  <JsonEditorVue
    :modelValue="modelValue"
    v-bind="$attrs"
    :style="{ height }"
    :stringified="false"
    @change="onChange"
  />
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import JsonEditorVue from 'json-editor-vue'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
  height: {
    type: String,
    default: '1500px',
  },
})

const emit = defineEmits(['update:modelValue'])

function parseEvent(event: any): object {
  if (!event) {
    return {};
  }

  try {
    if (event.json) {
      return event.json;
    }
    else if (event.text) {
      return JSON.parse(event.text);
    }
    else {
      return event;
    }
  } catch {
    return {};
  }
}

function onChange(event: any) {
  emit('update:modelValue', parseEvent(event));
}
</script>
