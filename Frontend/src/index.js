import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';

import './index.css';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <App />  {/* Calls the app.js file and executes the file when building the application. */}
    </Switch>
  </BrowserRouter>,
  // 'root' is the id which is defined in the index.html file and the application renders on that element while building the application. 
  document.getElementById('root') 
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
