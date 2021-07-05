export const authReducer = (state = localStorage.getItem("tok"), action) => {
  switch (action.type) {
    case "Auth":
      return action.auth;
    default:
      return state;
  }
};
export const suggestionReducer = (state = [], action) => {
  switch (action.type) {
    case "SuggestionSet":
      return action.suggestions;
    default:
      return state;
  }
};
export const wishlistReducer = (state = [], action) => {
  switch (action.type) {
    case "wishlistset":
      return action.wishlist;
    default:
      return state;
  }
};