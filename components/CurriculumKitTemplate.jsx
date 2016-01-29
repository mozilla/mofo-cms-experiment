import React from 'react';
import request from 'superagent';
import configWPCom from '../config-wp-com';

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
    let apiEndpoint = `${configWPCom.wpApiEndpoint}posts?type=page&parent_id=${configWPCom.pageID.curricula}`

    request
      .get(apiEndpoint)
      .accept(`json`)
      .end((err, res) => {
        if (err) { console.log(`error: `, err); }
        this.currKit = JSON.parse(res.text).posts.filter((post) => {
          return post.slug === this.props.params.slug;
        })[0];
        console.log(this.currKit);
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
            <h1 dangerouslySetInnerHTML={{__html: page.title}} />
            <div dangerouslySetInnerHTML={{__html: page.content}} />
          </div>
          : <p>Loading page...</p>
        }
      </div>
    );
  }
}
