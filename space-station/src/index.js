import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/views/App';
import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = baseURL;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <App />
  </>
);


