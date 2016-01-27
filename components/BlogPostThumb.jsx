import React from 'react';
import request from 'superagent';
import config from '../config';
import path from 'path';

export default class BlogPostThumb extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wpAuthorLoaded: false
    };
  }
  componentDidMount() {
    this.getAuthor();
  }
  getAuthor() {
    request
      .get(config.wpApiEndpoint+`users/` + this.props.author)
      .accept(`json`)
      .end((err, res) => {
        if (err) { console.log(`error: `, err); }
        this.author = JSON.parse(res.text);
        this.setState({wpAuthorLoaded: true});
      });
  }
  render() {
    var pathToBlogPost = `blog/` + path.relative(config.urlToWordPress, this.props.link);

    return (
      <div className="blog-post-thumb">
        <h3><a href={pathToBlogPost}>{this.props.title.rendered}</a></h3>
        { this.state.wpAuthorLoaded ?
            <div className="meta">
              <i className="fa fa-user"></i><span>{this.author.name}</span>
              <i className="fa fa-calendar"></i> <span>{this.props.date}</span>
            </div>
          : null }
      </div>
    );
  }
}
