import React from 'react';
import PageTemplate from '../components/PageTemplate.jsx';
import configWPCom from '../config-wp-com';

export default class Homepage extends React.Component {
  render() {
    let note = `This page is composed of a WordPress Page's title & content.`;

    return (
      <PageTemplate apiEndpoint={`${configWPCom.wpApiEndpoint}posts/${configWPCom.pageID.home}`} note={note} />
    );
  }
}
