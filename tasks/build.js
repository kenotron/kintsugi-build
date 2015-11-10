//******************************************************************************
//* BUILD
//******************************************************************************

var tsc   		= require("gulp-typescript"),
    chmod       = require("gulp-chmod"),
    typescript  = require('typescript'),
    options 	= require('../options'),
	path 		= require('path'),
    merge       = require('merge2'),
	sourcemaps  = require("gulp-sourcemaps");

// TypeScript compiler settings
var tsSettings = {
    typescript: typescript,
    "target": "ES5",
    "module": "commonjs",
    "jsx": "react",
    "sourceMap": true,
    "experimentalDecorators": true,
    "declaration": true,
    "removeComments": true
};
    
var tsSourceProject = tsc.createProject(tsSettings);

module.exports = function(gulp) {
    function buildSource() {
        var tsResult = gulp.src(options.source)
                .pipe(sourcemaps.init())
                .pipe(tsc(tsSourceProject, [], tsc.reporter.fullReporter(true)));
    
        return merge([
                tsResult.dts.pipe(gulp.dest(options.output)),
                tsResult.js
                    .pipe(sourcemaps.write('maps', {includeContent: false}))
                    .pipe(gulp.dest(options.output))
                ]);
    }
    
    // build source tree
    gulp.task("build", ["build:assets"], function() {
        return buildSource();  
    });
    
    gulp.task("build:assets", function() {
        return gulp.src(options.styleSource)
             .pipe(chmod(755))
             .pipe(gulp.dest(options.output));
    });
    
    gulp.task("build:release", ["build:assets"], function() {
        return merge([
            gulp.src(["**/*"])
              .pipe(chmod(755))
              .pipe(gulp.dest(path.resolve(options.releaseRoot))),
            buildSource()]);
    });
}

