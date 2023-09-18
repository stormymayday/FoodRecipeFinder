const showRecipe = async () => {

    try {

        const response = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcd09');

        const data = await response.json();

        if (!response.ok) throw new Error(`${data.message} (${response.status})`);

        let { recipe } = data.data;

        recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
        }

        console.log(recipe);

    } catch (error) {

        alert(error);

    }

};

export default showRecipe;