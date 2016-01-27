import React from 'react';
import request from 'superagent';
import config from '../config';


export default class BlogPosTemplate extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.params.slug);
    this.state = {
      wpBlogPostLoaded: false
    };
  }
  componentDidMount() {
    this.getBlogPost();
  }
  getBlogPost() {
    // [FIXME] Not sure if this is the best endpoint to use since it returns an array instead 1 single post object
    let apiEndpoit = config.wpApiEndpoint+`posts/?filter[name]=`+this.props.params.slug;

    request
      // .get(config.wpApiEndpoint+`posts/` + this.props.author)
      .get(apiEndpoit)
      .accept(`json`)
      .end((err, res) => {
        if (err) { console.log(`error: `, err); }
        this.blogPost = JSON.parse(res.text)[0];
        console.log(this.blogPost);
        this.setState({wpBlogPostLoaded: true});
      });
  }
  render() {
    return (
      <div>
        { this.state.wpBlogPostLoaded ?
          <div>
            <h1 dangerouslySetInnerHTML={{__html: this.blogPost.title.rendered}} />
            <div dangerouslySetInnerHTML={{__html: this.blogPost.content.rendered}} />
          </div>
          : <p>Loading blog post</p>
        }
      </div>
    );
  }
}
