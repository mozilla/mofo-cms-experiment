import React from 'react';
import Navbar from '../components/Navbar.jsx';

export default class Index extends React.Component {
  render() {
    // [FIXME] We probably don't need to specify 'relativePathToStaticFiles'
    // once we fix the build system by getting rid of gulp :(
    // let relativePathToStaticFiles = this.props.children.props.route.relativePathToStaticFiles || ``;

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
