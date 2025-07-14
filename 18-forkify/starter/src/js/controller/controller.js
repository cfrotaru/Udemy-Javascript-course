import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from '../model/RecipeModel.js';
import SpinnerView from '../view/SpinnerView.js';
import RecipeView from '../view/RecipeView.js';

const getRecipeIdFromHash = function () {
  return window.location.hash.slice(1);
};
const showRecipe = async function (recipeId) {
  console.log(recipeId);
  const container = document.querySelector('.recipe');
  try {
    SpinnerView.render(container);
    await model.loadRecipe(recipeId);
    const view = new RecipeView();
    view.render(model.state.recipe);
    view.addHandlerUpdateServings(increase => {
      model.updateServings(increase);
      view.render(model.state.recipe);
    });
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
      if (id) showRecipe(id);
    })
  );
  //const recipeId = '5ed6604591c37cdc054bc886';
};

controlRecipe();
