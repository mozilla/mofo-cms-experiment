import React from 'react';
import PageTemplate from '../components/PageTemplate';

export default class About extends React.Component {
  render() {
    return (
      <PageTemplate apiEndpoint='http://localhost:8888/wp-json/wp/v2/pages/8' />
    );
  }
}
