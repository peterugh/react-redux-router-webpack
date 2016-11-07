
import Promise from 'promise-polyfill';
import 'whatwg-fetch';

export const setTitle = function (title) {
  return {
    type: 'SET_TITLE',
    title
  };
};

export const addItem = function (item) {
  return {
    type: 'ADD_ITEM',
    item
  };
};
export const removeItem = function (item) {
  return {
    type: 'REMOVE_ITEM',
    item
  };
};
export const storeRepoMeta = function(amount) {
  return {
    type: 'STORE_REPO_META',
    amount
  };
};
export const storeUser = function(user) {
  return {
    type: 'STORE_USER',
    user
  };
};

export const fetchedUser = function(param) {
  return {
    type: 'FETCHED_USER'
  };
};

export const fetchingUser = function(param) {
  return {
    type: 'FETCHING_USER'
  };
};

export const clearUser = function(param) {
  return {
    type: 'CLEAR_USER'
  };
};


export const fetchUser = function(username) {
  return (dispatch, getState) => {
    dispatch(fetchingUser());
    return fetch(`https://api.github.com/users/${ username }`)
    .then((response) => {
      dispatch(fetchedUser());
      return response.json();
    }).then((json) => {
      return Promise.resolve(json);
    });
  }
}