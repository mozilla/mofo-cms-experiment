import React from 'react';
import PageTemplate from '../components/PageTemplate';
import config from '../config';

export default class Homepage extends React.Component {
  render() {
    return (
      <PageTemplate apiEndpoint={`${config.wpApiEndpoint}pages/${config.pageID.home}`} />
    );
  }
}
