import React from 'react';
import { IndexLink } from 'react-router';

export default class NavbarLink extends React.Component {
  render() {
    return (
        <IndexLink to={this.props.path} activeClassName="active">{this.props.pageName}</IndexLink>
    );
  }
}
