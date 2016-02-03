import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Index from './pages/index.jsx';
import Home from './pages/home.jsx';
import About from './pages/about.jsx';
import Curricula from './pages/curricula-home.jsx';
import CurriculumKit from './components/CurriculumKitTemplate.jsx';
import BlogHome from './pages/blog-home.jsx';
import BlogPost from './components/BlogPostTemplate.jsx';

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
