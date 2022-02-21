import React,{ Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import './i18n';
import {store} from './store/store'
import {Provider} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import 'antd/dist/antd.css';
import "react-toastify/dist/ReactToastify.css";
import './style/_global.scss';

ReactDOM.render(
  <Suspense fallback="Loading...">
    <Provider store={store}>
      <React.StrictMode>
        <Router>
          <App />
        </Router>
      </React.StrictMode>,
    </Provider>
  </Suspense>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
