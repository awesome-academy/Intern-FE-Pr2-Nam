import React,{ Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import './style/_global.scss';
import './i18n';
import 'bootstrap/dist/css/bootstrap.css';
ReactDOM.render(
  <Suspense fallback="Loading...">
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>,
  </Suspense>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
