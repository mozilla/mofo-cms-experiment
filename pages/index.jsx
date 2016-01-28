import React from 'react';
import Navbar from '../components/Navbar';

export default class Index extends React.Component {
  render() {
    // [FIXME] We probably don't need to specify 'relativePathToStaticFiles'
    // once we fix the build system by getting rid of gulp :(
    let relativePathToStaticFiles = this.props.children.props.route.relativePathToStaticFiles || ``;

    return (
      <html>
        <head lang="en">
          <meta charSet="UTF-8" />
          <title>Mofo CMS Experiment</title>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" />
          <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600,600italic,700,700italic,800,800italic' rel='stylesheet' type='text/css' />
          <link href={relativePathToStaticFiles+`../public/style.css`} type="text/css" rel="stylesheet" />
        </head>
        <body>
          <div id="app">
            <Navbar />
            <div id="main-container" className="container">
              {this.props.children}
            </div>
          </div>
          <script src={relativePathToStaticFiles+`bundle.js`}></script>
        </body>
      </html>
    );
  }
}
