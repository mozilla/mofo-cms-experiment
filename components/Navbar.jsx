import React from 'react';
import NavbarLink from './NavbarLink';

export default class Navbar extends React.Component {
  render() {
    return (
      <div id="navbar">
        <NavbarLink path="/" pageName="Home" />
        <NavbarLink path="/about" pageName="About" />
        <NavbarLink path="/curriculum" pageName="Curriculum" />
      </div>
    );
  }
}
