import React from 'react';
import path from 'path';
import moment from 'moment';
import configWPCom from '../config-wp-com';

export default class BlogPostThumb extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var pathToBlogPost = `blog/` + path.relative(configWPCom.urlToWordPress, this.props.URL);
    var publishedTime = moment(this.props.date).format(`MMMM DD, YYYY HH:mm`);

    return (
      <div className="blog-post-thumb">
        <h3><a href={pathToBlogPost}>{this.props.title}</a></h3>
        <div className="meta">
          <i className="fa fa-user"></i><span>{this.props.author.name}</span>
          <i className="fa fa-calendar"></i> <span>{publishedTime}</span>
        </div>
      </div>
    );
  }
}
