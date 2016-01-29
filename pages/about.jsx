import React from 'react';
import PageTemplate from '../components/PageTemplate';
import configWPCom from '../config-wp-com';

export default class About extends React.Component {
  render() {
    return (
      <PageTemplate apiEndpoint={`${configWPCom.wpApiEndpoint}posts/${configWPCom.pageID.about}`} />
    );
  }
}
