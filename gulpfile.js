var gulp = require("gulp");
var gutil = require("gulp-util");
var path = require('path');
var less = require("gulp-less");
var webpack = require('webpack');
var gulpWebpack = require('webpack-stream');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var webpackConfig = require("./webpack.config.js");

var PORT = '9090';

var FILES_TO_WATCH_AND_PROCESS = [  '**/*.js', 
                                    '**/*.jsx', 
                                    '!**/bundle.js',
                                    '!node_modules/**', 
                                    '!dist/**' ];

gulp.task("watch", ['webpack', 'copy-static-files'], function() {
  gulp.watch(FILES_TO_WATCH_AND_PROCESS.concat(['public/**']), ["webpack"]);
});

gulp.task('less', function() {
    return gulp.src('public/less/style.less')
      .pipe(sourcemaps.init())
      .pipe(less({
        paths: [path.join(__dirname, 'public', 'less')],
      }))
      .pipe(gulp.dest('./dist/public'));
  });

gulp.task('copy-static-files', ['less'], function() {
  return gulp.src(['public/index.html'], {
    base: './public'
   })
  .pipe(gulp.dest('./dist/public'));
});

gulp.task('es6to5', function() {
  return gulp.src(FILES_TO_WATCH_AND_PROCESS)
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015', 'react']
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('webpack', ['es6to5', 'copy-static-files'], function() {
  // console.log("\n\n\n\n\ webpackConfig ////////////", webpackConfig);
  return gulp.src(webpackConfig.entry)
    .pipe(gulpWebpack(webpackConfig, webpack))
    .pipe(gulp.dest('./dist'));
});

gulp.task("webpack:build", function(callback) {
  // modify some webpack config options
  var myConfig = Object.create(webpackConfig);
  myConfig.plugins = myConfig.plugins.concat(
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  );

  // run webpack
  webpack(myConfig, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack:build", err);
    gutil.log("[webpack:build]", stats.toString({
      colors: true
    }));
    callback();
  });
});


// gulp.task('default', ['es6to5','webpack','copy-static-files'], function() {
//   console.log("\n\n\n\n\ hi ////////////");
// });

gulp.task('app', ['watch'], function() {
  require("./dist/app.js").listen(PORT, function() {
    gutil.log('///// Server listening at ' +
              gutil.colors.green.bold(PORT) + '.');
  });
});

