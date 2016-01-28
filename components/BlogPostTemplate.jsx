import React from 'react';
import request from 'superagent';
import moment from 'moment';
import config from '../config';

export default class BlogPostTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wpBlogPostLoaded: false
    };
  }
  componentDidMount() {
    this.getBlogPost();
  }
  getBlogPost() {
    // [FIXME]
    // Can't seem to find a way to find a post directly by it's permalink.
    // Not sure if this is the best endpoint to use since it returns an array instead 1 single post object
    let params = this.props.params;
    let apiEndpoit = config.wpApiEndpoint+`posts/?filter[name]=`+params.slug;
    let permaLink = config.urlToWordPress + `/` + Object.keys(params).map((key) => {
      return params[key];
    }).join(`/`) + `/`;

    request
      .get(apiEndpoit)
      .accept(`json`)
      .end((err, res) => {
        if (err) { console.log(`error: `, err); }
        this.blogPost = JSON.parse(res.text).filter(function(post) {
          return post.link === permaLink;
        })[0];
        this.setState({wpBlogPostLoaded: true});
      });
  }
  render() {
    return (
      <div className="blog-post">
        <div className="page-type-label">I'm a blog post</div>
        { this.state.wpBlogPostLoaded ?
          <div>
            <h1 dangerouslySetInnerHTML={{__html: this.blogPost.title.rendered}} />
            <div className="meta">
              <i className="fa fa-calendar"></i> <span>{moment(this.blogPost.date).format(`MMMM DD, YYYY HH:mm`)}</span>
            </div>
            <div dangerouslySetInnerHTML={{__html: this.blogPost.content.rendered}} />
          </div>
          : <p>Loading blog post...</p>
        }
      </div>
    );
  }
}
