import { API_URL, RES_PER_PAGE } from '../config/config.js';
import { getJSON } from '../helpers/helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    pagination: { currentPage: 1, lastPage: 1, pageResults: [] },
  },
};
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

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
  } catch (err) {
    throw err;
  }
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

export const loadSearchResults = async function (query) {
  try {
    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.query = query;
    updatePaginationDetails(1, Math.ceil(data.results / RES_PER_PAGE));

    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });

    updateResultsPage();
  } catch (err) {
    throw err;
  }
};

export const updateCurrentPage = function (isIncrease) {
  const { currentPage, lastPage } = getPaginationDetails();

  if (isIncrease && currentPage < lastPage)
    state.search.pagination.currentPage++;
  if (!isIncrease && currentPage > 1) state.search.pagination.currentPage--;

  return state.search.pagination.currentPage;
};

export const updateResultsPage = function (isIncrease) {
  let { currentPage } = getPaginationDetails();
  if (typeof isIncrease !== 'undefined')
    currentPage = updateCurrentPage(isIncrease);

  state.search.pagination.pageResults = getSearchResultsData().slice(
    (currentPage - 1) * RES_PER_PAGE,
    currentPage * RES_PER_PAGE
  );
};

export const updatePaginationDetails = function (currentPage, lastPage) {
  state.search.pagination = { currentPage, lastPage };
};

export const getPaginationDetails = function () {
  return state.search.pagination;
};

export const getResultsPage = function () {
  return state.search.pagination.pageResults;
};
export const getSearchData = function () {
  return state.search;
};

export const getSearchResultsData = function () {
  return state.search.results;
};
