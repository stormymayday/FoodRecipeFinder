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
}
