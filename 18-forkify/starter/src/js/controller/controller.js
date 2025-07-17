import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from '../model/RecipeModel.js';
import SpinnerView from '../view/SpinnerView.js';
import recipeView from '../view/RecipeView.js';

const getRecipeIdFromHash = function () {
  return window.location.hash.slice(1);
};
const showRecipe = async function (recipeId) {
  console.log(recipeId);
  const container = document.querySelector('.recipe');
  try {
    SpinnerView.render(container);
    await model.loadRecipe(recipeId);
    recipeView.render(model.state.recipe);
    recipeView.addHandlerUpdateServings(increase => {
      model.updateServings(increase);
      recipeView.render(model.state.recipe);
    });
  } catch (err) {
    recipeView.renderError(err);
  } finally {
    SpinnerView.stop();
  }
};

const init = async function () {
  recipeView.addHandlerRender(() => {
    const id = getRecipeIdFromHash();
    if (id) showRecipe(id);
  });
  //const recipeId = '5ed6604591c37cdc054bc886';
};

init();
