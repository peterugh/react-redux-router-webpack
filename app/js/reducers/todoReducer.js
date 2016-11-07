export const todoReducer = function (state = {
  items: [],
  title: ''
}, action) {
  switch (action.type) {
    case 'SET_TITLE':
      return {
        ...state,
        title: action.title
      }
    case 'ADD_ITEM':
      if(state.items.indexOf(action.item) === -1) {
        return {
          ...state,
          items: [...state.items, action.item]
        }
      } else {
        return state;
      }
      return state;
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => {
          return item !== action.item;
        })
      }
    default:
      return state;
  }
};