import React from 'react';
import request from 'superagent';
import moment from 'moment';
import configWPCom from '../config-wp-com';

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
    let params = this.props.params;
    let apiEndpoit = configWPCom.wpApiEndpoint+`posts/slug:`+params.slug;

    request
      .get(apiEndpoit)
      .accept(`json`)
      .end((err, res) => {
        if (err) { console.log(`error: `, err); }
        this.blogPost = JSON.parse(res.text);
        console.log(this.blogPost);
        this.setState({wpBlogPostLoaded: true});
      });
  }
  render() {
    return (
      <div className="blog-post">
        <div className="page-type-label">I'm a blog post</div>
        { this.state.wpBlogPostLoaded ?
          <div>
            <h1 dangerouslySetInnerHTML={{__html: this.blogPost.title}} />
            <div className="meta">
              <i className="fa fa-users"></i><span>{this.blogPost.author.name}</span>
              <i className="fa fa-calendar"></i><span>{moment(this.blogPost.date).format(`MMMM DD, YYYY HH:mm`)}</span>
            </div>
            <div dangerouslySetInnerHTML={{__html: this.blogPost.content}} />
          </div>
          : <p>Loading blog post...</p>
        }
      </div>
    );
  }
}
