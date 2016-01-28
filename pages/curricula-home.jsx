import React from 'react';
import request from 'superagent';
import CurriculumKitThumb from '../components/CurriculumKitThumb';
import config from '../config';

export default class CurriculumIndex extends React.Component {
  constructor(props) {
    super(props);
    this.wpPageID = config.pageID.curricula;
    this.state = {
      wpPageLoaded: false,
      curriculumKitsLoaded: false
    };
  }
  componentDidMount() {
    request
      .get(`${config.wpApiEndpoint}pages?parent=${this.wpPageID}`)
      .accept(`json`)
      .end((err, res) => {
        if (err) { console.log(`error: `, err); }
        this.curriculumKits = JSON.parse(res.text).sort((a,b) => {
          return a.menu_order > b.menu_order;
        });
        this.setState({curriculumKitsLoaded: true});
      });
    request
      .get(`${config.wpApiEndpoint}pages/${this.wpPageID}`)
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
            <h1 dangerouslySetInnerHTML={{__html: page.title.rendered}} />
            <div dangerouslySetInnerHTML={{__html: page.content.rendered}} />
          </div>
          : <p>Loading WP posts</p>
        }
        <div className="kits-gallery">
          { this.state.curriculumKitsLoaded ?
            curriculumKits.map((kit) => {
              return <CurriculumKitThumb {...kit} key={kit.id} />;
            })
            : <p>Loading curriculum kits...</p>
          }
        </div>
        <div id="emoji">＼＼\\٩( 'ω' )و //／／</div>
      </div>
    );
  }
}

