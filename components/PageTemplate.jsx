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
    console.log(`Homepage componentDidMount`);
    var self = this;

    request
      .get(`http://localhost:8888/wp-json/wp/v2/pages`)
      .accept(`json`)
      .end((err, res) => {
        if (err) { console.log(`error: `, err); }
        var data = JSON.parse(res.text);

        data.sort((a,b) => {
          return a.menu_order > b.menu_order;
        });
        console.log(data);
      });




    request
      .get(self.props.apiEndpoint)
      .accept(`json`)
      .end((err, res) => {
        if (err) { console.log(`error: `, err); }
        self.wpPage = JSON.parse(res.text);
        console.log(`/////// `, self.wpPage);
        self.setState({wpLoaded: true});
      });
  }
  render() {
    console.log(`Homepage Rendered`);
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
        <div id="emoji">＼＼\\٩( 'ω' )و //／／</div>
      </div>
    );
  }
}
