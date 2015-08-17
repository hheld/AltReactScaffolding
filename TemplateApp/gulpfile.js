/* jshint node: true */

var gulp        = require('gulp'),
    uglify      = require('gulp-uglify'),
    htmlReplace = require('gulp-html-replace'),
    source      = require('vinyl-source-stream'),
    browserify  = require('browserify'),
    watchify    = require('watchify'),
    streamify   = require('gulp-streamify'),
    babelify    = require('babelify'),
    del         = require('del');

var path = {
    HTML: './client/index.html',
    CSS: ['./client/css/app.css'],
    MINIFIED_OUT: 'build.min.js',
    OUT: 'build.js',
    DEST: 'dist',
    DEST_BUILD: 'dist/build',
    DEST_SRC: 'dist/src',
    ENTRY_POINT: './client/js/app.js'
};

gulp.task('clean', function() {
    del.sync(['dist/**/*']);
});

gulp.task('copy', ['copyHtml', 'copyCss']);

gulp.task('watch', function() {
    gulp.watch(path.HTML, ['copyHtml']);
    gulp.watch(path.CSS, ['copyCss']);

    process.env.NODE_ENV = 'development';

    var watcher = watchify(browserify({
        entries: [path.ENTRY_POINT],
        transform: [babelify],
        debug: true,
        cache: {}, packageCache: {}, fullPaths: true
    }));

    return watcher.on('update', function() {
        watcher.bundle()
            .on('error', swallowError)
            .pipe(source(path.OUT))
            .pipe(gulp.dest(path.DEST_SRC));
        console.log('Updated');
    }).bundle()
        .pipe(source(path.OUT))
        .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('build', function() {
    process.env.NODE_ENV = 'production';
    browserify({
        entries: [path.ENTRY_POINT],
        transform: [babelify]
    })
    .bundle()
    .pipe(source(path.MINIFIED_OUT))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('replaceHtml', function() {
    gulp.src(path.HTML)
        .pipe(htmlReplace({
            'js': '/build/' + path.MINIFIED_OUT
    }))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('production', ['clean', 'replaceHtml', 'build', 'copyCss']);
gulp.task('default', ['clean', 'watch', 'copyCss', 'copyHtml']);

gulp.task('copyHtml', function() {
    gulp.src(path.HTML)
        .pipe(gulp.dest(path.DEST));
});

gulp.task('copyCss', function() {
    gulp.src(path.CSS)
        .pipe(gulp.dest(path.DEST + '/css'));
});

function swallowError(error) {
    console.log(error.toString());
    this.emit('end');
}
