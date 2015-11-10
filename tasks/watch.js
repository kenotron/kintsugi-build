//******************************************************************************
//* Watch
//******************************************************************************

var options = require('../options');
var gutil = require('gulp-util');

module.exports = function(gulp) {
    gulp.task("watch", function() {
        gulp.watch(options.source, ['build']);
        gulp.watch(options.styleSource, ['build:assets']);
    });
}

