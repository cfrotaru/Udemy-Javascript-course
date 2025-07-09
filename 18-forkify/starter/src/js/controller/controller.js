import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { fetchRecipe, getRecipeIdFromHash } from '../model/RecipeModel.js';
import SpinnerView from '../view/SpinnerView.js';
import RecipeView from '../view/RecipeView.js';

const getRecipe = async function (recipeId) {
  console.log(recipeId);
  const container = document.querySelector('.recipe');
  try {
    SpinnerView.render(container);
    const recipe = await fetchRecipe(recipeId);
    const view = new RecipeView();
    view.render(recipe);
  } catch (err) {
    alert(err);
    console.error(err);
  } finally {
    SpinnerView.stop();
  }
};

const controlRecipe = async function () {
  ['hashchange', 'load'].forEach(ev =>
    window.addEventListener(ev, () => {
      const id = getRecipeIdFromHash();
      if (id) getRecipe(id);
    })
  );
  //const recipeId = '5ed6604591c37cdc054bc886';
};

controlRecipe();
