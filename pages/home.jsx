import React from 'react';
import PageTemplate from '../components/PageTemplate';

export default class Homepage extends React.Component {
  render() {
    return (
      <PageTemplate apiEndpoint='http://localhost:8888/wp-json/wp/v2/pages/6' />
    );
  }
}
