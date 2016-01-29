import React from 'react';
import request from 'superagent';
import CurriculumKitThumb from '../components/CurriculumKitThumb';
import configWPCom from '../config-wp-com';

export default class CurriculumIndex extends React.Component {
  constructor(props) {
    super(props);
    this.wpPageID = configWPCom.pageID.curricula;
    this.state = {
      wpPageLoaded: false,
      curriculumKitsLoaded: false
    };
  }
  componentDidMount() {
    request
      .get(`${configWPCom.wpApiEndpoint}posts?type=page&parent_id=${this.wpPageID}&order_by=ID&order=ASC`)
      .accept(`json`)
      .end((err, res) => {
        if (err) { console.log(`error: `, err); }
        this.curriculumKits = JSON.parse(res.text).posts;
        console.log(this.curriculumKits);
        this.setState({curriculumKitsLoaded: true});
      });
    request
      .get(`${configWPCom.wpApiEndpoint}posts/${this.wpPageID}`)
      .accept(`json`)
      .end((err, res) => {
        if (err) { console.log(`error: `, err); }
        this.wpPage = JSON.parse(res.text);
        this.setState({wpPageLoaded: true});
      });
  }
  render() {
    var page = this.wpPage;
    var curriculumKits = this.curriculumKits;

    return (
      <div>
        { this.state.wpPageLoaded ?
          <div>
            <h1 dangerouslySetInnerHTML={{__html: page.title}} />
            <div dangerouslySetInnerHTML={{__html: page.content}} />
          </div>
          : <p>Loading WP posts</p>
        }
        <div className="kits-gallery">
          { this.state.curriculumKitsLoaded ?
            curriculumKits.map((kit) => {
              return <CurriculumKitThumb {...kit} key={kit.ID} />;
            })
            : <p>Loading curriculum kits...</p>
          }
        </div>
        <div id="emoji">＼＼\\٩( 'ω' )و //／／</div>
      </div>
    );
  }
}

