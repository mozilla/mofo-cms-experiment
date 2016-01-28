import React from 'react';
import request from 'superagent';
import BlogPostThumb from '../components/BlogPostThumb';
import config from '../config';

export default class BlogHome extends React.Component {
  constructor(props) {
    super(props);
    this.wpPageID = config.pageID.blog;
    this.state = {
      wpPageLoaded: false,
      wpBlogPostsLoaded: false
    };
  }
  componentDidMount() {
    this.loadPostsTitle();
    this.loadPage();
  }
  loadPage() {
    request
      .get(config.wpApiEndpoint+`pages/`+this.wpPageID)
      .accept(`json`)
      .end((err, res) => {
        if (err) { console.log(`error: `, err); }
        this.wpPage = JSON.parse(res.text);
        this.setState({wpPageLoaded: true});
      });
  }
  loadPostsTitle () {
    request
      .get(config.wpApiEndpoint+`posts/`)
      .accept(`json`)
      .end((err, res) => {
        if (err) { console.log(`error: `, err); }
        this.blogPosts = JSON.parse(res.text).sort((a,b) => {
          return a.menu_order > b.menu_order;
        });
        this.setState({wpBlogPostsLoaded: true});
      });
  }
  render() {
    var page = this.wpPage;
    var blogPosts = this.blogPosts;

    return (
      <div>
        { this.state.wpPageLoaded ?
          <div>
            <h1 dangerouslySetInnerHTML={{__html: page.title.rendered}} />
            <div dangerouslySetInnerHTML={{__html: page.content.rendered}} />
          </div>
          : <p>Loading WP posts</p>
        }
        <div className="blog-gallery">
          { this.state.wpBlogPostsLoaded ?
            blogPosts.map((post) => {
              return <BlogPostThumb {...post} key={post.id} />;
            })
            : <p>Loading blog posts...</p>
          }
        </div>
      </div>
    );
  }
}

