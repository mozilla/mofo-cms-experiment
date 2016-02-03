import React from 'react';
import PageTemplate from '../components/PageTemplate.jsx';
import configWPCom from '../config-wp-com';

export default class Homepage extends React.Component {
  render() {
    return (
      <PageTemplate apiEndpoint={`${configWPCom.wpApiEndpoint}posts/${configWPCom.pageID.home}`} />
    );
  }
}
