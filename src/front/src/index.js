import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from "./AppRouter";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

ReactDOM.render(
  <AppRouter/>,
  document.getElementById('root')
);