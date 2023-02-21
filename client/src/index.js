import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers/index.js';
import App from './App.js';
import './index.css';

// Creating Redux Store
// thunk -> to dispatch functions -> to be used as asynchronous actions along redux 
const store = createStore(reducers, compose(applyMiddleware(thunk)));

// used provider to connect react with redux store
ReactDOM.render(
  <Provider store={store}>
    <App />,
  </Provider>,
  document.getElementById('root')
);
