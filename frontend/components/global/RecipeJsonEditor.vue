<template>
	<VJsoneditor
		:value="modelValue"
		:height="height"
		:options="options"
		:attrs="$attrs"
		@input="$emit('update:modelValue', $event)"
	/>
</template>

<script lang="ts">
import VJsoneditor from "v-jsoneditor";

export default defineNuxtComponent({
	components: { VJsoneditor },
	props: {
		modelValue: {
			type: Object,
			default: () => ({}),
		},
		height: {
			type: String,
			default: "1500px",
		},
		options: {
			type: Object,
			default: () => ({}),
		},
	},
	emits: ["update:modelValue"],
});
</script>
