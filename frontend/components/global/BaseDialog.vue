<template>
  <div>
    <slot name="activator" v-bind="{ open }" />
    <v-dialog v-model="dialog" absolute :width="width" :max-width="maxWidth ?? undefined"
      :content-class="top ? 'top-dialog' : undefined" :fullscreen="$vuetify.display.xs" @keydown.enter="
        emit('submit');
      dialog = false;
      " @click:outside="emit('cancel')" @keydown.esc="emit('cancel')">
      <v-card height="100%">
        <v-app-bar dark density="comfortable" :color="color" class="px-3">
          <v-icon size="large">
            {{ icon }}
          </v-icon>
          <v-toolbar-title class="headline"> {{ title }} </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-app-bar>
        <v-progress-linear v-if="loading" class="mt-1" indeterminate color="primary"></v-progress-linear>

        <div>
          <slot v-bind="{ submitEvent }" />
        </div>

        <v-divider class="mx-2"></v-divider>

        <v-card-actions>
          <slot name="card-actions">
            <v-btn variant="text" color="grey" @click="
              dialog = false;
            emit('cancel');
            ">
              {{ $t("general.cancel") }}
            </v-btn>
            <v-spacer></v-spacer>

            <slot name="custom-card-action"></slot>
            <BaseButton v-if="$attrs.delete" delete secondary @click="deleteEvent" />
            <BaseButton v-if="$attrs.confirm" :color="color" type="submit" :disabled="submitDisabled" @click="
              emit('confirm');
            dialog = false;
            ">
              <template #icon>
                {{ $globals.icons.check }}
              </template>
              {{ $t("general.confirm") }}
            </BaseButton>
            <BaseButton v-if="$attrs.submit" type="submit" :disabled="submitDisabled" @click="submitEvent">
              {{ submitText }}
              <template v-if="submitIcon" #icon>
                {{ submitIcon }}
              </template>
            </BaseButton>
          </slot>
        </v-card-actions>

        <div v-if="$slots['below-actions']" class="pb-4">
          <slot name="below-actions"> </slot>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { useNuxtApp } from '#app';

interface DialogProps {
  modelValue: boolean;
  color?: string;
  title?: string;
  icon?: string | null;
  width?: number | string;
  maxWidth?: number | string | null;
  loading?: boolean;
  top?: boolean | null;
  submitIcon?: string | null;
  submitText?: string;
  submitDisabled?: boolean;
  keepOpen?: boolean;
}

interface DialogEmits {
  (e: 'update:modelValue', value: boolean): void;
  (e: 'submit'): void;
  (e: 'cancel'): void;
  (e: 'confirm'): void;
  (e: 'delete'): void;
  (e: 'close'): void;
}

// Using TypeScript interface with withDefaults for props
const props = withDefaults(defineProps<DialogProps>(), {
  color: "primary",
  title: "Modal Title",
  icon: null,
  width: "500",
  maxWidth: null,
  loading: false,
  top: null,
  submitIcon: null,
  submitText: () => useNuxtApp().$i18n.t("general.create"),
  submitDisabled: false,
  keepOpen: false,
});
const emit = defineEmits<DialogEmits>();

const dialog = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});

const submitted = ref(false);

const determineClose = computed(() => {
  return submitted.value && !props.loading && !props.keepOpen;
});

watch(determineClose, (shouldClose) => {
  if (shouldClose) {
    submitted.value = false;
    dialog.value = false;
  }
});

watch(dialog, (val) => {
  if (val) submitted.value = false;
  if (!val) emit('close');
});

function submitEvent() {
  emit('submit');
  submitted.value = true;
}

function deleteEvent() {
  emit('delete');
  submitted.value = true;
}

function open() {
  dialog.value = true;
  logDeprecatedProp('open');
}

function close() {
  dialog.value = false;
  logDeprecatedProp('close');
}

function logDeprecatedProp(val: string) {
  console.warn(
    `[BaseDialog] The method '${val}' is deprecated. Please use v-model="value" to manage state instead.`
  );
}
</script>

<style>
.top-dialog {
  position: fixed;
  top: 0;
}
</style>
