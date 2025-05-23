import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Details from './path/Details';
import Error from './error';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/details/:id', element: <Details /> },
  { path: '*', element: <Error /> }
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
