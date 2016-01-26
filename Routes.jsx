import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Index from './pages/index';
import Home from './pages/home';
import About from './pages/about';
import Curriculum from './pages/curriculum-index';

export default (
  <Route path="/" component={Index}>
    <IndexRoute component={Home}/>
    <Route path="about" component={About} />
    <Route path="curriculum" component={Curriculum} />
  </Route>
);

