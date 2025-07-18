import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from '../model/recipeModel.js';
import recipeView from '../view/recipeView.js';
import searchView from '../view/searchView.js';
import resultsView from '../view/resultsView.js';
import paginationView from '../view/paginationView.js';

const getRecipeIdFromHash = function () {
  return window.location.hash.slice(1);
};
const showRecipe = async function (recipeId) {
  console.log(recipeId);
  try {
    recipeView.renderSpinner();
    await model.loadRecipe(recipeId);
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  } finally {
    recipeView.stopSpinner();
  }
};

const controlRecipe = async function () {
  const id = getRecipeIdFromHash();
  if (id) showRecipe(id);
};

const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;

    resultsView.renderSpinner();
    await model.loadSearchResults(query);

    resultsView.render(model.getResultsPage());

    paginationView.updatePaginationButtons(model.getPaginationDetails());

    paginationView.addHandlerPagination(increase => {
      model.updateResultsPage(increase);
      paginationView.updatePaginationButtons(model.getPaginationDetails());
      resultsView.render(model.getResultsPage());
    });
  } catch (err) {
    recipeView.renderError(err);
  } finally {
    resultsView.stopSpinner();
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
  recipeView.addHandlerUpdateServings(increase => {
    model.updateServings(increase);
    recipeView.render(model.state.recipe);
  });
  paginationView.markupRender();
  //const recipeId = '5ed6604591c37cdc054bc886';
};
init();
