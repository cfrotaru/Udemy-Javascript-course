import { API_URL } from '../config/config.js';
import { getJSON } from '../helpers/helpers.js';

export const state = {
  recipe: {},
};
export const loadRecipe = async function (id) {
  const data = await getJSON(`${API_URL}/${id}`);

  const { recipe } = data.data;
  state.recipe = {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    updatedServings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    updatedIngredients: recipe.ingredients,
  };
};

export const updateServings = function (increase = true) {
  const { recipe } = state;

  const newServings = recipe.updatedServings + (increase ? 1 : -1);
  if (newServings < 1) return;

  const multiplier = +(newServings / recipe.servings).toFixed(2);

  recipe.updatedIngredients = recipe.ingredients.map(ing => {
    return {
      ...ing,
      quantity: ing.quantity ? +(ing.quantity * multiplier).toFixed(2) : null,
    };
  });

  recipe.updatedServings = newServings;
};
