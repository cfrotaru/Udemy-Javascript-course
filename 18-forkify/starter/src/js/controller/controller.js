import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from '../model/recipeModel.js';
import spinnerView from '../view/spinnerView.js';
import recipeView from '../view/recipeView.js';
import searchView from '../view/searchView.js';

const getRecipeIdFromHash = function () {
  return window.location.hash.slice(1);
};
const showRecipe = async function (recipeId) {
  console.log(recipeId);
  try {
    spinnerView.renderRecipeContainerSpinner();
    await model.loadRecipe(recipeId);
    recipeView.render(model.state.recipe);
    recipeView.addHandlerUpdateServings(increase => {
      model.updateServings(increase);
      recipeView.render(model.state.recipe);
    });
  } catch (err) {
    recipeView.renderError();
  } finally {
    spinnerView.stop();
  }
};

const controlRecipe = async function () {
  const id = getRecipeIdFromHash();
  if (id) showRecipe(id);
};

const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    console.log(query);
    if (!query) return;
    spinnerView.renderRecipesNavigationListSpinner();
    await model.loadSearchResults(query);
  } catch (err) {
    console.log(err);
  } finally {
    spinnerView.stop();
  }
};

const init = async function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
  //const recipeId = '5ed6604591c37cdc054bc886';
};
init();
