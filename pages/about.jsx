import React from 'react';
import PageTemplate from '../components/PageTemplate';
import config from '../config';

export default class About extends React.Component {
  render() {
    return (
      <PageTemplate apiEndpoint={`${config.wpApiEndpoint}pages/${config.pageID.about}`} />
    );
  }
}
