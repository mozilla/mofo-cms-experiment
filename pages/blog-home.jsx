import React from 'react';
import request from 'superagent';
import BlogPostThumb from '../components/BlogPostThumb.jsx';
import configWPCom from '../config-wp-com';

export default class BlogHome extends React.Component {
  constructor(props) {
    super(props);
    this.wpPageID = configWPCom.pageID.blog;
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
      .get(configWPCom.wpApiEndpoint+`posts/`+this.wpPageID)
      .accept(`json`)
      .end((err, res) => {
        if (err) { console.log(`error: `, err); }
        this.wpPage = JSON.parse(res.text);
        this.setState({wpPageLoaded: true});
      });
  }
  loadPostsTitle () {
    request
      .get(configWPCom.wpApiEndpoint+`posts/`)
      .accept(`json`)
      .end((err, res) => {
        if (err) { console.log(`error: `, err); }
        this.blogPosts = JSON.parse(res.text).posts.sort((a,b) => {
          return a.menu_order > b.menu_order;
        });
        this.setState({wpBlogPostsLoaded: true});
      });
  }
  render() {
    let page = this.wpPage;
    let blogPosts = this.blogPosts;
    let note = `This page is composed of 1) a WordPress Page's title & content 2) a list of blog posts.`;

    return (
      <div>
        <div className="note">{note}</div>
        { this.state.wpPageLoaded ?
          <div>
            <h1 dangerouslySetInnerHTML={{__html: page.title}} />
            <div dangerouslySetInnerHTML={{__html: page.content}} />
          </div>
          : <p>Loading WP posts</p>
        }
        <div className="blog-gallery">
          { this.state.wpBlogPostsLoaded ?
            blogPosts.map((post) => {
              return <BlogPostThumb {...post} key={post.ID} />;
            })
            : <p>Loading blog posts...</p>
          }
        </div>
      </div>
    );
  }
}

