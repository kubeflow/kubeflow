var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var watchify = require('watchify');
var browserify = require('browserify');
var uglifyify = require('uglifyify');
var mergeStream = require('merge-stream');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var babelify = require('babelify');
var browserSync = require('browser-sync');

var reload = browserSync.reload;

gulp.task('clean', function (done) {
  require('del')(['dist'], done);
});

gulp.task('copy-build', function() {
  return gulp.src([
    'build/idb.js'
  ]).pipe(gulp.dest('dist'))
    .pipe(reload({stream: true}));
});

gulp.task('copy', function() {
  return gulp.src([
    'test/index.html',
    'node_modules/mocha/mocha.css',
    'node_modules/mocha/mocha.js'
  ]).pipe(gulp.dest('dist/test'))
    .pipe(reload({stream: true}));
});

function createBundler(src) {
  var b;

  if (plugins.util.env.production) {
    b = browserify();
  }
  else {
    b = browserify({
      cache: {}, packageCache: {}, fullPaths: true,
      debug: true
    });
  }

  b.transform(babelify.configure({
    stage: 1
  }));

  if (plugins.util.env.production) {
    b.transform({
      global: true
    }, 'uglifyify');
  }

  b.add(src);
  return b;
}

function bundle(bundler, outputPath) {
  var splitPath = outputPath.split('/');
  var outputFile = splitPath[splitPath.length - 1];
  var outputDir = splitPath.slice(0, -1).join('/');

  return bundler.bundle()
    // log errors if they happen
    .on('error', plugins.util.log.bind(plugins.util, 'Browserify Error'))
    .pipe(source(outputFile))
    .pipe(buffer())
    .pipe(plugins.sourcemaps.init({ loadMaps: true })) // loads map from browserify file
    .pipe(plugins.sourcemaps.write('./')) // writes .map file
    .pipe(plugins.size({ gzip: true, title: outputFile }))
    .pipe(gulp.dest('dist/' + outputDir))
    .pipe(reload({ stream: true }));
}

var bundlers = {
  'test/idb.js': createBundler('./test/idb.js')
};

gulp.task('js', function () {
  return mergeStream.apply(null,
    Object.keys(bundlers).map(function(key) {
      return bundle(bundlers[key], key);
    })
  );
});

gulp.task('browser-sync', function() {
  browserSync({
    notify: false,
    port: 8000,
    server: "dist",
    open: false
  });
});

gulp.task('watch', function () {
  gulp.watch(['test/index.html'], ['copy']);
  gulp.watch(['build/idb.js'], ['copy-build']);

  Object.keys(bundlers).forEach(function(key) {
    var watchifyBundler = watchify(bundlers[key]);
    watchifyBundler.on('update', function() {
      return bundle(watchifyBundler, key);
    });
    bundle(watchifyBundler, key);
  });
});

gulp.task('build', function (done) {
  runSequence('clean', ['copy', 'js', 'copy-build'], done);
});

gulp.task('default', ['build']);

gulp.task('serve', function (done) {
  runSequence('clean', ['copy', 'js', 'copy-build'], ['browser-sync', 'watch'], done);
});
