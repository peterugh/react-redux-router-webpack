export const userReducer = function (state = {
  name: null,
  image: null,
  numRepos: 0,
  fetchingUser: false
}, action) {
  switch (action.type) {
    case 'STORE_USER':
      return {
        ...state,
        name: action.user.name,
        image: action.user.image
      }
    case 'STORE_REPO_META':
      return {
        ...state,
        numRepos: action.amount
      }
    case 'CLEAR_USER':
      return {
        ...state,
        name: null,
        numRepos: 0,
        image: null
      }
    case 'FETCHING_USER':
      return {
        ...state,
        fetchingUser: true
      }
    case 'FETCHED_USER':
      return {
        ...state,
        fetchingUser: false
      }
    default:
      return state;
  }
};