export const fetchRecipe = async function (id) {
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    const { recipe } = data.data;
    return {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      updatedServings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (err) {
    throw err;
  }
};

export const calculateIngredients = function (
  recipe,
  servings = recipe.updatedServings
) {
  //console.log(`#getIngredientsForServings:`, recipe, servings);
  const multiplier =
    servings === recipe.servings ? 1 : +(servings / recipe.servings).toFixed(2);
  console.log('multiplier:', multiplier);

  const adjustedIngredients = recipe.ingredients.map(ingredient => {
    const newIngredient = { ...ingredient };
    newIngredient.quantity = newIngredient.quantity
      ? newIngredient.quantity * multiplier
      : null;
    return newIngredient;
  });
  return adjustedIngredients;
};
