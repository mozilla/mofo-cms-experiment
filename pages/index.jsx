import React from 'react';
import Navbar from '../components/Navbar.jsx';

export default class Index extends React.Component {
  render() {
    return (
      <div>
        <div id="cms-exp-label"><div>Mofo CMS Experiment</div></div>
        <Navbar />
        <div id="main-container" className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}
