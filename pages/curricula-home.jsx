import React from 'react';
import request from 'superagent';
import CurriculumKitThumb from '../components/CurriculumKitThumb';

export default class CurriculumIndex extends React.Component {
  constructor(props) {
    super(props);
    this.wpPageID = 12;
    this.state = {
      wpPageLoaded: false,
      curriculumKitsLoaded: false
    };
  }
  componentDidMount() {
    var self = this;

    request
      .get(`http://localhost:8888/wp-json/wp/v2/pages?parent=`+this.wpPageID)
      .accept(`json`)
      .end((err, res) => {
        if (err) { console.log(`error: `, err); }
        self.curriculumKits = JSON.parse(res.text).sort((a,b) => {
          return a.menu_order > b.menu_order;
        });
        console.log(self.curriculumKits);
        self.setState({curriculumKitsLoaded: true});
      });
    request
      .get(`http://localhost:8888/wp-json/wp/v2/pages/` + this.wpPageID)
      .accept(`json`)
      .end((err, res) => {
        if (err) { console.log(`error: `, err); }
        self.wpPage = JSON.parse(res.text);
        console.log(`/////// `, self.wpPage);
        self.setState({wpPageLoaded: true});
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
            curriculumKits.map(function(kit) {
              console.log(`hi kit`);
              return <CurriculumKitThumb {...kit} />;
            })
            : <p>Loading curriculum kits...</p>
          }
        </div>
        <div id="emoji">＼＼\\٩( 'ω' )و //／／</div>
      </div>
    );
  }
}

