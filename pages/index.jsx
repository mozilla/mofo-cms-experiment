import React from 'react';
import Navbar from '../components/Navbar.jsx';

export default class Index extends React.Component {
  render() {
    return (
      <div>
        <div id="cms-exp-label"><a href="https://github.com/mozilla/mofo-cms-experiment">Mofo CMS Experiment</a></div>
        <Navbar />
        <div id="main-container" className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}
