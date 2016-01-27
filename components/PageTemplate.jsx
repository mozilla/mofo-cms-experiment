import React from 'react';
import request from 'superagent';

export default class PageTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wpLoaded: false
    };
  }
  componentDidMount() {
    request
      .get(this.props.apiEndpoint)
      .accept(`json`)
      .end((err, res) => {
        if (err) { console.log(`error: `, err); }
        this.wpPage = JSON.parse(res.text);
        this.setState({wpLoaded: true});
      }).bind(this);
  }
  render() {
    var page = this.wpPage;

    return (
      <div>
        { this.state.wpLoaded ?
          <div>
            <h1 dangerouslySetInnerHTML={{__html: page.title.rendered}} />
            <div dangerouslySetInnerHTML={{__html: page.content.rendered}} />
          </div>
          : <p>Loading WP posts</p>
        }
      </div>
    );
  }
}
