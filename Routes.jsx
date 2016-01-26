import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Index from './pages/index';
import Home from './pages/home';
import About from './pages/about';
import Curricula from './pages/curricula-home';

export default (
  <Route path="/" component={Index}>
    <IndexRoute component={Home}/>
    <Route path="about" component={About} />
    <Route path="curricula" component={Curricula} />
  </Route>
);

