<template>
	<div>
		<v-text-field
			v-if="modelValue.title || showTitle"
			v-model="modelValue.title"
			density="compact"
			hide-details
			class="mx-1 mt-3 mb-4"
			:placeholder="$t('recipe.section-title')"
			style="max-width: 500px"
			@click="$emit('clickIngredientField', 'title')"
		/>
		<v-row
			:no-gutters="mdAndUp"
			density="compact"
			class="d-flex flex-wrap my-1"
		>
			<v-col
				v-if="!disableAmount"
				sm="12"
				md="2"
				cols="12"
				class="flex-grow-0 flex-shrink-0"
			>
				<v-text-field
					v-model="modelValue.quantity"
					variant="solo"
					hide-details
					density="compact"
					type="number"
					:placeholder="$t('recipe.quantity')"
					@keypress="quantityFilter"
				>
					<template #prepend>
						<v-icon
							v-if="$attrs && $attrs.delete"
							class="mr-n1 handle"
						>
							{{ $globals.icons.arrowUpDown }}
						</v-icon>
					</template>
				</v-text-field>
			</v-col>
			<v-col
				v-if="!disableAmount"
				sm="12"
				md="3"
				cols="12"
			>
				<v-autocomplete
					ref="unitAutocomplete"
					v-model="modelValue.unit"
					v-model:search-input="unitSearch"
					auto-select-first
					hide-details
					density="compact"
					variant="solo"
					return-object
					:items="units || []"
					item-title="name"
					class="mx-1"
					:placeholder="$t('recipe.choose-unit')"
					clearable
					@keyup.enter="handleUnitEnter"
				>
					<template #no-data>
						<div class="caption text-center pb-2">
							{{ $t("recipe.press-enter-to-create") }}
						</div>
					</template>
					<template #append-item>
						<div class="px-2">
							<BaseButton
								block
								size="small"
								@click="createAssignUnit()"
							/>
						</div>
					</template>
				</v-autocomplete>
			</v-col>

			<!-- Foods Input -->
			<v-col
				v-if="!disableAmount"
				m="12"
				md="3"
				cols="12"
				class=""
			>
				<v-autocomplete
					ref="foodAutocomplete"
					v-model="modelValue.food"
					v-model:search-input="foodSearch"
					auto-select-first
					hide-details
					density="compact"
					variant="solo"
					return-object
					:items="foods || []"
					item-title="name"
					class="mx-1 py-0"
					:placeholder="$t('recipe.choose-food')"
					clearable
					@keyup.enter="handleFoodEnter"
				>
					<template #no-data>
						<div class="caption text-center pb-2">
							{{ $t("recipe.press-enter-to-create") }}
						</div>
					</template>
					<template #append-item>
						<div class="px-2">
							<BaseButton
								block
								size="small"
								@click="createAssignFood()"
							/>
						</div>
					</template>
				</v-autocomplete>
			</v-col>
			<v-col
				sm="12"
				md=""
				cols="12"
			>
				<div class="d-flex">
					<v-text-field
						v-model="modelValue.note"
						hide-details
						density="compact"
						variant="solo"
						:placeholder="$t('recipe.notes')"
						@click="$emit('clickIngredientField', 'note')"
					>
						<template #prepend>
							<v-icon
								v-if="disableAmount && $attrs && $attrs.delete"
								class="mr-n1 handle"
							>
								{{ $globals.icons.arrowUpDown }}
							</v-icon>
						</template>
					</v-text-field>
					<BaseButtonGroup
						hover
						:large="false"
						class="my-auto d-flex"
						:buttons="btns"
						@toggle-section="toggleTitle"
						@toggle-original="toggleOriginalText"
						@insert-above="$emit('insert-above')"
						@insert-below="$emit('insert-below')"
						@insert-ingredient="$emit('insert-ingredient')"
						@delete="$emit('delete')"
					/>
				</div>
			</v-col>
		</v-row>
		<p
			v-if="showOriginalText"
			class="text-caption"
		>
			{{ $t("recipe.original-text-with-value", { originalText: modelValue.originalText }) }}
		</p>

		<v-divider
			v-if="!mdAndUp"
			class="my-4"
		/>
	</div>
</template>

<script lang="ts">
import { useFoodStore, useFoodData, useUnitStore, useUnitData } from "~/composables/store";
import { validators } from "~/composables/use-validators";
import type { RecipeIngredient } from "~/lib/api/types/recipe";

export default defineNuxtComponent({
	props: {
		modelValue: {
			type: Object as () => RecipeIngredient,
			required: true,
		},
		disableAmount: {
			type: Boolean,
			default: false,
		},
		allowInsertIngredient: {
			type: Boolean,
			default: false,
		},
	},
	emits: ["clickIngredientField"],
	setup(props, { attrs: listeners }) {
		const { mdAndUp } = useDisplay();
		const i18n = useI18n();
		const { $globals } = useNuxtApp();

		const contextMenuOptions = computed(() => {
			const options = [
				{
					text: i18n.t("recipe.toggle-section"),
					event: "toggle-section",
				},
				{
					text: i18n.t("recipe.insert-above"),
					event: "insert-above",
				},
				{
					text: i18n.t("recipe.insert-below"),
					event: "insert-below",
				},
			];

			if (props.allowInsertIngredient) {
				options.push({
					text: i18n.t("recipe.insert-ingredient"),
					event: "insert-ingredient",
				});
			}

			// FUTURE: add option to parse a single ingredient
			// if (!value.food && !value.unit && value.note) {
			//   options.push({
			//     text: "Parse Ingredient",
			//     event: "parse-ingredient",
			//   });
			// }

			if (props.modelValue.originalText) {
				options.push({
					text: i18n.t("recipe.see-original-text"),
					event: "toggle-original",
				});
			}

			return options;
		});

		const btns = computed(() => {
			const out = [
				{
					icon: $globals.icons.dotsVertical,
					text: i18n.t("general.menu"),
					event: "open",
					children: contextMenuOptions.value,
				},
			];

			if (listeners && listeners.delete) {
				// @ts-expect-error - TODO: fix this
				out.unshift({
					icon: $globals.icons.delete,
					text: i18n.t("general.delete"),
					event: "delete",
				});
			}

			return out;
		});

		// ==================================================
		// Foods
		const foodStore = useFoodStore();
		const foodData = useFoodData();
		const foodSearch = ref("");
		const foodAutocomplete = ref<HTMLInputElement>();

		async function createAssignFood() {
			foodData.data.name = foodSearch.value;
			props.modelValue.food = await foodStore.actions.createOne(foodData.data) || undefined;
			foodData.reset();
			foodAutocomplete.value?.blur();
		}

		// ==================================================
		// Units
		const unitStore = useUnitStore();
		const unitsData = useUnitData();
		const unitSearch = ref("");
		const unitAutocomplete = ref<HTMLInputElement>();

		async function createAssignUnit() {
			unitsData.data.name = unitSearch.value;
			props.modelValue.unit = await unitStore.actions.createOne(unitsData.data) || undefined;
			unitsData.reset();
			unitAutocomplete.value?.blur();
		}

		const state = reactive({
			showTitle: false,
			showOriginalText: false,
		});

		function toggleTitle() {
			if (state.showTitle) {
				props.modelValue.title = "";
			}
			state.showTitle = !state.showTitle;
		}

		function toggleOriginalText() {
			state.showOriginalText = !state.showOriginalText;
		}

		function handleUnitEnter() {
			if (
				props.modelValue.unit === undefined
				|| props.modelValue.unit === null
				|| !props.modelValue.unit.name.includes(unitSearch.value)
			) {
				createAssignUnit();
			}
		}

		function handleFoodEnter() {
			if (
				props.modelValue.food === undefined
				|| props.modelValue.food === null
				|| !props.modelValue.food.name.includes(foodSearch.value)
			) {
				createAssignFood();
			}
		}

		function quantityFilter(e: KeyboardEvent) {
			// if digit is pressed, add to quantity
			if (e.key === "-" || e.key === "+" || e.key === "e") {
				e.preventDefault();
			}
		}

		return {
			...toRefs(state),
			quantityFilter,
			toggleOriginalText,
			contextMenuOptions,
			handleUnitEnter,
			handleFoodEnter,
			foodAutocomplete,
			createAssignFood,
			unitAutocomplete,
			createAssignUnit,
			foods: foodStore.store,
			foodSearch,
			toggleTitle,
			unitActions: unitStore.actions,
			units: unitStore.store,
			unitSearch,
			validators,
			workingUnitData: unitsData.data,
			btns,
			mdAndUp,
		};
	},
});
</script>

<style>
.v-input__append-outer {
	margin: 0 !important;
	padding: 0 !important;
}
</style>
