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
  } catch (err) {
    recipeView.renderError(err);
  } finally {
    resultsView.stopSpinner();
  }
};

const controlPagination = function (increase) {
  model.updateResultsPage(increase);
  paginationView.updatePaginationButtons(model.getPaginationDetails());
  resultsView.render(model.getResultsPage());
};

const controlServings = function (increase) {
  model.updateServings(increase);
  recipeView.render(model.state.recipe);
};

const addHandlers = function () {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);

  searchView.addHandlerSearch(controlSearchResults);

  paginationView.addHandlerPagination(controlPagination);
};

const init = function () {
  paginationView.markupRender();
  addHandlers();
  //const recipeId = '5ed6604591c37cdc054bc886';
};
init();
