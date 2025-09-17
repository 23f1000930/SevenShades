import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//Now here we tell our react app that RootRecducer is our WEB CONTAINER/STORE
import { Provider  } from 'react-redux';
import { createStore } from 'redux';
import RootReducer from './storage/RootReducer';

var store=createStore(RootReducer) 
// value of "store" is equal to "product" of "initialState" in "RootReducer"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
