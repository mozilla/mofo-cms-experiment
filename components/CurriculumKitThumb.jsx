import React from 'react';
import path from 'path';
import config from '../config';

export default class CurriculumKitThumb extends React.Component {
  render() {
    console.log(this.props);
    var pathToBlogPost = path.relative(config.urlToWordPress, this.props.link);

    return (
      <a className="curr-kit-thumb" href={pathToBlogPost}>
        <h3>{this.props.title.rendered}</h3>
        <div>{this.props.devBy}</div>
        <div dangerouslySetInnerHTML={{__html: this.props.content.rendered}} />
      </a>
    );
  }
}
