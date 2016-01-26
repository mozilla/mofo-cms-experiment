import React from 'react';

export default class CurriculumKitThumb extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div className="curr-kit-thumb">
        <h3>{this.props.title.rendered}</h3>
        <div>{this.props.devBy}</div>
        <div dangerouslySetInnerHTML={{__html: this.props.content.rendered}} />
      </div>
    );
  }
}
