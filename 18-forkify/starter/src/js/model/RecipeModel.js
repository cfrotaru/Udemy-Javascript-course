import {
  API_URL,
  API_KEY,
  RES_PER_PAGE,
  BOOK_MARKS_KEY,
} from '../config/config.js';
import {
  getJSON,
  sendJSON,
  saveToLocalStorage,
  getFromLocalStorage,
} from '../helpers/helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    pagination: { currentPage: 1, lastPage: 1, pageResults: [] },
  },
  bookmarks: [],
};

const createRecipeObject = function (recipe) {
  return {
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
    bookmarked: isRecipeBookmarked(recipe),
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}?key=${API_KEY}`);

    const { recipe } = data.data;
    state.recipe = createRecipeObject(recipe);
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
    const data = await getJSON(`${API_URL}?search=${query}&key=${API_KEY}`);
    state.search.query = query;
    updatePaginationDetails(1, Math.ceil(data.results / RES_PER_PAGE));

    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
        ...(recipe.key && { key: recipe.key }),
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

export const getRecipeId = function () {
  return state.recipe.id;
};

export const getRecipe = function () {
  return state.recipe;
};

export const setRecipe = function (recipe) {
  state.recipe = recipe;
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

export const updateLocalStorageBookmarks = function () {
  saveToLocalStorage(BOOK_MARKS_KEY, state.bookmarks);
};
export const getLocalStorageBookmarks = function () {
  state.bookmarks = getFromLocalStorage(BOOK_MARKS_KEY) ?? [];
};
export const addRecipeBookmark = function (recipe) {
  state.bookmarks.push(recipe);
  state.recipe.bookmarked = true;
  updateLocalStorageBookmarks();
};

export const removeRecipeBookmark = function (recipeId) {
  state.bookmarks = state.bookmarks.filter(
    bookmark => bookmark.id !== recipeId
  );
  state.recipe.bookmarked = false;
  updateLocalStorageBookmarks();
};

export const toggleRecipeBookmark = function (recipe) {
  isRecipeBookmarked(recipe)
    ? removeRecipeBookmark(recipe.id)
    : addRecipeBookmark(recipe);
};

export const isRecipeBookmarked = function (recipe) {
  return state.bookmarks.some(bookmark => bookmark.id === recipe.id);
};

export const getBookmarks = function () {
  return state.bookmarks;
};

const formatIngredients = function (formData) {
  const quantities = formData.getAll('quantity[]');
  const units = formData.getAll('unit[]');
  const descriptions = formData.getAll('description[]');
  const ingredients = quantities.map((quantity, index) => ({
    quantity: +quantity || null,
    unit: units[index],
    description: descriptions[index],
  }));
  return ingredients;
};

export const uploadRecipe = async function (formData) {
  try {
    const recipeDataArray = [...formData];
    const recipeData = Object.fromEntries(recipeDataArray);

    const ingredients = formatIngredients(formData);

    const recipe = {
      title: recipeData.title,
      publisher: recipeData.publisher,
      source_url: recipeData.sourceUrl,
      image_url: recipeData.image,
      servings: +recipeData.servings,
      cooking_time: +recipeData.cookingTime,
      ingredients,
    };
    const data = await sendJSON(`${API_URL}?key=${API_KEY}`, recipe);

    if ((data.status = 'success')) {
      const newRecipe = createRecipeObject(data.data.recipe);
      setRecipe(newRecipe);
      addRecipeBookmark(newRecipe);

      return;
    }
  } catch (error) {
    throw error;
  }
};
