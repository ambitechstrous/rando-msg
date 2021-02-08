// Core Libs and styling
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// React Redux Libraries
import { Provider } from 'react-redux';
import store from './redux/store';

// ReactJS App Libraries/Modules
import App from './App';
import reportWebVitals from './reportWebVitals';
import dotenv from 'dotenv';

import { connectToRoom } from './redux/actions';

if (process.env.NODE_ENV !== 'production') {
	dotenv.config();
}

store.dispatch(connectToRoom);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
