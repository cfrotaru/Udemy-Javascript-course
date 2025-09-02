import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from '../model/recipeModel.js';
import recipeView from '../view/recipeView.js';
import searchView from '../view/searchView.js';
import resultsView from '../view/resultsView.js';
import paginationView from '../view/paginationView.js';
import bookmarksView from '../view/bookmarksView.js';
import addRecipeView from '../view/addRecipeView.js';
import { MODAL_CLOSE_SEC } from '../config/config.js';

const getRecipeIdFromHash = function () {
  return window.location.hash.slice(1);
};
const showRecipe = async function (recipeId) {
  try {
    recipeView.renderSpinner();

    resultsView.update(model.getResultsPage());
    bookmarksView.update(model.getBookmarks());

    await model.loadRecipe(recipeId);

    recipeView.render(model.getRecipe());
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
  recipeView.update(model.getRecipe());
};

const controlBookmarks = function () {
  model.toggleRecipeBookmark(model.getRecipe());
  recipeView.update(model.getRecipe());
  bookmarksView.render(model.getBookmarks());
};

const controlAddRecipe = async function (formData) {
  try {
    addRecipeView.renderSpinner();

    await model.uploadRecipe(formData);

    recipeView.render(model.getRecipe());
    bookmarksView.render(model.getBookmarks());
    window.location.hash = model.getRecipeId();

    addRecipeView.renderMessage();

    setTimeout(function () {
      addRecipeView.toggleModal(false);
    }, MODAL_CLOSE_SEC * 1000);
  } catch (error) {
    addRecipeView.renderError(error.message);
  }
};

const addHandlers = function () {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerUpdateBookmark(controlBookmarks);

  searchView.addHandlerSearch(controlSearchResults);

  paginationView.addHandlerPagination(controlPagination);

  addRecipeView.addHandlerUpload(controlAddRecipe);
};

const init = function () {
  model.getLocalStorageBookmarks();
  bookmarksView.render(model.getBookmarks());

  paginationView.markupRender();
  addHandlers();
  //const recipeId = '5ed6604591c37cdc054bc886';
};
init();
