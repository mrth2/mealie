// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
	// Your custom configs here
	rules: {
		"@typescript-eslint/no-explicit-any": "off",
		"vue/no-mutating-props": "warn",
		"vue/no-v-html": "warn",
		"object-curly-newline": "off",
		"consistent-list-newline": "off",
		"vue/first-attribute-linebreak": "off",
	},
});
