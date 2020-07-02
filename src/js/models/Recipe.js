import axios from 'axios';

export default class Recipe {
	constructor(id) {
		this.id = id;
	}

	async getRecipe() {
		try {
			const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);

			this.title = res.data.recipe.title;
			this.author = res.data.recipe.publisher;
			this.img = res.data.recipe.image_url;
			this.url = res.data.recipe.source_url;
			this.ingredients = res.data.recipe.ingredients;
		} catch (error) {
			console.log(error);
			alert('Something went wrong.');
		}
	}

	// Class methods
	calcCookingTime() {
		// Assuming 15 min of cooking time per 3 ingredients
		const numOfIngredients = this.ingredients.length;
		const periods = Math.ceil(numOfIngredients / 3);
		this.cookingTime = periods * 15;
	}

	calcServings() {
		this.servings = 4;
	}

	// Standardizing ingredients format
	parseIngredients() {
		const unitsLong = [ 'tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds' ];
		const unitsShort = [ 'tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound' ];
		const units = [ ...unitsShort, 'kg', 'g' ];

		const newIngredients = this.ingredients.map((el) => {
			// Shortening measurement units
			let ingredient = el.toLowerCase();
			unitsLong.forEach((unit, i) => {
				ingredient = ingredient.replace(unit, unitsShort[i]);
			});

			// Removing parentheses
			ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

			// Parsing ingredients into count, unit, and ingredient
			// Converting ingredient into an array
			const arrIngredient = ingredient.split(' ');

			// Finding index (location) of unit of measurement
			const unitIndex = arrIngredient.findIndex((element) => units.includes(element));

			let objIngredient;

			if (unitIndex > -1) {
				// A unit of measurement was found
				const arrCount = arrIngredient.slice(0, unitIndex);

				let count;
				if (arrCount.length === 1) {
					count = eval(arrIngredient[0].replace('-', '+'));
					// count = Math.round(eval(arrIngredient[0].replace('-', '+')) * 100) / 100;
				} else {
					count = eval(arrIngredient.slice(0, unitIndex).join('+'));
					// count = Math.round(eval(arrIngredient.slice(0, unitIndex).join('+')) * 100) / 100;
				}

				objIngredient = {
					count: count,
					unit: arrIngredient[unitIndex],
					ingredient: arrIngredient.slice(unitIndex + 1).join(' ')
				};
			} else if (parseInt(arrIngredient[0], 10)) {
				// A unit of measurement was not found but first element is a number
				objIngredient = {
					count: parseInt(arrIngredient[0], 10),
					unit: '',
					ingredient: arrIngredient.slice(1).join(' ')
				};
			} else if (unitIndex === -1) {
				// A unit of measurement was not found and first element is NaN
				objIngredient = {
					count: '',
					unit: '',
					ingredient: ingredient
				};
			}

			return objIngredient;
		});

		this.ingredients = newIngredients;
	}

	updateServings(type) {
		// Decreasing / Increasing servings
		const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;

		// Updating ingredients
		this.ingredients.forEach((ing) => {
			ing.count *= newServings / this.servings;
		});

		// Updating servings
		this.servings = newServings;
	}
}
