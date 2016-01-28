import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Index from './pages/index';
import Home from './pages/home';
import About from './pages/about';
import Curricula from './pages/curricula-home';
import CurriculumKit from './components/CurriculumKitTemplate';
import BlogHome from './pages/blog-home';
import BlogPost from './components/BlogPostTemplate';

export default (
  <Route path="/" component={Index}>
    <IndexRoute component={Home}/>
    <Route path="about" component={About} />
    <Route path="curricula" component={Curricula} />
    <Route path="curricula/:slug" component={CurriculumKit} relativePathToStaticFiles="../" />
    <Route path="blog" component={BlogHome} />
    <Route path="blog/:year/:month/:day/:slug" component={BlogPost} relativePathToStaticFiles="../../../../../" />
  </Route>
);
