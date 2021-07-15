import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

render(
  <>
    <App />
    <ToastContainer autoClose={1000} />
  </>,
  document.getElementById('root')
);
