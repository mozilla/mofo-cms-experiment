import React from 'react';
import Navbar from '../components/Navbar.jsx';

export default class Index extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <div id="main-container" className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}
