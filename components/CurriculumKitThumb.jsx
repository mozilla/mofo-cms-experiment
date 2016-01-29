import React from 'react';
import path from 'path';
import configWPCom from '../config-wp-com';

export default class CurriculumKitThumb extends React.Component {
  render() {
    var pathToBlogPost = path.relative(configWPCom.urlToWordPress, this.props.URL);

    return (
      <a className="curr-kit-thumb" href={pathToBlogPost}>
        <h3>{this.props.title}</h3>
        <div>{this.props.devBy}</div>
        <div dangerouslySetInnerHTML={{__html: this.props.content}} />
      </a>
    );
  }
}
