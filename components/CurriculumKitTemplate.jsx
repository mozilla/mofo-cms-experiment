import React from 'react';
import request from 'superagent';
import config from '../config';

export default class CurriculumKitTemplate extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.params.slug);
    this.state = {
      wpPageLoaded: false
    };
  }
  componentDidMount() {
    this.getCurrKit();
  }
  getCurrKit() {
    // [FIXME] Not sure if this is the best endpoint to use since it returns an array instead 1 single post object
    let apiEndpoit = config.wpApiEndpoint+`pages/?filter[name]=`+this.props.params.slug;

    request
      .get(apiEndpoit)
      .accept(`json`)
      .end((err, res) => {
        if (err) { console.log(`error: `, err); }
        this.currKit = JSON.parse(res.text)[0];
        console.log(this.blogPost);
        this.setState({wpPageLoaded: true});
      });
  }
  render() {
    var page = this.currKit;

    return (
      <div>
        <div className="page-type-label">I'm a curriculum kit (a WP subpage of Curricula)</div>
        { this.state.wpPageLoaded ?
          <div>
            <h1 dangerouslySetInnerHTML={{__html: page.title.rendered}} />
            <div dangerouslySetInnerHTML={{__html: page.content.rendered}} />
          </div>
          : <p>Loading page...</p>
        }
      </div>
    );
  }
}
