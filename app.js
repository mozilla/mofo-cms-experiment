import express from 'express';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import routes from './Routes.jsx';

var PORT = '9090';

var app = express();

app.set('view engine', 'html');

function serveStaticFiles(pathRequested, res) {
  if ( pathRequested === "/public/style.css" ) {
    res.sendFile( path.resolve("public/style.css") );
  } else if ( pathRequested === "/bundle.js" ) {
    res.sendFile( path.resolve("bundle.js") );
  } else {
    res.status(404).send('Not found');
  }
}

function htmlTemplate(appHtmlAsString) {
  var pathToStyleCss = path.join(__dirname, "public", "style.css");
  var pathToBundleJs = path.join(__dirname, "bundle.js");

  return (`
    <!DOCTYPE html>
    <html>
      <head lang="en">
        <meta charSet="UTF-8" />
        <title>Mofo CMS Experiment</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" />
        <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600,600italic,700,700italic,800,800italic' rel='stylesheet' type='text/css' />
        <link href=${pathToStyleCss} type="text/css" rel="stylesheet" />
      </head>
      <body>
        <div id="app">
          ${appHtmlAsString}
        </div>
        <script src=${pathToBundleJs}></script>
      </body>
    </html>
  `);
}

app.get('/*', function (req, res) {
  console.log("==== server hit, req.path = ", req.path);
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      console.log("error :(");
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      console.log("redirectLocation = ", redirectLocation);
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      res.status(200).send( htmlTemplate(ReactDOMServer.renderToStaticMarkup(<RoutingContext {...renderProps} />)) );
    } else {
      serveStaticFiles(req.path, res);
    }
  })
});

app.listen(PORT, function() {
  console.log("\n///// Server listening at "+ PORT + " /////\n");
});
