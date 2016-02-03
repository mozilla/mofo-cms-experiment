import React from 'react';
import ReactDOM from 'react-dom';
import Router, { Route } from 'react-router';
import { createHistory } from 'history';
import routes from './Routes.jsx';

console.log("heyyy main.jsx \n");

ReactDOM.render(<Router history={createHistory()} routes={routes}/>, document.getElementById('app'));

