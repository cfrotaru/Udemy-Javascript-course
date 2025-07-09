import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { fetchRecipe, calculateIngredients } from '../model/RecipeModel.js';
import SpinnerView from '../view/SpinnerView.js';
import RecipeView from '../view/RecipeView.js';

const controlRecipe = async function () {
  const recipeId = '5ed6604591c37cdc054bc886';
  const container = document.querySelector('.recipe');
  SpinnerView.render(container);

  try {
    const recipe = await fetchRecipe(recipeId);
    const view = new RecipeView();
    view.render(recipe);
  } catch (err) {
    alert(err);
    console.error(err);
  }
};

controlRecipe();
