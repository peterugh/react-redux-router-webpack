// Redux
import thunkMiddleware from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

// Reducers
import { userReducer } from '../reducers/userReducer';
import { todoReducer } from '../reducers/todoReducer';

const reducer = combineReducers({
  user: userReducer,
  todos: todoReducer,
});

const takeStore = createStore(
  reducer, compose(
    applyMiddleware(
      thunkMiddleware
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default takeStore;