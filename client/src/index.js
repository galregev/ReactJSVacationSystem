import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'materialize-css/dist/css/materialize.min.css'

// Setup Redux.
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import Reducer from './state/Reducer';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';

// Declere the Redux Store.
const store = createStore(Reducer, composeWithDevTools(applyMiddleware(thunk)));
ReactDOM.render(<Provider store={store}> <BrowserRouter><App /></BrowserRouter> </Provider>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
