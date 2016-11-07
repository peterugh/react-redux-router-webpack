// browser compatibility
import './js/fills';
import 'es6-shim';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// core
import React from 'react';
import ReactDOM from 'react-dom';

// Main component
import App from './App';
import Home from './js/components/Home/Home';
import TodoList from './js/components/TodoList/TodoList';
import Fetch from './js/components/Fetch/Fetch';
import Display from './js/components/Display/Display';

// Data store
import appStore from './js/stores/appStore';
import { Provider } from 'react-redux';

ReactDOM.render(
<Provider store={ appStore }>
  <Router history={ browserHistory }>
    <Route path="/" component={ App }>
      <IndexRoute component={ Home }/>
      <Route path="/todo" component={ TodoList }/>
      <Route path="/fetch" component={ Fetch }/>
      <Route path="/fetch/:username" component={ Display }/>
    </Route>
  </Router>
</Provider>, document.getElementById('App'));